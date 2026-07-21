"use server";
import { CreateSdkOrderRequest } from "@phonepe-pg/pg-sdk-node";
import client from "@/utils/phonepeClient";
import { FormState } from "@/types/types";
import { CheckoutSchema } from "@/utils/zodSchema";
import { createServerClient } from "@/utils/supabase/server";
import { auth } from "@/utils/auth";

export async function CheckoutAction(
  previousState: FormState,
  formData: FormData,
) {
  const session = await auth();
  if (!session) return { success: false, message: "Unauthorized" };
  const supabase = createServerClient();
  try {
    const validData = CheckoutSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      amount: Number(formData.get("amount")),
      productIds: formData.getAll("productIds").map((id) => String(id)),
    });
    if (!validData.success) {
      return {
        success: false,
        message: "Invalid request. Please check your inputs.",
      };
    }
    const name = validData.data.name;
    const email = validData.data.email;
    const phone = validData.data.phone;
    const amount = validData.data.amount * 100; // Convert to paise
    const productIds = validData.data.productIds;

    const { data: customerData, error } = await supabase
      .from("customers")
      .insert({
        name,
        email,
        phone,
        amount: amount.toString(),
        product_id: productIds,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Database Error:", error);
      return { success: false, message: "Database Error" };
    }
    if (!customerData) {
      return { success: false, message: "Failed to initiate payment process" };
    }

    const merchantOrderId = `MT_${customerData.id}_${Date.now()}`;
    const orderRequest = CreateSdkOrderRequest.StandardCheckoutBuilder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(
        `${process.env.PHONEPE_REDIRECT_URL || "http://localhost:3000/payment-confirmation"}?merchantOrderId=${merchantOrderId}`,
      )
      .disablePaymentRetry(true)
      .expireAfter(3600)
      .message("Order Total")
      .build();

    const response = await client.pay(orderRequest);
    if (response.redirectUrl) {
      const { data: dbexists, error } = await supabase
        .from("payments")
        .select("*")
        .eq("customer_id", customerData.id)
        .select()
        .single();

      if (dbexists && error === null) {
        await supabase
          .from("payments")
          .update({
            amount: amount.toString(),
            transaction_id: merchantOrderId,
            payment_date: new Date(),
            Payment_method: "PhonePePG",
            gateway_response: JSON.stringify(response),
          })
          .eq("customer_id", customerData.id);
      } else {
        const { data: dbres, error: err } = await supabase
          .from("payments")
          .insert({
            amount: amount.toString(),
            customer_id: customerData.id,
            payment_status: "pending",
            transaction_id: merchantOrderId,
            payment_date: new Date(),
            payment_method: "PhonePePG",
            gateway_response: JSON.stringify(response),
          })
          .select()
          .single();

        if (!dbres || err) {
          return {
            success: false,
            message: "Failed to initiate payment process",
          };
        }
      }
      return {
        success: true,
        message: "Success",
        redirectUrl: response.redirectUrl,
      };
    } else {
      return { success: false, message: "Failed to initiate payment process" };
    }
  } catch (error) {
    console.error("PhonePe Error:", error);
    return { success: false, message: "Failed to initiate payment process" };
  }
}

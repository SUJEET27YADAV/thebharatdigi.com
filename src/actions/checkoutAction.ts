"use server";
import { CreateSdkOrderRequest } from "@phonepe-pg/pg-sdk-node";
import client from "@/utils/phonepeClient";
import { db } from "@/db/db";
import { customers, payments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FormState } from "@/types/types";
import { CheckoutSchema } from "@/utils/zodSchema";

export async function CheckoutAction(
  previousState: FormState,
  formData: FormData,
) {
  try {
    console.log("Received form data:", Object.fromEntries(formData.entries()));
    const validData = CheckoutSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      amount: Number(formData.get("amount")),
      productIds: formData.getAll("productIds").map((id) => Number(id)),
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

    const customerDataArr = await db
      .insert(customers)
      .values({
        name,
        email,
        phone,
        amount: amount.toString(),
        productIds,
      })
      .returning();
    if (!customerDataArr || customerDataArr.length === 0) {
      return { success: false, message: "Failed to initiate payment process" };
    }

    const merchantOrderId = `MT_${phone}_${Date.now()}`;

    const orderRequest = CreateSdkOrderRequest.StandardCheckoutBuilder()
      .merchantOrderId(merchantOrderId)
      .amount(amount)
      .redirectUrl(
        `${process.env.PHONEPE_REDIRECT_URL || "http://localhost:3000/payment-confirmation"}?merchantOrderId=${merchantOrderId}`,
      )
      .disablePaymentRetry(true)
      .expireAfter(3600)
      .message("Trial Registration Fee")
      .build();

    const response = await client.pay(orderRequest);
    console.log("PhonePe Response:", response);
    if (response.redirectUrl) {
      const dbexists = await db
        .select()
        .from(payments)
        .where(eq(payments.customerId, customerDataArr[0].id));
      if (dbexists && dbexists.length > 0) {
        await db
          .update(payments)
          .set({
            amount: amount.toString(),
            transactionId: merchantOrderId,
            paymentDate: new Date(),
            PaymentMethod: "PhonePePG",
            gatewayResponse: JSON.stringify(response),
          })
          .where(eq(payments.customerId, customerDataArr[0].id));
      } else {
        const dbres = await db
          .insert(payments)
          .values({
            amount: amount.toString(),
            customerId: customerDataArr[0].id,
            paymentStatus: "pending",
            transactionId: merchantOrderId,
            paymentDate: new Date(),
            PaymentMethod: "PhonePePG",
            gatewayResponse: JSON.stringify(response),
          })
          .returning();
        if (!dbres || dbres.length !== 1) {
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

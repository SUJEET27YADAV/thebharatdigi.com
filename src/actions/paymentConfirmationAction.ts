"use server";
import client from "@/utils/phonepeClient";
import { sendEmail } from "@/utils/mailHelper";
import jwt from "jsonwebtoken";
import { createServerClient } from "@/utils/supabase/server";
import { appUrl, requireEnv } from "@/utils/env";

// oxlint-disable-next-line react-doctor/server-auth-actions -- public payment-gateway callback, verified via PhonePe order status
export default async function paymentConfirmationAction(
  previousState: { msg: string },
  formData: FormData,
) {
  const supabase = createServerClient();
  try {
    const JWT_SECRET = requireEnv("JWT_SECRET");
    const BASE_URL = appUrl();
    const merchantOrderId = formData.get("merchantOrderId") as string;

    if (!merchantOrderId) {
      return {
        msg: "Missing order id.",
        status: "FAILED",
        amount: 0,
        paymentMode: "",
        transactionId: "",
      };
    }

    const response = await client.getOrderStatus(merchantOrderId);
    const state = response.state;
    const paymentDetails = response.paymentDetails?.[0];
    const paymentMode = paymentDetails?.paymentMode ?? "";
    const transactionId = paymentDetails?.transactionId ?? "";
    const amount = response.amount;

    const completed = (msg: string) => ({
      msg,
      status: "COMPLETED",
      amount,
      paymentMode,
      transactionId,
    });

    if (state === "COMPLETED") {
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .update({
          payment_status: "completed",
          gateway_response: JSON.stringify(response),
        })
        .eq("transaction_id", merchantOrderId)
        .select("customer_id")
        .single();

      if (!payment || paymentError) {
        return completed(
          `Your payment of ₹ ${amount / 100} has been successfully processed but we failed to update the database.`,
        );
      }

      const { data: customer, error: customerError } = await supabase
        .from("customers")
        .select("id, name, email, paid, product_id")
        .eq("id", payment.customer_id)
        .single();

      if (!customer || customerError) {
        return completed(
          `Your payment of ₹ ${amount / 100} has been successfully processed but there was an error fetching details from database.`,
        );
      }

      if (customer.paid) {
        return completed(
          `Your payment of ₹ ${amount / 100} has been successfully processed. Your order has been confirmed and shipped on your email address.`,
        );
      }

      const { data: products } = await supabase
        .from("products")
        .select("id, name")
        .in("id", customer.product_id);

      const downloadLinks = (products ?? []).map((product) => {
        const token = jwt.sign(
          { customerId: customer.id, productId: product.id },
          JWT_SECRET,
          { expiresIn: "48h" },
        );
        return {
          name: `${product.name}.zip`,
          url: `${BASE_URL}/api/download?token=${token}`,
        };
      });

      const linksHtml = downloadLinks
        .map(
          (link) =>
            `<a href="${link.url}" style="padding: 10px; background: #000; color: #fff; text-decoration: none; border-radius: 5px;">Download ${link.name}</a>`,
        )
        .join("<br/><br/>");

      const emailResult = await sendEmail(
        [{ name: customer.name, address: customer.email }],
        {
          subject: `Your access to Order id #[${merchantOrderId}]) is here! 🚀`,
          html: `<p>Thank you for your purchase! (Order #[${merchantOrderId}]). Here are the secure download links to your products :</p><br/><br/><p><b>Your secure download links are active only for the next 48 hours</b></p>${linksHtml}`,
        },
      );

      if (!emailResult.success) {
        console.error("Error sending email: ", emailResult.error);
        return completed(
          `Your payment of ₹ ${amount / 100} has been successfully processed but there was an error sending the email.`,
        );
      }

      await supabase
        .from("customers")
        .update({ paid: true })
        .eq("id", customer.id);

      return completed(
        `Your payment of ₹ ${amount / 100} has been successfully processed. Your order has been confirmed and shipped on your email address.`,
      );
    }

    if (state === "FAILED") {
      const { data: res, error: erro } = await supabase
        .from("payments")
        .update({
          payment_status: "failed",
          gateway_response: JSON.stringify(response),
        })
        .eq("transaction_id", merchantOrderId)
        .select()
        .single();

      if (!res || erro) {
        console.error("Failed to update Database: ", erro);
        return {
          msg: `Your Payment of ₹ ${amount / 100} has failed and there was an error updating the database.`,
          status: "FAILED",
          amount,
          paymentMode,
          transactionId,
        };
      }
      return {
        msg: `Your Payment of ₹ ${amount / 100} has failed.`,
        status: "FAILED",
        amount,
        paymentMode,
        transactionId,
      };
    }

    return {
      msg: "Your payment is still pending. Waiting for payment gateway response...",
      status: "PENDING",
      amount,
      paymentMode,
      transactionId,
    };
  } catch (error) {
    console.error("Internal Server Error:", error);
    return {
      msg: "Internal Server Error.",
      status: "FAILED",
      amount: 0,
      paymentMode: "",
      transactionId: "",
    };
  }
}

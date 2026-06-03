"use server";
import client from "@/utils/phonepeClient";
import { sendEmail } from "@/utils/mailHelper";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createServerClient } from "@/utils/supabase/server";
import { auth } from "@/utils/auth";

export default async function paymentConfirmationAction(
  previousState: { msg: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session) return { msg: "Unauthorized", status: "FAILED", amount: 0, paymentMode: "", transactionId: "" };
  const cookieStore = await cookies();
  const supabase = createServerClient();
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const BASE_URL =
      process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com";
    const merchantOrderId = formData.get("merchantOrderId") as string;
    const productData = formData.getAll("product").map((p) => String(p));
    const userId = merchantOrderId.slice(3, 39);
    const response = await client.getOrderStatus(merchantOrderId);
    const state = response.state;
    if (state === "COMPLETED") {
      const { data: res, error: er } = await supabase
        .from("payments")
        .update({
          payment_status: "completed",
          gateway_response: JSON.stringify(response),
        })
        .eq("transaction_id", merchantOrderId)
        .select()
        .single();

      if (!res || er) {
        return {
          msg: `Your payment of ₹ ${response.amount / 100} has been successfully processed but we failed to update the database.`,
          status: "COMPLETED",
          amount: response.amount,
          paymentMode: response.paymentDetails[0].paymentMode,
          transactionId: response.paymentDetails[0].transactionId,
        };
      }

      const { data: resp, error: err } = await supabase
        .from("customers")
        .update({
          paid: true,
        })
        .eq("id", userId)
        .select()
        .single();

      if (!resp || err) {
        return {
          msg: `Your payment of ₹ ${response.amount / 100} has been successfully processed but we failed to update the database.`,
          status: "COMPLETED",
          amount: response.amount,
          paymentMode: response.paymentDetails[0].paymentMode,
          transactionId: response.paymentDetails[0].transactionId,
        };
      }

      const { data: nameEmail, error } = await supabase
        .from("customers")
        .select("name,email")
        .eq("id", userId)
        .select()
        .single();

      if (!nameEmail || error) {
        console.error("Customer email not found: ", error);
        return {
          msg: `Your payment of ₹ ${response.amount / 100} has been successfully processed but there was an error fetching details from database.`,
          status: "COMPLETED",
          amount: response.amount,
          paymentMode: response.paymentDetails[0].paymentMode,
          transactionId: response.paymentDetails[0].transactionId,
        };
      }

      const downloadLinks = productData.map((product) => {
        const token = jwt.sign(
          {
            productId: product.split("~")[0],
            productName: product.split("~")[1],
          },
          JWT_SECRET,
          { expiresIn: "48h" }, // Link expires in 48 hours
        );
        return {
          name: `${product.split("~")[1]}.zip`,
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
        [{ name: nameEmail.name, address: nameEmail.email }],
        {
          subject: `Your access to Order id #[${merchantOrderId}]) is here! 🚀`,
          html: `<p>Thank you for your purchase! (Order #[${merchantOrderId}]). Here are the secure download links to your products :</p><br/><br/><p><b>Your secure download links are active only for the next 48 hours</b></p>${linksHtml}`,
        },
      );
      if (!emailResult.success) {
        console.error("Error sending email: ", emailResult.error);
        return {
          msg: `Your payment of ₹ ${response.amount / 100} has been successfully processed but there was an error sending the email.`,
          status: "COMPLETED",
          amount: response.amount,
          paymentMode: response.paymentDetails[0].paymentMode,
          transactionId: response.paymentDetails[0].transactionId,
        };
      }
      return {
        msg: `Your payment of ₹ ${response.amount / 100} has been successfully processed. Your order has been confirmed and shipped on your email address.`,
        status: "COMPLETED",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    } else if (state === "FAILED") {
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
          msg: `Your Payment of ₹ ${response.amount / 100} has failed and there was an error updating the database.`,
          status: "FAILED",
          amount: response.amount,
          paymentMode: response.paymentDetails[0].paymentMode,
          transactionId: response.paymentDetails[0].transactionId,
        };
      }
      return {
        msg: `Your Payment of ₹ ${response.amount / 100} has failed.`,
        status: "FAILED",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    } else {
      return {
        msg: "Your payment is still pending. Waiting for payment gateway response...",
        status: "PENDING",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    }
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

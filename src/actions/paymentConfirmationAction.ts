"use server";

import { db } from "@/db/db";
import { customers, payments } from "@/db/schema";
import client from "@/utils/phonepeClient";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/utils/mailHelper";
import jwt from "jsonwebtoken";

export default async function paymentConfirmationAction(
  previousState: { msg: string },
  formData: FormData,
) {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const BASE_URL =
    process.env.NEXT_PUBLIC_APP_URL || "https://thebharatdigi.com";
  const merchantOrderId = formData.get("merchantOrderId") as string;
  const productData = formData.getAll("product").map((p) => String(p));
  const phone = merchantOrderId.slice(3, 13);
  const response = await client.getOrderStatus(merchantOrderId);
  const state = response.state;
  try {
    if (state === "COMPLETED") {
      await db
        .update(payments)
        .set({
          paymentStatus: "completed",
          gatewayResponse: JSON.stringify(response),
        })
        .where(eq(payments.transactionId, merchantOrderId));
      await db
        .update(customers)
        .set({ paid: true })
        .where(eq(customers.phone, phone));
      const emailArr = await db
        .select({ name: customers.name, email: customers.email })
        .from(customers)
        .where(eq(customers.phone, phone));

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
        [{ name: emailArr[0].name, address: emailArr[0].email }],
        {
          subject: `Your access to Order id #[${merchantOrderId}]) is here! 🚀`,
          html: `<p>Thank you for your purchase! (Order #[${merchantOrderId}]). Here are the secure download links to your products :</p><br/><br/><p><b>Your secure download links are active only for the next 48 hours</b></p>${linksHtml}`,
        },
      );
      if (!emailResult.success) {
        console.error("Error sending email: ", emailResult.error);
      }
      return {
        msg: "COMPLETED",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    } else if (state === "FAILED") {
      await db
        .update(payments)
        .set({
          paymentStatus: "failed",
          gatewayResponse: JSON.stringify(response),
        })
        .where(eq(payments.transactionId, merchantOrderId));
      return {
        msg: "FAILED",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    } else {
      return {
        msg: "PENDING",
        amount: response.amount,
        paymentMode: response.paymentDetails[0].paymentMode,
        transactionId: response.paymentDetails[0].transactionId,
      };
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    return { msg: "FAILED", amount: 0, paymentMode: "", transactionId: "" };
  }
}

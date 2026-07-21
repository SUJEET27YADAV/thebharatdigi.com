"use server";
import nodemailer, { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { auth } from "@/utils/auth";

const sec = process.env.NODE_ENV !== "development";

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  secure: sec,
  port: sec ? process.env.SEC_PORT : process.env.NSEC_PORT,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
} as TransportOptions);

async function verifyTransport(): Promise<{
  success: boolean;
  msg: string;
}> {
  try {
    await transport.verify();
    return {
      success: true,
      msg: "Server is ready to take our messages",
    };
  } catch {
    return {
      success: false,
      msg: "Error, Server not ready to take our messages",
    };
  }
}

export async function sendEmail(
  recipients: { name: string; address: string }[],
  email: {
    subject: string;
    text?: string;
    html: string;
    attachments?: {
      filename: string;
      path?: string;
      content?: string | Buffer;
      contentType?: string;
    }[];
  },
): Promise<{
  success: boolean;
  msg: string;
  info: SMTPTransport.SentMessageInfo | null;
  error: string | null;
}> {
  const session = await auth();
  if (!session) return { success: false, msg: "Unauthorized", info: null, error: "Unauthorized" };
  try {
    const { success, msg } = await verifyTransport();
    if (!success) {
      return {
        success,
        msg,
        info: null,
        error: "Error sending Email",
      };
    }
    const info = await transport.sendMail({
      from: { name: "TheBharatDigi", address: process.env.APP_USER! },
      to: recipients,
      subject: email.subject,
      text: email.text,
      html: email.html,
      attachments: email.attachments,
    });
    if (info.rejected.length >= 1) {
      return {
        success: false,
        msg: "Error sending Email",
        info: info,
        error: "Error sending Email",
      };
    } else {
      return {
        success: true,
        msg: "Email sent successfully",
        info: info,
        error: null,
      };
    }
  } catch {
    return {
      success: false,
      msg: "Error sending Email",
      info: null,
      error: "Error sending Email",
    };
  }
}

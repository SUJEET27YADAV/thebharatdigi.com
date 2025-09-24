import nodemailer, { TransportOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const sec = process.env.NODE_ENV !== 'development';

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
  info: unknown;
  error: unknown;
}> {
  try {
    await transport.verify();
    return {
      success: true,
      msg: 'Server is ready to take our messages',
      info: null,
      error: null,
    };
  } catch (e) {
    return {
      success: false,
      msg: 'Error, Server not ready to take our messages',
      info: null,
      error: e,
    };
  }
}

export async function sendEmail(
  recipients: { name: string; address: string }[],
  email: { subject: string; text: string; html: string }
): Promise<{
  success: boolean;
  msg: string;
  info: SMTPTransport.SentMessageInfo | null;
  error: unknown;
}> {
  try {
    const { success, msg, error } = await verifyTransport();
    if (!success) {
      return {
        success,
        msg,
        info: null,
        error,
      };
    }
    console.log(msg);
    const info = await transport.sendMail({
      from: { name: 'TheBharatDigi', address: process.env.APP_USER! },
      to: recipients,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    if (info.rejected.length >= 1) {
      return {
        success: false,
        msg: 'Error sending Email',
        info: info,
        error: null,
      };
    } else {
      return {
        success: true,
        msg: 'Email sent successfully',
        info: info,
        error: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      msg: 'Error sending Email',
      info: null,
      error: err,
    };
  }
}

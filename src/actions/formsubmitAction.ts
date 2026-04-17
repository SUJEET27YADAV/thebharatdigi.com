"use server";
import { sendEmail } from "@/utils/mailHelper";

export default async function SubmitAction(
  PrevState: { msg: string },
  formData: FormData,
) {
  const name = formData.get("name");
  const email = formData.get("email");
  const pType = formData.get("pType");
  const message = formData.get("message");
  const mail = {
    subject: "Query from website",
    text: `${name} (${email}) has sent a query regarding ${pType} project category. Their message is: "${message}"`,
    html: `<p>${name} (${email}) has sent a query regarding ${pType} project category.</p><p>Their message is:<br>${message}</p>`,
  };
  await sendEmail(
    [{ name: "TheBharatDigital", address: "tdbhelpcenter@gmail.com" }],
    mail,
  );
  const msg = `Thank you ${name}, for your message! We will get back to you within 24 hours.`;
  return { msg };
}

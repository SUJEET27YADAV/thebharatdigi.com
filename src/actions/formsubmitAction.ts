"use server";
import { sendEmail } from "@/utils/mailHelper";
import { auth } from "@/utils/auth";

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export default async function SubmitAction(
  PrevState: { msg: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session) return { msg: "Unauthorized" };
  try {
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const pType = String(formData.get("pType") ?? "");
    const message = String(formData.get("message") ?? "");
    const mail = {
      subject: "Query from website",
      text: `${name} (${email}) has sent a query regarding ${pType} project category. Their message is: "${message}"`,
      html: `<p>${escapeHtml(name)} (${escapeHtml(email)}) has sent a query regarding ${escapeHtml(pType)} project category.</p><p>Their message is:<br>${escapeHtml(message)}</p>`,
    };
    await sendEmail(
      [{ name: "TheBharatDigital", address: "tdbhelpcenter@gmail.com" }],
      mail,
    );
    const msg = `Thank you ${name}, for your message! We will get back to you within 24 hours.`;
    return { msg };
  } catch (error) {
    console.error("Error Submitting form:", error);
    return {
      msg: "An error occurred while submitting your message. Please try again later.",
    };
  }
}

import type { Metadata } from "next";
import { generateSecurePassword } from "@/utils/passwordgen";
import PassgenPage from "../../components/passgenPage";

export const metadata: Metadata = {
  title: "Password Generator | The Bharat Digital",
  description:
    "Generate secure, random passwords instantly with The Bharat Digital's free password generator tool.",
};

async function genAction(
  prevState: { message: string; password: string } | undefined,
  formData: FormData,
) {
  "use server";
  try {
    const len = parseInt((formData.get("passlen") as string) || "10");
    const password = await generateSecurePassword(len);
    return { message: "Password generated successfully", password };
  } catch (err) {
    console.error(err);
    return { message: "Error generating password", password: "" };
  }
}

export default async function Page() {
  return <PassgenPage action={genAction} />;
}

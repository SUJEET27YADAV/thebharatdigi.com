import { cookies } from "next/headers";
import { verifyAdminToken } from "@/utils/admin/auth";

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

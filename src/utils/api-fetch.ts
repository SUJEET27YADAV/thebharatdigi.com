import { cookies } from "next/headers";
import { appUrl } from "@/utils/env";

type ApiEnvelope<T> = { success: boolean; data?: T };

async function fetchApi<T>(path: string): Promise<T | null> {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(`${appUrl("http://localhost:3000")}${path}`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchApiList<T>(path: string): Promise<T[]> {
  const res = await fetchApi<ApiEnvelope<T[]>>(path);
  return res?.success && Array.isArray(res.data) ? res.data : [];
}

export async function fetchApiData<T>(path: string): Promise<T | null> {
  const res = await fetchApi<ApiEnvelope<T>>(path);
  return res?.success ? (res.data ?? null) : null;
}

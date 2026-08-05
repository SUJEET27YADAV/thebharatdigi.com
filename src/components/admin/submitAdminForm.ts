"use client";

import { toast } from "react-toastify";

type SubmitAdminFormMessages = {
  success: string;
  error: string;
};

export async function submitAdminForm(
  path: string,
  method: "POST",
  data: Record<string, unknown>,
  messages: SubmitAdminFormMessages,
): Promise<boolean> {
  try {
    const response = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const res = await response.json();
    if (res.success) {
      toast.success(res.msg || messages.success);
      return true;
    }
    toast.error(res.msg || messages.error);
    return false;
  } catch (err) {
    console.error(err);
    toast.error(messages.error);
    return false;
  }
}

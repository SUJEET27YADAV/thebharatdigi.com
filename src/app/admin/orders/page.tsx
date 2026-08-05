import type { Metadata } from "next";
import OrdersManager from "./_components/OrdersManager";
import { Order } from "@/types/types";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Orders | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  let orders: Order[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(`${baseUrl}/api/getOrders`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });
    if (response.ok) {
      const res = await response.json();
      if (res.success && Array.isArray(res.data)) {
        orders = res.data.map((o: Order) => ({
          ...o,
          amount: Number(o.amount) / 100,
        }));
      }
    }
  } catch {}
  return <OrdersManager orders={orders} />;
}

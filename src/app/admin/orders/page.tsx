import type { Metadata } from "next";
import OrdersManager from "./_components/OrdersManager";
import { Order } from "@/types/types";
import { fetchApiList } from "@/utils/api-fetch";

export const metadata: Metadata = {
  title: "Orders | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  const orders = await fetchApiList<Order>("/api/getOrders");
  return <OrdersManager orders={orders} />;
}

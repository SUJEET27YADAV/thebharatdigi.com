import type { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";
import { AdminDashboardStats, Order } from "@/types/types";
import { fetchApiData, fetchApiList } from "@/utils/api-fetch";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Bharat Digital",
  description:
    "Admin dashboard for managing orders, customers, and business analytics.",
};

const defaultStats: AdminDashboardStats = {
  totalOrders: { value: 0, trend: { value: 0, direction: "up" } },
  totalCustomers: { value: 0, trend: { value: 0, direction: "up" } },
  totalRevenue: { value: 0, trend: { value: 0, direction: "up" } },
  totalSales: { value: 0, trend: { value: 0, direction: "up" } },
};

export default async function Page() {
  const [stats, recentOrders] = await Promise.all([
    fetchApiData<AdminDashboardStats>("/api/getOrderStats"),
    fetchApiList<Order>("/api/getOrders"),
  ]);
  return (
    <AdminDashboardClient
      stats={stats ?? defaultStats}
      recentOrders={recentOrders}
    />
  );
}

import type { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";
import { AdminDashboardStats, Order } from "@/types/types";

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
  let stats: AdminDashboardStats = defaultStats;
  let recentOrders: Order[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/getOrderStats`, {
      cache: "no-store",
    });
    const res = await response.json();
    if (res.success) {
      stats = res.data;
    }
    const respo = await fetch(`${baseUrl}/api/getOrders`, {
      cache: "no-store",
    });
    const resp = await respo.json();
    if (resp.success) {
      recentOrders = resp.data.map((o: Order) => ({
        ...o,
        amount: Number(o.amount) / 100,
      }));
    }
  } catch {}
  return <AdminDashboardClient stats={stats} recentOrders={recentOrders} />;
}

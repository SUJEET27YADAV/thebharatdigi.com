import type { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";
import { Order } from "@/types/types";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Bharat Digital",
  description: "Admin dashboard for managing orders, customers, and business analytics.",
};

interface AdminStats {
  totalOrders: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalCustomers: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalRevenue: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalSales: { value: number; trend: { value: number; direction: "up" | "down" } };
}

const defaultStats: AdminStats = {
  totalOrders: { value: 0, trend: { value: 0, direction: "up" } },
  totalCustomers: { value: 0, trend: { value: 0, direction: "up" } },
  totalRevenue: { value: 0, trend: { value: 0, direction: "up" } },
  totalSales: { value: 0, trend: { value: 0, direction: "up" } },
};

export default async function Page() {
  let stats: AdminStats = defaultStats;
  let recentOrders: Order[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/getOrderStats`, { cache: "no-store" });
    const res = await response.json();
    if (res.success) {
      stats = res.data;
    }
    const respo = await fetch(`${baseUrl}/api/getOrders`, { cache: "no-store" });
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

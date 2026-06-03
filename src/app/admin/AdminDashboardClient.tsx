"use client";

import {
  IndianRupee,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";
import StatsCard from "@/app/_components/admin/StatsCard";
import AdminTable from "@/app/_components/admin/AdminTable";
import Link from "next/link";
import { useAdmin } from "@/contexts/AdminAuthContext";
import { Order } from "@/types/types";

const TABLE_COLUMNS = [
  { key: "name", label: "Customer", width: "max-w-[200px]" },
  { key: "email", label: "Email", width: "max-w-[200px]" },
  { key: "amount", label: "Amount", width: "max-w-[200px]" },
  { key: "paid", label: "Status", width: "max-w-[200px]" },
  { key: "created_at", label: "Date", width: "max-w-[200px]" },
];

interface AdminStats {
  totalOrders: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalCustomers: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalRevenue: { value: number; trend: { value: number; direction: "up" | "down" } };
  totalSales: { value: number; trend: { value: number; direction: "up" | "down" } };
}

interface AdminDashboardClientProps {
  stats: AdminStats;
  recentOrders: Order[];
}

export default function AdminDashboardClient({ stats, recentOrders }: AdminDashboardClientProps) {
  const { user } = useAdmin();

  const tableData = recentOrders.map((order) => ({
    ...order,
    paid: (
      <span
        className={`px-3 py-1 rounded text-xs font-medium ${order.paid ? "bg-[#00c75820] text-[#00c758]" : "bg-[#f99c0020] text-[#f99c00]"}`}
      >
        {order.paid ? "Completed" : "Pending"}
      </span>
    ),
  }));

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm text-[#314158] dark:text-gray-400">
          Welcome back, {user?.name || "Admin"}. Here&apos;s your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue.value}
          icon={<IndianRupee size={24} />}
          color="success"
          trend={{
            value: stats.totalRevenue.trend.value,
            direction: stats.totalRevenue.trend.direction,
          }}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.value}
          icon={<ShoppingCart size={24} />}
          color="default"
          trend={{
            value: stats.totalOrders.trend.value,
            direction: stats.totalOrders.trend.direction,
          }}
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers.value}
          icon={<Users size={24} />}
          color="warning"
          trend={{
            value: stats.totalCustomers.trend.value,
            direction: stats.totalCustomers.trend.direction,
          }}
        />
        <StatsCard
          title="Total Sales"
          value={stats.totalSales.value}
          icon={<TrendingUp size={24} />}
          color="default"
          trend={{
            value: stats.totalSales.trend.value,
            direction: stats.totalSales.trend.direction,
          }}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <p className="text-xs mt-1 text-[#314158] dark:text-gray-400">
              Your latest transactions
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90 bg-[#ac4bff] text-[#ffffff]"
          >
            View All
          </Link>
        </div>

        <AdminTable columns={TABLE_COLUMNS} data={tableData} />
      </div>
    </div>
  );
}

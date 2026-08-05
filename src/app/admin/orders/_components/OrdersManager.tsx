"use client";

import { useMemo, useState } from "react";
import AdminTable, { type AdminRow } from "@/components/admin/AdminTable";
import { useAdminList } from "@/components/admin/useAdminList";
import { Search, Filter, Loader2 } from "lucide-react";
import { Order } from "@/types/types";
import EditOrderModal from "./EditOrderModal";

const TABLE_COLUMNS = [
  { key: "name", label: "Customer", width: "max-w-[200px]" },
  { key: "email", label: "Email", width: "max-w-[200px]" },
  { key: "phone", label: "Phone", width: "max-w-[200px]" },
  { key: "amount", label: "Amount", width: "max-w-[200px]" },
  {
    key: "status",
    label: "Status",
    width: "max-w-[200px]",
    style: `px-3 py-1 rounded text-xs font-medium`,
  },
  { key: "product_id", label: "Products", width: "max-w-[200px]" },
  { key: "created_at", label: "Date", width: "max-w-[200px]" },
];

export default function OrdersManager({ orders }: { orders: Order[] }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending"
  >("all");

  const { items, searchTerm, loading, setSearchTerm, fetchItems, removeItem } =
    useAdminList({
      initialItems: orders,
      listPath: "/api/getOrders",
      deletePath: "/api/deleteOrder",
      deleteConfirm: () => "Are you sure you want to delete this order?",
      messages: {
        success: "Order deleted successfully!",
        deleteError: "Failed to delete order, please try again.",
        loadError: "Failed to fetch orders",
      },
    });

  const filteredOrders = useMemo(() => {
    let filtered = items.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    if (statusFilter === "completed") {
      filtered = filtered.filter((o) => o.paid);
    } else if (statusFilter === "pending") {
      filtered = filtered.filter((o) => !o.paid);
    }
    return filtered;
  }, [items, searchTerm, statusFilter]);

  const handleEdit = (row: AdminRow) => {
    const item = items.find((o) => o.id === row.id);
    if (item) setOrder(item);
  };

  const onEditModalClose = () => {
    setOrder(null);
    fetchItems(); // Refresh orders after editing
  };

  const tableData = filteredOrders.map((order) => ({
    ...order,
    amount: Number(order.amount) / 100,
    product_id: order.product_id.join(", "),
    status: (
      <span
        className={`px-3 py-1 rounded text-xs font-medium ${order.paid ? "bg-[#00c75820] text-[#00c758]" : "bg-[#f99c0020] text-[#f99c00]"}`}
      >
        {order.paid ? "Completed" : "Pending"}
      </span>
    ),
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-160px)] text-[#314158] dark:text-white text-lg font-medium">
        <Loader2 size={40} className="animate-spin" />
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Orders</h1>
        <p className="text-sm text-[#314158] dark:text-gray-400">
          View and manage customer orders
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 px-4 py-3 rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
          <Search size={18} className="text-[#314158] dark:text-white" />
          <input
            type="text"
            aria-label="Search orders"
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="min-w-[150px] relative rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
          <Filter size={18} className="absolute top-3.5 left-4" />
          <select
            aria-label="Filter orders by status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | "completed" | "pending")
            }
            className="w-full px-10 py-3 bg-transparent outline-none text-sm"
          >
            <option value="all" className="w-full dark:bg-[#0f172b]">
              All Orders
            </option>
            <option value="completed" className="w-full dark:bg-[#0f172b]">
              Completed
            </option>
            <option value="pending" className="w-full dark:bg-[#0f172b]">
              Pending
            </option>
          </select>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={TABLE_COLUMNS}
        data={tableData}
        onEdit={handleEdit}
        onDelete={removeItem}
      />
      {/* Edit order Modal */}
      {order && (
        <EditOrderModal order={order} onClose={onEditModalClose} />
      )}
    </div>
  );
}

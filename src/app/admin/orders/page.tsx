"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import AdminTable from "@/app/_components/admin/AdminTable";
import { Search, Filter, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Order } from "@/types/types";
import EditOrderModal from "./_components/EditOrderModal";

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

type State = {
  orders: Order[];
  searchTerm: string;
  statusFilter: "all" | "completed" | "pending";
  loading: boolean;
};

type Action =
  | { type: "SET_DATA"; payload: Order[] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_STATUS_FILTER"; payload: "all" | "completed" | "pending" }
  | { type: "SET_LOADING"; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, orders: action.payload, loading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function OrdersPage() {
  const [state, dispatch] = useReducer(reducer, {
    orders: [],
    searchTerm: "",
    statusFilter: "all" as const,
    loading: true,
  });
  const [order, setOrder] = useState<Record<
    string,
    string | boolean | number
  > | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredOrders = useMemo(() => {
    let filtered = state.orders.filter(
      (order) =>
        order.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
    if (state.statusFilter === "completed") {
      filtered = filtered.filter((o) => o.paid);
    } else if (state.statusFilter === "pending") {
      filtered = filtered.filter((o) => !o.paid);
    }
    return filtered;
  }, [state.orders, state.searchTerm, state.statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/getOrders");
      const res = await response.json();
      if (res.success) {
        const data = res.data.map((o: Order) => ({
          ...o,
          amount: Number(o.amount) / 100,
        }));
        dispatch({ type: "SET_DATA", payload: data });
      } else {
        dispatch({ type: "SET_DATA", payload: [] });
        toast.error(res.msg || "Failed to fetch recent orders");
      }
    } catch (err) {
      console.error("Failed to fetch Order:", err);
      toast.error("Failed to fetch Orders");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (order: Record<string, string | boolean | number>) => {
    setOrder(order);
    setShowEditModal(true);
  };
  const handleDelete = async (
    order: Record<string, string | boolean | number>,
  ) => {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        const response = await fetch("/api/deleteOrder", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: order.id }),
        });
        const res = await response.json();
        if (res.success) {
          toast.success(res.msg || "Order deleted successfully!");
          fetchOrders();
        } else {
          toast.error(res.msg || "Failed to delete order, please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete order. Please try again.");
      }
    }
  };

  const onEditModalClose = () => {
    setShowEditModal(false);
    fetchOrders(); // Refresh orders after editing
  };

  const tableData = filteredOrders.map((order) => ({
    ...order,
    product_id: order.product_id.join(", "),
    status: (
      <span
        className={`px-3 py-1 rounded text-xs font-medium ${order.paid ? "bg-[#00c75820] text-[#00c758]" : "bg-[#f99c0020] text-[#f99c00]"}`}
      >
        {order.paid ? "Completed" : "Pending"}
      </span>
    ),
  }));

  if (state.loading) {
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
            value={state.searchTerm}
            onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="min-w-[150px] relative rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
          <Filter size={18} className="absolute top-3.5 left-4" />
          <select
            value={state.statusFilter}
            onChange={(e) =>
              dispatch({ type: "SET_STATUS_FILTER", payload: e.target.value as "all" | "completed" | "pending" })
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
        onDelete={handleDelete}
      />
      {/* Edit order Modal */}
      {showEditModal && (
        <EditOrderModal order={order!} onClose={onEditModalClose} />
      )}
    </div>
  );
}

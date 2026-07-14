"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import AdminTable from "@/components/admin/AdminTable";
import { Loader2, Plus, Search } from "lucide-react";
import { Product } from "@/types/types";
import AddProductModal from "./_components/AddProductModal";
import EditProductModal from "./_components/EditProductModal";
import { toast } from "react-toastify";

const TABLE_COLUMNS = [
  { key: "serial", label: "S.No.", width: "max-w-[200px]" },
  { key: "name", label: "Product Name", width: "max-w-[200px]" },
  { key: "tag", label: "Category", width: "max-w-[200px]" },
  { key: "price", label: "Price", width: "max-w-[200px]" },
  { key: "description", label: "Description", width: "max-w-[200px]" },
  { key: "features", label: "Features", width: "max-w-[200px]" },
];

type State = {
  products: Product[];
  searchTerm: string;
  loading: boolean;
};

type Action =
  | { type: "SET_DATA"; payload: Product[] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, products: action.payload, loading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function ProductsPage() {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    searchTerm: "",
    loading: true,
  });
  const [product, setProduct] = useState<Record<
    string,
    string | number | boolean
  > | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredProducts = useMemo(() => {
    return state.products.filter(
      (product) =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
  }, [state.products, state.searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/getProducts");
      const res = await response.json();
      if (res.success) {
        dispatch({ type: "SET_DATA", payload: res.data || [] });
      } else {
        dispatch({ type: "SET_DATA", payload: [] });
        toast.error(res.msg || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Record<string, string | number | boolean>) => {
    setProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = async (
    product: Record<string, string | number | boolean>,
  ) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        const response = await fetch("/api/deleteProduct", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: product.id }),
        });
        const res = await response.json();
        if (res.success) {
          toast.success(res.msg || "Product deleted successfully!");
          fetchProducts();
        } else {
          toast.error(res.msg || "Failed to delete product, please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product. Please try again.");
      }
    }
  };

  const onAddModalClose = () => {
    setShowAddModal(false);
    fetchProducts();
  };

  const onEditModalClose = () => {
    setShowEditModal(false);
    fetchProducts();
  };

  const tableData = filteredProducts.map((product) => ({
    ...product,
    features: product.features.join(", "),
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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Products</h1>
          <p className="text-sm text-[#314158] dark:text-white">
            Manage your digital products
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded font-medium bg-[#ac4bff] transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          <span>New Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3 rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
        <Search size={18} className="text-[#314158] dark:text-white" />
        <input
          type="text"
          aria-label="Search products"
          placeholder="Search products..."
          value={state.searchTerm}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={TABLE_COLUMNS}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* New Product Modal */}
      {showAddModal && <AddProductModal onClose={onAddModalClose} />}
      {/* Edit Product Modal */}
      {showEditModal && (
        <EditProductModal product={product!} onClose={onEditModalClose} />
      )}
    </div>
  );
}

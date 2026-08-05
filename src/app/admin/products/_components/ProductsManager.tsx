"use client";

import { useMemo, useState } from "react";
import AdminTable, { type AdminRow } from "@/components/admin/AdminTable";
import { useAdminList } from "@/components/admin/useAdminList";
import { Loader2, Plus, Search } from "lucide-react";
import { Product } from "@/types/types";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const TABLE_COLUMNS = [
  { key: "serial", label: "S.No.", width: "max-w-[200px]" },
  { key: "name", label: "Product Name", width: "max-w-[200px]" },
  { key: "tag", label: "Category", width: "max-w-[200px]" },
  { key: "price", label: "Price", width: "max-w-[200px]" },
  { key: "description", label: "Description", width: "max-w-[200px]" },
  { key: "features", label: "Features", width: "max-w-[200px]" },
];

export default function ProductsManager({ products }: { products: Product[] }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const { items, searchTerm, loading, setSearchTerm, fetchItems, removeItem } =
    useAdminList({
      initialItems: products,
      listPath: "/api/getProducts",
      deletePath: "/api/deleteProduct",
      deleteConfirm: (item) => `Are you sure you want to delete "${item.name}"?`,
      messages: {
        success: "Product deleted successfully!",
        deleteError: "Failed to delete product, please try again.",
        loadError: "Failed to fetch products",
      },
    });

  const filteredProducts = useMemo(() => {
    return items.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [items, searchTerm]);

  const handleEdit = (row: AdminRow) => {
    const item = items.find((p) => p.id === row.id);
    if (item) setProduct(item);
  };

  const onAddModalClose = () => {
    setShowAddModal(false);
    fetchItems();
  };

  const onEditModalClose = () => {
    setProduct(null);
    fetchItems();
  };

  const tableData = filteredProducts.map((product) => ({
    ...product,
    features: product.features.join(", "),
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={TABLE_COLUMNS}
        data={tableData}
        onEdit={handleEdit}
        onDelete={removeItem}
      />
      {/* New Product Modal */}
      {showAddModal && <AddProductModal onClose={onAddModalClose} />}
      {/* Edit Product Modal */}
      {product && (
        <EditProductModal product={product} onClose={onEditModalClose} />
      )}
    </div>
  );
}

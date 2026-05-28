"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/_components/admin/AdminTable";
import { Loader2, Plus, Search } from "lucide-react";
import { Product } from "@/types/types";
import AddProductModal from "./_components/AddProductModal";
import EditProductModal from "./_components/EditProductModal";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Record<
    string,
    string | number | boolean
  > | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/getProducts");
      const res = await response.json();
      if (res.success) {
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
      } else {
        setProducts([]);
        toast.error(res.msg || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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

  const tableColumns = [
    { key: "serial", label: "S.No.", width: "max-w-[200px]" },
    { key: "name", label: "Product Name", width: "max-w-[200px]" },
    { key: "tag", label: "Category", width: "max-w-[200px]" },
    { key: "price", label: "Price", width: "max-w-[200px]" },
    { key: "description", label: "Description", width: "max-w-[200px]" },
    { key: "features", label: "Features", width: "max-w-[200px]" },
  ];

  const tableData = filteredProducts.map((product) => ({
    ...product,
    features: product.features.join(", "),
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-160px)] text-[#314158] dark:text-white text-lg font-medium">
        <Loader2 size={40} className="animate-spin" />
        <span>Loading...</span>
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
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={tableColumns}
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

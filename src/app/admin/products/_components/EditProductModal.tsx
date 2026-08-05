import AdminModal, { adminInputClass } from "@/components/admin/AdminModal";
import { submitAdminForm } from "@/components/admin/submitAdminForm";
import { Product } from "@/types/types";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function EditProductModal({
  product,
  onClose,
}: EditProductModalProps) {
  const handleSubmit = async (formData: FormData) => {
    return submitAdminForm(
      "/api/updateProduct",
      "POST",
      {
        id: product.id,
        image_url: String(formData.get("image_url") ?? ""),
        name: String(formData.get("name") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: String(formData.get("price") ?? ""),
        tag: String(formData.get("tag") ?? ""),
        features: String(formData.get("features") ?? "")
          .split("\\")
          .map((f) => f.trim()),
      },
      {
        success: "Product updated successfully!",
        error: "Failed to update product, please try again.",
      },
    );
  };

  return (
    <AdminModal
      title="Edit Product"
      onClose={onClose}
      submit={handleSubmit}
      submitLabel="Update Product"
      submittingLabel="Updating Product..."
    >
      <label htmlFor="serial">Product Serial Number</label>
      <input
        id="serial"
        name="serial"
        placeholder="Enter product serial number"
        defaultValue={product.serial}
        disabled={true}
        className={`${adminInputClass} bg-gray-400 dark:bg-gray-600 cursor-not-allowed`}
      />
      <label htmlFor="image_url">Product Image URL</label>
      <input
        id="image_url"
        name="image_url"
        placeholder="Enter image URL"
        defaultValue={product.image_url}
        className={adminInputClass}
      />
      <label htmlFor="name">Product Name</label>
      <input
        id="name"
        name="name"
        placeholder="Enter product name"
        defaultValue={product.name}
        className={adminInputClass}
      />
      <label htmlFor="description">Product Description</label>
      <input
        id="description"
        name="description"
        placeholder="Enter product description"
        defaultValue={product.description}
        className={adminInputClass}
      />
      <label htmlFor="price">Product Price</label>
      <input
        id="price"
        name="price"
        placeholder="Enter product price"
        defaultValue={product.price}
        className={adminInputClass}
      />
      <label htmlFor="tag">Product Tag</label>
      <input
        id="tag"
        name="tag"
        placeholder="Enter tag"
        defaultValue={product.tag}
        className={adminInputClass}
      />
      <label htmlFor="features">
        Features <span className="text-sm">(Backslash-separated ( \ ))</span>
      </label>
      <input
        id="features"
        name="features"
        placeholder="Enter features"
        defaultValue={product.features.join("\\")}
        className={adminInputClass}
      />
    </AdminModal>
  );
}

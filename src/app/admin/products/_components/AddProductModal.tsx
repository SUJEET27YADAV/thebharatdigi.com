import AdminModal, { adminInputClass } from "@/components/admin/AdminModal";
import { submitAdminForm } from "@/components/admin/submitAdminForm";

interface AddProductModalProps {
  onClose: () => void;
}

async function handleSubmit(formData: FormData): Promise<boolean> {
  return submitAdminForm(
    "/api/addProduct",
    "POST",
    {
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
      success: "Product added successfully!",
      error: "Failed to add product, please try again.",
    },
  );
}

export default function AddProductModal({ onClose }: AddProductModalProps) {
  return (
    <AdminModal
      title="Add Product"
      onClose={onClose}
      submit={handleSubmit}
      submitLabel="Add Product"
      submittingLabel="Adding Product..."
    >
      <label htmlFor="image_url">Product Image URL</label>
      <input
        id="image_url"
        name="image_url"
        placeholder="Enter image URL"
        className={adminInputClass}
      />
      <label htmlFor="name">Product Name</label>
      <input
        id="name"
        name="name"
        placeholder="Enter product name"
        className={adminInputClass}
      />
      <label htmlFor="description">Product Description</label>
      <input
        id="description"
        name="description"
        placeholder="Enter product description"
        className={adminInputClass}
      />
      <label htmlFor="price">Product Price</label>
      <input
        id="price"
        name="price"
        placeholder="Enter product price"
        className={adminInputClass}
      />
      <label htmlFor="tag">Product Tag</label>
      <input
        id="tag"
        name="tag"
        placeholder="Enter tag"
        className={adminInputClass}
      />
      <label htmlFor="features">
        Features <span className="text-sm">(Backslash-separated ( \ ))</span>
      </label>
      <input
        id="features"
        name="features"
        placeholder="Enter features"
        className={adminInputClass}
      />
    </AdminModal>
  );
}

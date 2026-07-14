import Modal from "@/components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface AddProductModalProps {
  onClose: () => void;
}

export default function AddProductModal({ onClose }: AddProductModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        image_url: formData.get("image_url") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string,
        tag: formData.get("tag") as string,
        features: (formData.get("features") as string)
          .split("\\")
          .map((f) => f.trim()),
      };
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Product added successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to add product, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "w-full p-2 border border-slate-500 rounded outline-none focus:ring-2 focus:ring-indigo-600 transition-colors";
  return (
    <Modal>
      <div className="relative w-full max-w-md p-6 flex flex-col items-center gap-4 bg-white/60 dark:bg-black/30 rounded">
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => onClose()}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Add Product</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="image_url">Product Image URL</label>
          <input
            id="image_url"
            name="image_url"
            placeholder="Enter image URL"
            className={inputClass}
          />
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter product name"
            className={inputClass}
          />
          <label htmlFor="description">Product Description</label>
          <input
            id="description"
            name="description"
            placeholder="Enter product description"
            className={inputClass}
          />
          <label htmlFor="price">Product Price</label>
          <input
            id="price"
            name="price"
            placeholder="Enter product price"
            className={inputClass}
          />
          <label htmlFor="tag">Product Tag</label>
          <input
            id="tag"
            name="tag"
            placeholder="Enter tag"
            className={inputClass}
          />
          <label htmlFor="features">
            Features{" "}
            <span className="text-sm">(Backslash-separated ( \ ))</span>
          </label>
          <input
            id="features"
            name="features"
            placeholder="Enter features"
            className={inputClass}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

import Modal from "@/app/_components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface EditProductModalProps {
  product: Record<string, string | number | boolean>;
  onClose: () => void;
}

export default function EditProductModal({
  product,
  onClose,
}: EditProductModalProps) {
  const [loading, setLoading] = useState(false);
  console.log("Editing product:", product);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        id: product.id,
        image_url: formData.get("image_url") as string,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: formData.get("price") as string,
        tag: formData.get("tag") as string,
        features: (formData.get("features") as string)
          .split("\\")
          .map((f) => f.trim()),
      };
      const response = await fetch("/api/updateProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Product updated successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to update product, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "w-full p-2 border border-slate-500 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  return (
    <Modal>
      <div className="relative w-full max-w-md p-6 flex flex-col items-center gap-4 bg-white/60 dark:bg-black/30 rounded-xl backdrop-blur-md">
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => onClose()}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Edit Product</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="serial">Product Serial Number</label>
          <input
            id="serial"
            name="serial"
            placeholder="Enter product serial number"
            defaultValue={product.serial as string}
            disabled={true}
            className={`${inputClass} bg-gray-400 dark:bg-gray-600 cursor-not-allowed`}
          />
          <label htmlFor="image_url">Product Image URL</label>
          <input
            id="image_url"
            name="image_url"
            placeholder="Enter image URL"
            defaultValue={product.image_url as string}
            className={inputClass}
          />
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            placeholder="Enter product name"
            defaultValue={product.name as string}
            className={inputClass}
          />
          <label htmlFor="description">Product Description</label>
          <input
            id="description"
            name="description"
            placeholder="Enter product description"
            defaultValue={product.description as string}
            className={inputClass}
          />
          <label htmlFor="price">Product Price</label>
          <input
            id="price"
            name="price"
            placeholder="Enter product price"
            defaultValue={product.price as string}
            className={inputClass}
          />
          <label htmlFor="tag">Product Tag</label>
          <input
            id="tag"
            name="tag"
            placeholder="Enter tag"
            defaultValue={product.tag as string}
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
            defaultValue={(product.features as string).split(", ").join("\\")}
            className={inputClass}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

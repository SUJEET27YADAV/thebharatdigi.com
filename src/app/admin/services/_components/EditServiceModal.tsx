import Modal from "@/app/_components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface EditServiceModalProps {
  service: Record<string, string | number | boolean>;
  onClose: () => void;
}

export default function EditServiceModal({
  service,
  onClose,
}: EditServiceModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        id: service.id,
        icon: formData.get("icon") as string,
        title: formData.get("title") as string,
        shortdesc: formData.get("shortdesc") as string,
        fulldesc: formData.get("fulldesc") as string,
        features: (formData.get("features") as string)
          .split("\\")
          .map((f) => f.trim()),
        color: formData.get("color") as string,
        popular: formData.get("popular") === "on",
      };
      const response = await fetch("/api/updateService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Service updated successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to update service, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update service. Please try again.");
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
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          onClick={() => onClose()}
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold">Edit Service</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="icon">Service Icon</label>
          <input
            id="icon"
            name="icon"
            placeholder="Enter icon name"
            defaultValue={service.icon as string}
            className={inputClass}
          />
          <label htmlFor="title">Service Title</label>
          <input
            id="title"
            name="title"
            placeholder="Enter service title"
            defaultValue={service.title as string}
            className={inputClass}
          />
          <label htmlFor="shortdesc">Short Description</label>
          <input
            id="shortdesc"
            name="shortdesc"
            placeholder="Enter short description"
            defaultValue={service.shortdesc as string}
            className={inputClass}
          />
          <label htmlFor="fulldesc">Full Description</label>
          <input
            id="fulldesc"
            name="fulldesc"
            placeholder="Enter full description"
            defaultValue={service.fulldesc as string}
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
            defaultValue={(service.features as string).split(", ").join("\\")}
            className={inputClass}
          />
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            placeholder="Enter color"
            defaultValue={service.color as string}
            className={inputClass}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="popular">Popular</label>
            <input
              id="popular"
              name="popular"
              type="checkbox"
              defaultChecked={service.popular === "Yes"}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Updating Service..." : "Update Service"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

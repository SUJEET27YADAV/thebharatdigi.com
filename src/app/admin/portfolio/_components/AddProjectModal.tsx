import Modal from "@/app/_components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface AddProjectModalProps {
  onClose: () => void;
}

export default function AddProjectModal({ onClose }: AddProjectModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        icon: formData.get("icon") as string,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        category: formData.get("category") as string,
        color: formData.get("color") as string,
        technologies: (formData.get("technologies") as string)
          .split("\\")
          .map((f) => f.trim()),
        year: formData.get("year") as string,
        link: formData.get("link") as string,
        featured: formData.get("featured") === "on",
      };
      const response = await fetch("/api/addProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Project added successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to add project, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add project. Please try again.");
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
        <h2 className="text-xl font-bold">Add Project</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="icon">Project Icon</label>
          <input
            id="icon"
            name="icon"
            placeholder="Enter icon name"
            className={inputClass}
          />
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            name="title"
            placeholder="Enter project title"
            className={inputClass}
          />
          <label htmlFor="subtitle">Project Subtitle</label>
          <input
            id="subtitle"
            name="subtitle"
            placeholder="Enter project subtitle"
            className={inputClass}
          />
          <label htmlFor="category">Project Category</label>
          <input
            id="category"
            name="category"
            placeholder="Enter project category"
            className={inputClass}
          />
          <label htmlFor="technologies">
            Technologies Used{" "}
            <span className="text-sm">(Backslash-separated ( \ ))</span>
          </label>
          <input
            id="technologies"
            name="technologies"
            placeholder="Enter technologies used"
            className={inputClass}
          />
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            placeholder="Enter color"
            className={inputClass}
          />
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            placeholder="Enter year"
            className={inputClass}
          />
          <label htmlFor="link">Project Link</label>
          <input
            id="link"
            name="link"
            placeholder="Enter project link"
            className={inputClass}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="featured">Featured</label>
            <input id="featured" name="featured" type="checkbox" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

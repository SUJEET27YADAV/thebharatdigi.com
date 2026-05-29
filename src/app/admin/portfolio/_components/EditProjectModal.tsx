import Modal from "@/app/_components/ui/modal";
import { X } from "lucide-react";
import { SubmitEvent, useState } from "react";
import { toast } from "react-toastify";

interface EditProjectModalProps {
  project: Record<string, string | boolean | number>;
  onClose: () => void;
}

export default function EditProjectModal({
  project,
  onClose,
}: EditProjectModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        id: project.id,
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
      const response = await fetch("/api/updateProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.msg || "Project updated successfully!");
        onClose();
      } else {
        toast.error(res.msg || "Failed to update project, please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update project. Please try again.");
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
        <h2 className="text-xl font-bold">Edit Project</h2>
        {/* Add your form fields here */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="icon">Project Icon</label>
          <input
            id="icon"
            name="icon"
            placeholder="Enter icon name"
            defaultValue={project.icon as string}
            className={inputClass}
          />
          <label htmlFor="title">Project Title</label>
          <input
            id="title"
            name="title"
            placeholder="Enter project title"
            defaultValue={project.title as string}
            className={inputClass}
          />
          <label htmlFor="subtitle">Project Subtitle</label>
          <input
            id="subtitle"
            name="subtitle"
            placeholder="Enter project subtitle"
            defaultValue={project.subtitle as string}
            className={inputClass}
          />
          <label htmlFor="category">Project Category</label>
          <input
            id="category"
            name="category"
            placeholder="Enter project category"
            defaultValue={project.category as string}
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
            defaultValue={(project.technologies as string)
              .split(", ")
              .join("\\")}
            className={inputClass}
          />
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            placeholder="Enter color"
            defaultValue={project.color as string}
            className={inputClass}
          />
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            placeholder="Enter year"
            defaultValue={project.year as string}
            className={inputClass}
          />
          <label htmlFor="link">Project Link</label>
          <input
            id="link"
            name="link"
            placeholder="Enter project link"
            defaultValue={project.link as string}
            className={inputClass}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="featured">Featured</label>
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={project.featured === "Yes"}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Updating Project..." : "Update Project"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

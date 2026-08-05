import AdminModal, { adminInputClass } from "@/components/admin/AdminModal";
import { submitAdminForm } from "@/components/admin/submitAdminForm";

interface AddProjectModalProps {
  onClose: () => void;
}

async function handleSubmit(formData: FormData): Promise<boolean> {
  return submitAdminForm(
    "/api/addProject",
    "POST",
    {
      icon: String(formData.get("icon") ?? ""),
      title: String(formData.get("title") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      category: String(formData.get("category") ?? ""),
      color: String(formData.get("color") ?? ""),
      technologies: String(formData.get("technologies") ?? "")
        .split("\\")
        .map((f) => f.trim()),
      year: String(formData.get("year") ?? ""),
      link: String(formData.get("link") ?? ""),
      featured: formData.get("featured") === "on",
    },
    {
      success: "Project added successfully!",
      error: "Failed to add project, please try again.",
    },
  );
}

export default function AddProjectModal({ onClose }: AddProjectModalProps) {
  return (
    <AdminModal
      title="Add Project"
      onClose={onClose}
      submit={handleSubmit}
      submitLabel="Add Project"
      submittingLabel="Adding Project..."
    >
      <label htmlFor="icon">Project Icon</label>
      <input
        id="icon"
        name="icon"
        placeholder="Enter icon name"
        className={adminInputClass}
      />
      <label htmlFor="title">Project Title</label>
      <input
        id="title"
        name="title"
        placeholder="Enter project title"
        className={adminInputClass}
      />
      <label htmlFor="subtitle">Project Subtitle</label>
      <input
        id="subtitle"
        name="subtitle"
        placeholder="Enter project subtitle"
        className={adminInputClass}
      />
      <label htmlFor="category">Project Category</label>
      <input
        id="category"
        name="category"
        placeholder="Enter project category"
        className={adminInputClass}
      />
      <label htmlFor="technologies">
        Technologies Used{" "}
        <span className="text-sm">(Backslash-separated ( \ ))</span>
      </label>
      <input
        id="technologies"
        name="technologies"
        placeholder="Enter technologies used"
        className={adminInputClass}
      />
      <label htmlFor="color">Color</label>
      <input
        id="color"
        name="color"
        placeholder="Enter color"
        className={adminInputClass}
      />
      <label htmlFor="year">Year</label>
      <input
        id="year"
        name="year"
        placeholder="Enter year"
        className={adminInputClass}
      />
      <label htmlFor="link">Project Link</label>
      <input
        id="link"
        name="link"
        placeholder="Enter project link"
        className={adminInputClass}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="featured">Featured</label>
        <input id="featured" name="featured" type="checkbox" />
      </div>
    </AdminModal>
  );
}

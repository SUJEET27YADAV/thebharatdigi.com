import AdminModal, { adminInputClassDark } from "@/components/admin/AdminModal";
import { submitAdminForm } from "@/components/admin/submitAdminForm";
import { Project } from "@/types/types";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function EditProjectModal({
  project,
  onClose,
}: EditProjectModalProps) {
  const handleSubmit = async (formData: FormData) => {
    return submitAdminForm(
      "/api/updateProject",
      "POST",
      {
        id: project.id,
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
        success: "Project updated successfully!",
        error: "Failed to update project, please try again.",
      },
    );
  };

  return (
    <AdminModal
      title="Edit Project"
      onClose={onClose}
      submit={handleSubmit}
      submitLabel="Update Project"
      submittingLabel="Updating Project..."
      className="relative w-full max-w-md p-6 text-slate-900 dark:text-white flex flex-col items-center gap-4 bg-white/90 dark:bg-black/90 rounded"
    >
      <label htmlFor="icon">Project Icon</label>
      <input
        id="icon"
        name="icon"
        placeholder="Enter icon name"
        defaultValue={project.icon}
        className={adminInputClassDark}
      />
      <label htmlFor="title">Project Title</label>
      <input
        id="title"
        name="title"
        placeholder="Enter project title"
        defaultValue={project.title}
        className={adminInputClassDark}
      />
      <label htmlFor="subtitle">Project Subtitle</label>
      <input
        id="subtitle"
        name="subtitle"
        placeholder="Enter project subtitle"
        defaultValue={project.subtitle}
        className={adminInputClassDark}
      />
      <label htmlFor="category">Project Category</label>
      <input
        id="category"
        name="category"
        placeholder="Enter project category"
        defaultValue={project.category}
        className={adminInputClassDark}
      />
      <label htmlFor="technologies">
        Technologies Used{" "}
        <span className="text-sm">(Backslash-separated ( \ ))</span>
      </label>
      <input
        id="technologies"
        name="technologies"
        placeholder="Enter technologies used"
        defaultValue={project.technologies.join("\\")}
        className={adminInputClassDark}
      />
      <label htmlFor="color">Color</label>
      <input
        id="color"
        name="color"
        placeholder="Enter color"
        defaultValue={project.color}
        className={adminInputClassDark}
      />
      <label htmlFor="year">Year</label>
      <input
        id="year"
        name="year"
        placeholder="Enter year"
        defaultValue={project.year}
        className={adminInputClassDark}
      />
      <label htmlFor="link">Project Link</label>
      <input
        id="link"
        name="link"
        placeholder="Enter project link"
        defaultValue={project.link ?? ""}
        className={adminInputClassDark}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="featured">Featured</label>
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={project.featured}
        />
      </div>
    </AdminModal>
  );
}

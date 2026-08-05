"use client";

import { useMemo, useState } from "react";
import AdminTable, { type AdminRow } from "@/components/admin/AdminTable";
import { useAdminList } from "@/components/admin/useAdminList";
import { Loader2, Plus, Search } from "lucide-react";
import { Project } from "@/types/types";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";

const TABLE_COLUMNS = [
  { key: "icon", label: "Icon", width: "max-w-[200px]" },
  { key: "title", label: "Title", width: "max-w-[200px]" },
  { key: "subtitle", label: "SubTitle", width: "max-w-[200px]" },
  { key: "category", label: "Category", width: "max-w-[200px]" },
  { key: "color", label: "Color", width: "max-w-[600px]" },
  { key: "technologies", label: "Technologies", width: "max-w-[200px]" },
  { key: "year", label: "Year", width: "max-w-[200px]" },
  { key: "featured", label: "Featured", width: "max-w-[200px]" },
  { key: "link", label: "Link", width: "max-w-[200px]" },
];

export default function PortfolioManager({ projects }: { projects: Project[] }) {
  const [project, setProject] = useState<Project | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const { items, searchTerm, loading, setSearchTerm, fetchItems, removeItem } =
    useAdminList({
      initialItems: projects,
      listPath: "/api/getProjects",
      deletePath: "/api/deleteProject",
      deleteConfirm: (item) => `Are you sure you want to delete "${item.title}"?`,
      messages: {
        success: "Project deleted successfully!",
        deleteError: "Failed to delete project, please try again.",
        loadError: "Failed to fetch portfolio items",
      },
    });

  const filteredPortfolio = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [items, searchTerm]);

  const handleEdit = (row: AdminRow) => {
    const item = items.find((p) => p.id === row.id);
    if (item) setProject(item);
  };

  const onAddModalClose = () => {
    setShowAddModal(false);
    fetchItems();
  };

  const onEditModalClose = () => {
    setProject(null);
    fetchItems();
  };

  const tableData = filteredPortfolio.map((project) => ({
    ...project,
    technologies: project.technologies.join(", "),
    featured: project.featured ? "Yes" : "No",
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-160px)] text-[#314158] dark:text-white text-lg font-medium">
        <Loader2 size={40} className="animate-spin" />
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Portfolio</h1>
          <p className="text-sm text-[#314158] dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded font-medium bg-[#ac4bff] transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>

      <div className="px-4 py-3 rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
        <Search size={18} className="text-[#314158] dark:text-white" />
        <input
          type="text"
          aria-label="Search portfolio"
          placeholder="Search portfolio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <AdminTable
        columns={TABLE_COLUMNS}
        data={tableData}
        onEdit={handleEdit}
        onDelete={removeItem}
      />
      {/* New Project Modal */}
      {showAddModal && <AddProjectModal onClose={onAddModalClose} />}
      {/* Edit Project Modal */}
      {project && (
        <EditProjectModal project={project} onClose={onEditModalClose} />
      )}
    </div>
  );
}

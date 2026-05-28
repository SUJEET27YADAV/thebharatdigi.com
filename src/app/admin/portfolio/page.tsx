"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/_components/admin/AdminTable";
import { Loader2, Plus, Search } from "lucide-react";
import { Project } from "@/types/types";
import { toast } from "react-toastify";
import AddProjectModal from "./_components/AddProjectModal";
import EditProjectModal from "./_components/EditProjectModal";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [project, setProject] = useState<Record<
    string,
    string | boolean | number
  > | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filteredPortfolio, setFilteredPortfolio] = useState<Project[]>([]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/getProjects");
      const res = await response.json();
      if (res.success) {
        setPortfolio(res.data);
        setFilteredPortfolio(res.data);
      } else {
        setPortfolio([]);
        toast.error(res.msg || "Failed to fetch portfolio items");
      }
    } catch (err) {
      console.error("Failed to fetch portfolio items:", err);
      toast.error("Failed to fetch portfolio items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const filtered = portfolio.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPortfolio(filtered);
  }, [searchTerm, portfolio]);

  const handleEdit = (project: Record<string, string | boolean | number>) => {
    setProject(project);
    setShowEditModal(true);
  };

  const handleDelete = async (
    project: Record<string, string | boolean | number>,
  ) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        const response = await fetch("/api/deleteProject", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: project.id }),
        });
        const res = await response.json();
        if (res.success) {
          toast.success(res.msg || "Project deleted successfully!");
          fetchPortfolio();
        } else {
          toast.error(res.msg || "Failed to delete project, please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  const onAddModalClose = () => {
    setShowAddModal(false);
    fetchPortfolio();
  };

  const onEditModalClose = () => {
    setShowEditModal(false);
    fetchPortfolio();
  };

  const tableColumns = [
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

  const tableData = filteredPortfolio.map((project) => ({
    ...project,
    technologies: project.technologies.join(", "),
    featured: project.featured ? "Yes" : "No",
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-160px)] text-[#314158] dark:text-white text-lg font-medium">
        <Loader2 size={40} className="animate-spin" />
        <span>Loading...</span>
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
          placeholder="Search portfolio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <AdminTable
        columns={tableColumns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* New Project Modal */}
      {showAddModal && <AddProjectModal onClose={onAddModalClose} />}
      {/* Edit Project Modal */}
      {showEditModal && (
        <EditProjectModal project={project!} onClose={onEditModalClose} />
      )}
    </div>
  );
}

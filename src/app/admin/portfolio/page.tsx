"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import AdminTable from "@/app/_components/admin/AdminTable";
import { Loader2, Plus, Search } from "lucide-react";
import { Project } from "@/types/types";
import { toast } from "react-toastify";
import AddProjectModal from "./_components/AddProjectModal";
import EditProjectModal from "./_components/EditProjectModal";

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

type State = {
  portfolio: Project[];
  searchTerm: string;
  loading: boolean;
};

type Action =
  | { type: "SET_DATA"; payload: Project[] }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, portfolio: action.payload, loading: false };
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export default function PortfolioPage() {
  const [state, dispatch] = useReducer(reducer, {
    portfolio: [],
    searchTerm: "",
    loading: true,
  });
  const [project, setProject] = useState<Record<
    string,
    string | boolean | number
  > | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredPortfolio = useMemo(() => {
    return state.portfolio.filter((item) =>
      item.title.toLowerCase().includes(state.searchTerm.toLowerCase()),
    );
  }, [state.portfolio, state.searchTerm]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch("/api/getProjects");
      const res = await response.json();
      if (res.success) {
        dispatch({ type: "SET_DATA", payload: res.data });
      } else {
        dispatch({ type: "SET_DATA", payload: [] });
        toast.error(res.msg || "Failed to fetch portfolio items");
      }
    } catch (err) {
      console.error("Failed to fetch portfolio items:", err);
      toast.error("Failed to fetch portfolio items");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

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

  const tableData = filteredPortfolio.map((project) => ({
    ...project,
    technologies: project.technologies.join(", "),
    featured: project.featured ? "Yes" : "No",
  }));

  if (state.loading) {
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
          value={state.searchTerm}
          onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <AdminTable
        columns={TABLE_COLUMNS}
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

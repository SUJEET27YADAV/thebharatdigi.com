"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/app/_components/admin/AdminTable";
import { Loader2, Plus, Search } from "lucide-react";
import { Service } from "@/types/types";
import AddServiceModal from "./_components/AddServiceModal";
import { toast } from "react-toastify";
import EditServiceModal from "./_components/EditServiceModal";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [service, setService] = useState<Record<
    string,
    string | number | boolean
  > | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/getServices");
      const res = await response.json();
      if (res.success) {
        setServices(res.data);
        setFilteredServices(res.data);
      } else {
        setServices([]);
        toast.error(res.msg || "Failed to fetch services");
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleEdit = (service: Record<string, string | number | boolean>) => {
    setService(service);
    setShowEditModal(true);
  };

  const handleDelete = async (
    service: Record<string, string | number | boolean>,
  ) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        const response = await fetch("/api/deleteService", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: service.id }),
        });
        const res = await response.json();
        if (res.success) {
          toast.success(res.msg || "Service deleted successfully!");
          fetchServices();
        } else {
          toast.error(res.msg || "Failed to delete service, please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete service. Please try again.");
      }
    }
  };

  const onAddModalClose = () => {
    setShowAddModal(false);
    fetchServices();
  };

  const onEditModalClose = () => {
    setShowEditModal(false);
    fetchServices();
  };

  const tableColumns = [
    { key: "icon", label: "Icon", width: "max-w-[100px]" },
    { key: "title", label: "Service Name", width: "max-w-[200px]" },
    { key: "shortdesc", label: "Short Description", width: "max-w-[200px]" },
    { key: "fulldesc", label: "Full Description", width: "max-w-[200px]" },
    { key: "features", label: "Features", width: "max-w-[200px]" },
    { key: "color", label: "Color", width: "max-w-[100px]" },
    { key: "popular", label: "Popular", width: "max-w-[200px]" },
  ];

  const tableData = filteredServices.map((service) => ({
    ...service,
    features: Array.isArray(service.features)
      ? service.features.join(", ")
      : service.features,
    popular: service.popular ? "Yes" : "No",
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
          <h1 className="text-3xl font-bold mb-1">Services</h1>
          <p className="text-sm text-[#314158]">Manage your services</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded font-medium bg-[#ac4bff] transition-opacity hover:opacity-90"
        >
          <Plus size={18} />
          <span>New Service</span>
        </button>
      </div>

      <div className="px-4 py-3 rounded flex items-center gap-2 border border-[#444444] text-[#314158] dark:bg-[#0f172b] dark:text-white">
        <Search size={18} className="text-[#314158] dark:text-white" />
        <input
          type="text"
          placeholder="Search services..."
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
      {/* New Service Modal */}
      {showAddModal && <AddServiceModal onClose={onAddModalClose} />}
      {/* Edit Service Modal */}
      {showEditModal && (
        <EditServiceModal service={service!} onClose={onEditModalClose} />
      )}
    </div>
  );
}

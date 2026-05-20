'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/app/_components/admin/AdminTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    // Mock data
    const mockServices: Service[] = [
      {
        id: 1,
        title: 'Web Design',
        description: 'Modern and responsive website design',
        icon: '🎨',
      },
      {
        id: 2,
        title: 'Web Development',
        description: 'Full-stack web development services',
        icon: '💻',
      },
      {
        id: 3,
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile apps',
        icon: '📱',
      },
    ];
    setServices(mockServices);
    setFilteredServices(mockServices);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleEdit = (service: Service) => {
    window.location.href = `/admin/services/${service.id}`;
  };

  const handleDelete = (service: Service) => {
    if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
      setServices(services.filter((s) => s.id !== service.id));
    }
  };

  const tableColumns = [
    { key: 'title', label: 'Service Name' },
    { key: 'description', label: 'Description' },
  ];

  const tableData = filteredServices;

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ color: '#314158' }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Services
          </h1>
          <p
            className="text-sm"
            style={{
              color: '#314158',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            Manage your services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 px-4 py-2 rounded font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#ac4bff',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Plus size={18} />
          New Service
        </Link>
      </div>

      <div
        className="px-4 py-3 rounded flex items-center gap-2 border"
        style={{
          backgroundColor: '#0f172b',
          borderColor: '#444444',
        }}
      >
        <Search size={18} style={{ color: '#314158' }} />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{
            color: '#ffffff',
            fontFamily: 'Geist, sans-serif',
          }}
        />
      </div>

      <AdminTable
        columns={tableColumns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

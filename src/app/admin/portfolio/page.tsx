'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/app/_components/admin/AdminTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  link: string;
  tags?: string;
  image_url?: string;
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    // Mock data
    const mockPortfolio: PortfolioItem[] = [
      {
        id: 1,
        title: 'E-commerce Platform',
        link: 'https://example1.com',
        tags: 'Next.js, React, Node.js',
        image_url: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        title: 'SaaS Dashboard',
        link: 'https://example2.com',
        tags: 'React, TypeScript, Firebase',
        image_url: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        title: 'Mobile App',
        link: 'https://example3.com',
        tags: 'React Native, Node.js',
        image_url: 'https://via.placeholder.com/150',
      },
    ];
    setPortfolio(mockPortfolio);
    setFilteredPortfolio(mockPortfolio);
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = portfolio.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPortfolio(filtered);
  }, [searchTerm, portfolio]);

  const handleEdit = (item: PortfolioItem) => {
    window.location.href = `/admin/portfolio/${item.id}`;
  };

  const handleDelete = (item: PortfolioItem) => {
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setPortfolio(portfolio.filter((p) => p.id !== item.id));
    }
  };

  const tableColumns = [
    { key: 'title', label: 'Project Title' },
    { key: 'link', label: 'Link' },
    { key: 'tags', label: 'Tags' },
  ];

  const tableData = filteredPortfolio;

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
            Portfolio
          </h1>
          <p
            className="text-sm"
            style={{
              color: '#314158',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-4 py-2 rounded font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#ac4bff',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Plus size={18} />
          New Project
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
          placeholder="Search portfolio..."
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

'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/app/_components/admin/AdminTable';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  tag: string;
  image_url: string;
  description: string;
  features: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getProducts');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data || []);
          setFilteredProducts(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleEdit = (product: Product) => {
    // Navigate to edit page
    window.location.href = `/admin/products/${product.id}`;
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      // Call delete API
      console.log('Delete product:', product.id);
    }
  };

  const tableColumns = [
    { key: 'name', label: 'Product Name' },
    { key: 'tag', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'features', label: 'Features' },
  ];

  const tableData = filteredProducts.map((product) => ({
    ...product,
    features: product.features.substring(0, 50) + '...',
  }));

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
            Products
          </h1>
          <p
            className="text-sm"
            style={{
              color: '#314158',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            Manage your digital products
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 rounded font-medium transition-opacity hover:opacity-90"
          style={{
            backgroundColor: '#ac4bff',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Plus size={18} />
          New Product
        </Link>
      </div>

      {/* Search */}
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
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{
            color: '#ffffff',
            fontFamily: 'Geist, sans-serif',
          }}
        />
      </div>

      {/* Table */}
      <AdminTable
        columns={tableColumns}
        data={tableData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

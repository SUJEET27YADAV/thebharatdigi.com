'use client';

import { useEffect, useState } from 'react';
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from 'lucide-react';
import StatsCard from '@/app/_components/admin/StatsCard';
import AdminTable from '@/app/_components/admin/AdminTable';
import Link from 'next/link';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: string;
  paid: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: '0',
    totalSales: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This would connect to your analytics API
        // For now, we'll mock the data
        setStats({
          totalOrders: 24,
          totalCustomers: 18,
          totalRevenue: '₹45,600',
          totalSales: 32,
        });

        setRecentOrders([
          {
            id: '1',
            customer_name: 'John Doe',
            customer_email: 'john@example.com',
            amount: '₹4,999',
            paid: true,
            created_at: '2025-05-20',
          },
          {
            id: '2',
            customer_name: 'Jane Smith',
            customer_email: 'jane@example.com',
            amount: '₹2,499',
            paid: false,
            created_at: '2025-05-19',
          },
          {
            id: '3',
            customer_name: 'Bob Wilson',
            customer_email: 'bob@example.com',
            amount: '₹7,999',
            paid: true,
            created_at: '2025-05-18',
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tableColumns = [
    { key: 'customer_name', label: 'Customer' },
    { key: 'customer_email', label: 'Email' },
    { key: 'amount', label: 'Amount' },
    {
      key: 'paid',
      label: 'Status',
      width: '120px',
    },
    { key: 'created_at', label: 'Date' },
  ];

  const tableData = recentOrders.map((order) => ({
    ...order,
    paid: (
      <span
        className="px-3 py-1 rounded text-xs font-medium"
        style={{
          backgroundColor: order.paid ? '#00c75820' : '#f99c0020',
          color: order.paid ? '#00c758' : '#f99c00',
        }}
      >
        {order.paid ? 'Completed' : 'Pending'}
      </span>
    ),
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
    <div className="space-y-8">
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Dashboard
        </h1>
        <p
          className="text-sm"
          style={{
            color: '#314158',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          Welcome back, Admin. Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={<DollarSign size={24} />}
          color="success"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingCart size={24} />}
          color="default"
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={<Users size={24} />}
          color="warning"
          trend={{ value: 5, direction: 'up' }}
        />
        <StatsCard
          title="Total Sales"
          value={stats.totalSales}
          icon={<TrendingUp size={24} />}
          color="default"
          trend={{ value: 15, direction: 'up' }}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className="text-xl font-bold"
              style={{
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Recent Orders
            </h2>
            <p
              className="text-xs mt-1"
              style={{
                color: '#314158',
                fontFamily: 'Geist, sans-serif',
              }}
            >
              Your latest transactions
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: '#ac4bff',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            View All
          </Link>
        </div>

        <AdminTable
          columns={tableColumns}
          data={tableData}
          actions={false}
        />
      </div>
    </div>
  );
}

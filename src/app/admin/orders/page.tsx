'use client';

import { useEffect, useState } from 'react';
import AdminTable from '@/app/_components/admin/AdminTable';
import { Search, Filter } from 'lucide-react';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount: string;
  product_ids: number[];
  paid: boolean;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mock data - replace with actual API call
        const mockOrders: Order[] = [
          {
            id: '1',
            customer_name: 'John Doe',
            customer_email: 'john@example.com',
            customer_phone: '9876543210',
            amount: '₹4,999',
            product_ids: [1],
            paid: true,
            created_at: '2025-05-20',
          },
          {
            id: '2',
            customer_name: 'Jane Smith',
            customer_email: 'jane@example.com',
            customer_phone: '9876543211',
            amount: '₹2,499',
            product_ids: [2],
            paid: false,
            created_at: '2025-05-19',
          },
          {
            id: '3',
            customer_name: 'Bob Wilson',
            customer_email: 'bob@example.com',
            customer_phone: '9876543212',
            amount: '₹7,999',
            product_ids: [1, 2],
            paid: true,
            created_at: '2025-05-18',
          },
          {
            id: '4',
            customer_name: 'Alice Brown',
            customer_email: 'alice@example.com',
            customer_phone: '9876543213',
            amount: '₹3,999',
            product_ids: [3],
            paid: false,
            created_at: '2025-05-17',
          },
        ];
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders.filter((order) =>
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter === 'completed') {
      filtered = filtered.filter((o) => o.paid);
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter((o) => !o.paid);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const handleView = (order: Order) => {
    console.log('View order:', order.id);
    // Navigate to order details
  };

  const tableColumns = [
    { key: 'customer_name', label: 'Customer' },
    { key: 'customer_email', label: 'Email' },
    { key: 'customer_phone', label: 'Phone' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Date' },
  ];

  const tableData = filteredOrders.map((order) => ({
    ...order,
    status: (
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
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold mb-1"
          style={{
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Orders
        </h1>
        <p
          className="text-sm"
          style={{
            color: '#314158',
            fontFamily: 'Geist, sans-serif',
          }}
        >
          View and manage customer orders
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className="flex-1 px-4 py-3 rounded flex items-center gap-2 border"
          style={{
            backgroundColor: '#0f172b',
            borderColor: '#444444',
          }}
        >
          <Search size={18} style={{ color: '#314158' }} />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              color: '#ffffff',
              fontFamily: 'Geist, sans-serif',
            }}
          />
        </div>

        <div
          className="px-4 py-3 rounded flex items-center gap-2 border"
          style={{
            backgroundColor: '#0f172b',
            borderColor: '#444444',
            minWidth: '150px',
          }}
        >
          <Filter size={18} style={{ color: '#314158' }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-transparent outline-none text-sm flex-1"
            style={{
              color: '#ffffff',
              fontFamily: 'Geist, sans-serif',
            }}
          >
            <option value="all" style={{ backgroundColor: '#0f172b', color: '#ffffff' }}>All Orders</option>
            <option value="completed" style={{ backgroundColor: '#0f172b', color: '#ffffff' }}>Completed</option>
            <option value="pending" style={{ backgroundColor: '#0f172b', color: '#ffffff' }}>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <AdminTable
        columns={tableColumns}
        data={tableData}
        onEdit={handleView}
        actions={false}
      />
    </div>
  );
}

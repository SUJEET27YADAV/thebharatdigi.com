'use client';

import AdminSidebar from '@/app/_components/admin/AdminSidebar';
import AdminHeader from '@/app/_components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: '#1d293d', minHeight: '100vh' }}>
      <AdminSidebar />
      <AdminHeader />
      <main className="md:ml-64 pt-4">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

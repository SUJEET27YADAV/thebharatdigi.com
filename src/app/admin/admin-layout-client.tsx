"use client";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import AdminSidebar from "@/app/_components/admin/AdminSidebar";
import AdminHeader from "@/app/_components/admin/AdminHeader";
import { useState } from "react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <div className="min-h-screen pt-20">
        <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="md:ml-64 pt-4">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </AdminAuthProvider>
  );
}

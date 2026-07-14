"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Briefcase,
  Image,
  Settings,
  X,
  LogOut,
  Loader2,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useAdmin } from "@/contexts/AdminAuthContext";
import { toast } from "react-toastify";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout, loading, error } = useAdmin();

  const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", icon: <BarChart3 size={18} /> },
    { label: "Products", href: "/admin/products", icon: <Package size={18} /> },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      label: "Services",
      href: "/admin/services",
      icon: <Briefcase size={18} />,
    },
    {
      label: "Portfolio",
      href: "/admin/portfolio",
      icon: <Image size={18} />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings size={18} />,
    },
    { label: "Logout", onClick: () => logout(), icon: <LogOut size={18} /> },
  ];

  if (loading) {
    return (
      <div className="fixed left-0 top-20 h-screen w-64 z-30 flex items-center justify-center bg-white dark:bg-[#0f172b] border-r border-[#444444]">
        <Loader2 size={24} className="animate-spin text-[#ac4bff]" />
        {error && toast.error("Failed to load user data. Please try again.")}
      </div>
    );
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-20 h-screen w-64 z-30 transition-transform duration-300 md:translate-x-0 bg-white dark:bg-[#0f172b] border-t border-r border-[#444444] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 mb-2 flex items-center justify-between border-b border-[#444444]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="size-10 rounded flex items-center justify-center font-bold text-lg bg-[#ac4bff] text-white uppercase">
              {user?.name ? (
                <>
                  <span>{user.name.split(" ")[0].charAt(0)}</span>
                  <span>
                    {user.name.split(" ")[1] &&
                      user.name.split(" ")[1].charAt(0)}
                  </span>
                </>
              ) : (
                <span>TB</span>
              )}
            </div>
            <span className="font-bold text-lg">{user?.name || "Admin"}</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded dark:bg-[#0f172b] border border-[#444444] text-[#0f172b] dark:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            if (item.label === "Logout") {
              if (user) {
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm ${pathname === item.href ? "bg-slate-300 dark:bg-[#1d293d] text-[#ac4bff] border-l-3 border-[#ac4bff]" : "hover:bg-gray-100 dark:hover:bg-[#1d293d] text-[#314158]"} `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              } else {
                return null;
              }
            } else {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm ${pathname === item.href ? "bg-slate-300 dark:bg-[#1d293d] text-[#ac4bff] border-l-3 border-[#ac4bff]" : "hover:bg-gray-100 dark:hover:bg-[#1d293d] text-[#314158]"} `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            }
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 md:hidden bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

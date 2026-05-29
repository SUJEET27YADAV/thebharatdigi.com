"use client";
import { usePathname } from "next/navigation";
import { LogOut, Menu, User } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAdmin } from "@/contexts/AdminAuthContext";

interface AdminHeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AdminHeader({ isOpen, setIsOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAdmin();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-20 ml-0 md:ml-64 z-40 border-t border-b border-[#444444] bg-white dark:bg-[#0f172b]">
      <div className="w-full h-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className={`${isOpen && "hidden"} md:hidden p-2 rounded border border-[#444444] text-[#444444] dark:text-white`}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        {pathname !== "/admin/login" && (
          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded transition-colors border border-[#444444] hover:bg-[#444444]/20 outline-none"
            >
              <User size={18} />
              <span className="hidden sm:inline text-sm truncate max-w-[120px]">
                {user?.name || user?.email || "Admin"}
              </span>
            </button>

            {showMenu && (
              <button
                className="absolute top-10 right-0 mt-1 w-full rounded py-2 z-30 border border-[#444444] bg-white dark:bg-[#1d293d] hover:bg-red-500 flex items-center gap-2 p-4 hover:bg-opacity-80 transition-colors text-sm"
                onClick={() => {
                  setShowMenu(false);
                  logout();
                }}
              >
                <LogOut size={16} />
                <span className="max-md:hidden">Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

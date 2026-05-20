'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header
      className="sticky top-0 z-20 ml-0 md:ml-64 border-b"
      style={{
        backgroundColor: '#0f172b',
        borderBottomColor: '#444444',
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <h1
          className="text-lg font-bold md:block hidden"
          style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}
        >
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
              style={{
                backgroundColor: '#1d293d',
                border: '1px solid #444444',
                color: '#ffffff',
                fontFamily: 'Geist, sans-serif',
              }}
            >
              <User size={18} />
              <span className="hidden sm:inline text-sm">Admin</span>
            </button>

            {showMenu && (
              <div
                className="absolute right-0 mt-2 w-48 rounded shadow-lg py-2 z-30"
                style={{
                  backgroundColor: '#0f172b',
                  border: '1px solid #444444',
                }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-opacity-80 transition-colors text-sm"
                  style={{
                    color: '#fb2c36',
                    fontFamily: 'Geist, sans-serif',
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

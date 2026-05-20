'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Briefcase,
  Image,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <BarChart3 size={18} /> },
  { label: 'Products', href: '/admin/products', icon: <Package size={18} /> },
  { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart size={18} /> },
  { label: 'Services', href: '/admin/services', icon: <Briefcase size={18} /> },
  {
    label: 'Portfolio',
    href: '/admin/portfolio',
    icon: <Image size={18} />,
  },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded"
        style={{
          backgroundColor: '#0f172b',
          border: '1px solid #444444',
          color: '#ffffff',
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 z-30 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: '#0f172b',
          borderRight: '1px solid #444444',
        }}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center font-bold text-lg"
              style={{
                backgroundColor: '#ac4bff',
                color: '#ffffff',
              }}
            >
              TB
            </div>
            <span
              className="font-bold text-lg"
              style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif' }}
            >
              Admin
            </span>
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm"
              style={{
                backgroundColor: isActive(item.href) ? '#1d293d' : 'transparent',
                color: isActive(item.href) ? '#ac4bff' : '#314158',
                borderLeft: isActive(item.href)
                  ? '3px solid #ac4bff'
                  : '3px solid transparent',
                fontFamily: 'Geist, sans-serif',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

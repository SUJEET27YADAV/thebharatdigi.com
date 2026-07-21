"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  Code,
  Building,
  Map,
  Book,
  Store,
} from "lucide-react";
import Logo from "./ui/logo";
import ThemeToggle from "./ThemeToggle";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { NAV_GROUPS, TOP_LINKS } from "@/lib/routes";

const GROUP_ICONS: Record<string, React.ElementType> = {
  Services: Code,
  Industries: Building,
  Locations: Map,
  Resources: Book,
};

const DROPDOWN_LABELS = new Set(NAV_GROUPS.map((g) => g.label));

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCartStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const flatLinks = TOP_LINKS.filter((l) => !DROPDOWN_LABELS.has(l.label));
  const links = flatLinks
    .toSpliced(2, 0, ...NAV_GROUPS)
    .filter((l) => l.label !== "Locations")
    .filter((l) => l.label !== "Shop");
  const navLinks = links.toSpliced(
    links.length,
    0,
    ...NAV_GROUPS.filter((l) => l.label === "Locations"),
  );
  const handleOpen = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(label);
  };

  const handleClose = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!drawerRef.current || !menuBtnRef.current) return;
      const target = e.target as HTMLElement;
      if (
        drawerRef.current.contains(target) ||
        menuBtnRef.current.contains(target)
      )
        return;
      if (target.closest("#list")) {
        setDrawerOpen(false);
        return;
      }
      setDrawerOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-50 py-2 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-800/80 border-gray-300/50 dark:border-[#444444]/50 backdrop-blur-xl shadow-sm dark:shadow-indigo-500/5"
          : "bg-white/50 dark:bg-slate-800/50 border-transparent backdrop-blur-sm"
      }`}
    >
      {/* Gradient accent line at top */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[1px] gradient-line" aria-hidden />
      )}

      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="h-16 flex items-center gap-2 text-xl md:text-2xl font-bold text-slate-900 dark:text-white"
        >
          <Logo className="h-full py-1" />
          <span className="hidden md:inline gradient-text">
            The Bharat Digital
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const isActive = pathname === l.path;
            const isOpen = openDropdown === l.label;
            if (l.children) {
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => handleOpen(l.label)}
                  onMouseLeave={handleClose}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (isOpen && l.path) router.push(l.path);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium rounded transition-all duration-200 ${
                      isOpen
                        ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#ac4bff] hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {l.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      onMouseEnter={() => handleOpen(l.label)}
                      onMouseLeave={handleClose}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded border border-gray-300/80 dark:border-[#444444]/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl py-2 z-50 shadow-lg dark:shadow-indigo-500/5 ${
                        l.children.length > 6
                          ? "w-120 grid grid-cols-2"
                          : "w-56"
                      }`}
                    >
                      {l.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                            pathname === child.path
                              ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          <div className="font-medium">{child.label}</div>
                          {child.description && (
                            <div className="text-xs text-slate-400 dark:text-[#314158] mt-0.5">
                              {child.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={l.path}
                href={l.path!}
                className={`px-2.5 py-1.5 text-sm font-medium text-center rounded transition-all duration-200 ${
                  isActive
                    ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#ac4bff] hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Storefront to buy digital products."
            className="p-2 flex items-center justify-center rounded border border-gray-300 dark:border-[#444444] bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-200"
            onClick={() => router.push("/shop")}
          >
            <Store className="size-5" />
          </button>
          <button
            type="button"
            aria-label={`Shopping cart, ${cart.length} items`}
            className="relative p-2 flex items-center justify-center rounded border border-gray-300 dark:border-[#444444] bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-200"
            onClick={() => {
              if (cart.length === 0) {
                toast.info(
                  "Your cart is empty. Browse the shop to add products.",
                );
              } else {
                router.push("/cart");
              }
            }}
          >
            <ShoppingCart className="size-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 flex items-center justify-center bg-[#fb2c36] rounded-full text-[10px] font-medium text-white animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            ref={menuBtnRef}
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden p-2 flex items-center justify-center rounded border border-gray-300 dark:border-[#444444] bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200"
          >
            {drawerOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={drawerRef}
        className={`md:hidden fixed inset-x-0 top-[4.5rem] bottom-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-t border-gray-300/50 dark:border-[#444444]/50 p-4 z-30 overflow-y-auto transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul id="list" className="flex flex-col gap-1">
          {navLinks.map((l) => {
            const isActive = pathname === l.path;
            const isOpen = openMobileGroup === l.label;
            const Icon = GROUP_ICONS[l.label];
            if (l.children) {
              return (
                <li key={l.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isOpen && l.path) router.push(l.path);
                      else setOpenMobileGroup(isOpen ? null : l.label);
                    }}
                    className="w-full p-3 flex items-center justify-between font-medium text-slate-600 dark:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-150"
                  >
                    <span className="flex items-center gap-2">
                      {Icon && <Icon className="size-4" />}
                      {l.label}
                    </span>
                    <ChevronDown
                      className={`size-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="ml-4 border-l-2 border-indigo-200 dark:border-[#ac4bff]/30 pl-3 space-y-1 mt-1 mb-2">
                      {l.children.map((child) => {
                        const isActive = pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={`block p-2.5 text-sm rounded transition-colors duration-150 ${
                              isActive
                                ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10"
                                : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#ac4bff]"
                            }`}
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-slate-400 mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li key={l.path}>
                <Link
                  href={l.path!}
                  className={`w-full p-3 flex items-center justify-between font-medium rounded transition-colors duration-150 ${
                    isActive
                      ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#ac4bff] hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span>{l.label}</span>
                  <ChevronRight className="size-4 text-slate-400" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

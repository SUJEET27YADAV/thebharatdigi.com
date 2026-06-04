"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Home from "@mui/icons-material/Home";
import About from "@mui/icons-material/Description";
import Contact from "@mui/icons-material/ContactPage";
import Shop from "@mui/icons-material/Shop2";
import Services from "@mui/icons-material/DesignServices";
import PorfolioIcon from "@mui/icons-material/Person3";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Logo from "./ui/logo";
import ThemeToggle from "./ThemeToggle";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LINKS: NavLink[] = [
  { icon: <Home fontSize="inherit" />, label: "home", path: "/" },
  { icon: <Services fontSize="inherit" />, label: "services", path: "/services" },
  { icon: <About fontSize="inherit" />, label: "about", path: "/aboutus" },
  { icon: <PorfolioIcon fontSize="inherit" />, label: "portfolio", path: "/portfolio" },
  { icon: <Contact fontSize="inherit" />, label: "contact", path: "/contactus" },
  { icon: <AnalyticsIcon fontSize="inherit" />, label: "SEO Audit Pro", path: "/seo-audit-pro" },
  { icon: <Shop fontSize="inherit" />, label: "Shop", path: "/shop" },
];

interface NavLink {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCartStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dref = useRef<HTMLDivElement>(null);
  const dbref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleDrawerClose = (event: MouseEvent) => {
      if (!dref.current || !dbref.current) return;

      const target = event.target as HTMLElement;
      const clickedInsideDrawer = dref.current.contains(target);
      const clickedMenuButton = dbref.current.contains(target);

      if (clickedMenuButton) return;

      if (target.closest("#list")) {
        setDrawerOpen(false);
        return;
      }

      if (!clickedInsideDrawer) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDrawerClose);
    return () => document.removeEventListener("mousedown", handleDrawerClose);
  }, [drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-50 py-2 border-b transition-colors duration-200 ${
        scrolled
          ? "bg-slate-50/90 dark:bg-slate-900/90 border-slate-200 dark:border-[#444444]"
          : "bg-slate-50/70 dark:bg-slate-900/70 border-transparent"
      }`}
    >
      <div className="relative max-w-7xl mx-auto h-16 px-4 md:px-5 flex items-center justify-between">
        <button
          type="button"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          ref={dbref}
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="max-md:flex md:hidden text-2xl items-center justify-center btn-ghost p-2"
        >
          {drawerOpen ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
        </button>

        <Link
          href="/"
          className="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 h-16 flex items-center justify-center gap-2 text-xl md:text-2xl font-bold gradient-text overflow-hidden"
        >
          <Logo className="h-full py-1" />
          <span className="max-md:hidden">The Bharat Digital</span>
        </Link>

        <div
          ref={dref}
          className={`max-md:fixed max-md:inset-x-0 max-md:top-[4.5rem] max-md:bottom-0 max-md:w-full max-md:bg-slate-50 dark:max-md:bg-slate-900 max-md:border-t max-md:border-slate-200 dark:max-md:border-[#444444] max-md:p-4 max-md:z-30 max-md:overflow-y-auto max-md:transition-transform max-md:duration-200 max-md:ease-out ${
            drawerOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
          }`}
        >
          <ul
            id="list"
            className="flex max-md:flex-col items-stretch md:items-center md:justify-center max-md:gap-1 md:gap-1 list-none"
          >
            {LINKS.map((l) => {
              const isActive = pathname === l.path;
              return (
                <li key={l.path} className="max-md:w-full">
                  <Link
                    href={l.path}
                    className={`w-full p-3 flex items-center font-medium justify-between md:px-3 md:py-1.5 max-xs:text-sm rounded transition-colors duration-150 ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10"
                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="w-full flex items-center gap-2 capitalize">
                      <span className="md:hidden text-indigo-600 dark:text-indigo-400">
                        {l.icon}
                      </span>
                      {l.label}
                    </span>
                    <span className="md:hidden text-slate-400">
                      <ChevronRightIcon fontSize="inherit" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label={`Shopping cart, ${cart.length} items`}
            className="relative p-2 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-slate-800 btn"
            onClick={() => {
              if (cart.length === 0) {
                toast.info("Your cart is empty. Browse the shop to add products.");
              } else {
                router.push("/cart");
              }
            }}
          >
            <ShoppingCart size={20} className="text-slate-600 dark:text-slate-300" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 flex items-center justify-center bg-red-500 rounded-full text-[10px] font-medium text-white">
                {cart.length}
              </span>
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

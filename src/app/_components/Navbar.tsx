"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
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

interface NavLink {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export default function Navbar() {
  const router = useRouter();
  const { cart } = useCartStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dref = useRef<HTMLDivElement>(null);
  const dbref = useRef<HTMLButtonElement>(null);

  const links: NavLink[] = [
    {
      icon: <Home fontSize="inherit" />,
      label: "home",
      path: "/",
    },
    {
      icon: <Services fontSize="inherit" />,
      label: "services",
      path: "/services",
    },
    {
      icon: <About fontSize="inherit" />,
      label: "about",
      path: "/aboutus",
    },
    {
      icon: <PorfolioIcon fontSize="inherit" />,
      label: "portfolio",
      path: "/portfolio",
    },
    {
      icon: <Contact fontSize="inherit" />,
      label: "contact",
      path: "/contactus",
    },
    {
      icon: <AnalyticsIcon fontSize="inherit" />,
      label: "SEO Audit Pro",
      path: "/seo-audit-pro",
    },
    {
      icon: <Shop fontSize="inherit" />,
      label: "Shop",
      path: "/shop",
    },
  ];

  useEffect(() => {
    if (drawerOpen) {
      const handleDrawerClose = (event: MouseEvent) => {
        if (dref.current && dbref.current) {
          const db = dbref.current;
          const d = dref.current;
          if (
            !db.contains(event.target as Node) &&
            (!d.contains(event.target as Node) ||
              (event.target as HTMLElement).closest("#list"))
          ) {
            if ((event.target as HTMLElement).closest("#list")) {
              setTimeout(() => {
                setDrawerOpen(false);
              }, 500);
            } else {
              setDrawerOpen(false);
            }
          }
        }
      };

      document.addEventListener("mousedown", handleDrawerClose);
      return () => {
        document.removeEventListener("mousedown", handleDrawerClose);
      };
    }
  }, [drawerOpen]);

  return (
    <nav className="fixed w-full z-50 transition-all duration-500 py-2 bg-gray-200 dark:bg-slate-900">
      <div className="relative max-w-7xl mx-auto h-16 px-4 md:px-5 flex items-center justify-between">
        <button
          type="button"
          title="Menu Button"
          ref={dbref}
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="max-md:flex md:hidden text-2xl items-center justify-center cursor-pointer"
        >
          <MenuIcon fontSize="inherit" />
        </button>
        <div className="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2 h-16 flex items-center justify-center gap-2 text-xl md:text-2xl font-bold gradient-text overflow-hidden">
          <Logo className="h-full py-1" />
          <h3 className="max-md:hidden">The Bharat Digital</h3>
        </div>
        <div
          ref={dref}
          className={`max-md:absolute max-md:left-0 max-md:top-18 max-xs:w-[60%] max-md:w-1/2 max-md:min-h-screen max-md:bg-gray-200/40 max-md:p-2 max-md:dark:dark:bg-slate-900/40 backdrop-blur-xl max-md:z-30 ${
            drawerOpen ? "max-md:block" : "max-md:hidden"
          }`}
        >
          <ul
            id="list"
            className="flex max-md:flex-col items-center md:justify-center max-md:gap-1 md:gap-8 list-none"
          >
            {links.map((l, i) => (
              <li key={i} className="max-md:w-full max-md:bg-white/30 rounded">
                <Link
                  href={l.path}
                  className="w-full p-3 flex items-center font-semibold justify-between md:p-0 md:py-1 max-xs:text-sm"
                >
                  <p className="w-full flex items-center gap-1 capitalize">
                    <span className="md:hidden">{l.icon}</span>
                    {l.label}
                  </p>
                  <span className="md:hidden">
                    <ChevronRightIcon fontSize="inherit" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-8">
          <button
            className="relative p-2 flex items-center justify-center rounded-full bg-indigo-200 dark:bg-slate-700"
            onClick={() => {
              if (cart.length === 0) {
                toast.error(
                  "Your cart is empty! Please add some products from the shop page.",
                );
              } else {
                router.push("/cart");
              }
            }}
          >
            <ShoppingCart size={20} className="text-gray-500 dark:text-white" />
            {cart.length > 0 && (
              <div className="absolute -top-1 left-1/2 -translate-x-[40%] w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-xs font-medium">
                {cart.length}
              </div>
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/location-data";

export default function LocationSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-24">
        <div className="flex items-center gap-2 px-4 py-3 mb-2">
          <MapPin className="size-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Locations
          </span>
        </div>
        <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 px-4 lg:px-0">
          {locations.map((loc) => {
            const href = `/locations/${loc.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={loc.slug}
                href={href}
                className={`whitespace-nowrap px-3 py-2 text-sm rounded transition-colors duration-150 ${
                  active
                    ? "text-indigo-600 dark:text-[#ac4bff] bg-indigo-50 dark:bg-[#ac4bff]/10 font-medium"
                    : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-[#ac4bff] hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                {loc.city}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

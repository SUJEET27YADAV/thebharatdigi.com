"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/location-data";

export default function Locationbar() {
  const pathname = usePathname();

  return (
    <div className="w-fit mx-auto p-3 border border-slate-400/40 rounded-md shadow-lg shadow-black/30 dark:shadow-white/10">
      <div className="flex items-center gap-2 px-3">
        <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
          <MapPin className="size-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <p className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Locations
        </p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 py-3">
        {locations.map((loc) => {
          const href = `/locations/${loc.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={loc.slug}
              href={href}
              className={`whitespace-nowrap p-2 text-sm rounded transition-colors duration-150 ${
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
  );
}

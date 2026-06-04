import { CheckCircle, Users, Globe, Heart } from "lucide-react";

const STATS = [
  { icon: CheckCircle, label: "500+ Projects Delivered" },
  { icon: Users, label: "200+ Happy Clients" },
  { icon: Globe, label: "15+ Countries Served" },
  { icon: Heart, label: "99% Client Satisfaction" },
];

const ICONS = [CheckCircle, Users, Globe, Heart];

export default function Marquee() {
  return (
    <section
      aria-label="Company highlights"
      className="py-4 bg-indigo-50 dark:bg-indigo-950/30 border-y border-indigo-100 dark:border-indigo-500/10 overflow-hidden"
    >
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {Array.from({ length: 3 }, (_, copy) => (
          <div
            key={copy}
            className="flex items-center gap-16 px-8"
            aria-hidden={copy > 0}
          >
            {STATS.map((stat, i) => {
              const Icon = ICONS[i];
              return (
                <span
                  key={`${copy}-${stat.label}`}
                  className="inline-flex items-center gap-2 text-base md:text-xl tracking-wide font-medium text-indigo-600 dark:text-indigo-400"
                >
                  <Icon className="size-4 md:size-5 shrink-0" aria-hidden />
                  {stat.label}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

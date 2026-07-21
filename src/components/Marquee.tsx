import { CheckCircle, Users, Globe, Heart, Zap } from "lucide-react";

const STATS = [
  { icon: CheckCircle, label: "500+ Projects Delivered" },
  { icon: Users, label: "200+ Happy Clients" },
  { icon: Globe, label: "15+ Countries Served" },
  { icon: Heart, label: "99% Client Satisfaction" },
  { icon: Zap, label: "24/7 Support Available" },
];

export default function Marquee() {
  return (
    <section
      aria-label="Company highlights"
      className="py-4 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-pink-50/80 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-pink-950/30 border-y border-indigo-100 dark:border-indigo-500/10 overflow-hidden"
    >
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {Array.from({ length: 3 }, (_, copy) => (
          <div
            key={copy}
            className="flex items-center gap-12 md:gap-16 px-8"
            aria-hidden={copy > 0}
          >
            {STATS.map((stat, _i) => {
              const Icon = stat.icon;
              return (
                <span
                  key={`${copy}-${stat.label}`}
                  className="inline-flex items-center gap-2.5 text-base md:text-xl tracking-wide font-medium"
                >
                  <span className="flex items-center justify-center size-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Icon className="size-3.5 md:size-4 text-white shrink-0" aria-hidden />
                  </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    {stat.label}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

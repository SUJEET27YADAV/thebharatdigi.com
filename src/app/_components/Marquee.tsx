export default function Marquee() {
  const stats = [
    "500+ Projects Delivered",
    "200+ Happy Clients",
    "15+ Countries Served",
    "99% Client Satisfaction",
  ];

  return (
    <section
      aria-label="Company highlights"
      className="py-4 bg-indigo-50 dark:bg-indigo-950/30 border-y border-indigo-100 dark:border-indigo-500/10 overflow-hidden"
    >
      <div className="flex whitespace-nowrap motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-12 items-center px-8" aria-hidden={copy === 1}>
            {stats.map((stat) => (
              <span
                key={`${copy}-${stat}`}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                {stat}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

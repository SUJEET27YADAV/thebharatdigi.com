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
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {Array.from({ length: 3 }, (_, copy) => (
          <div
            key={copy}
            className="flex gap-20 items-center px-8"
            aria-hidden={copy === 1 || copy === 2}
          >
            {stats.map((stat) => (
              <span
                key={`${copy}-${stat}`}
                className="text-base md:text-xl tracking-wide font-medium text-indigo-600 dark:text-indigo-400"
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

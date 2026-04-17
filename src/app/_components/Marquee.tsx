export default function Marquee() {
  const stats = [
    "500+ Projects Delivered",
    "•",
    "200+ Happy Clients",
    "•",
    "15+ Countries Served",
    "•",
    "99% Client Satisfaction",
  ];

  return (
    <section className="py-8 bg-indigo-600/10 border-y border-indigo-500/20 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex gap-20 items-center px-10">
          {stats.map((stat, i) => (
            <span
              key={i}
              className={`text-2xl font-bold ${
                stat === "•" ? "text-purple-400" : "text-indigo-400"
              }`}
            >
              {stat}
            </span>
          ))}
        </div>
        <div className="flex gap-20 items-center px-10">
          {stats.map((stat, i) => (
            <span
              key={`dup-${i}`}
              className={`text-2xl font-bold ${
                stat === "•" ? "text-purple-400" : "text-indigo-400"
              }`}
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ReactNode } from "react";

const COLOR_MAP = {
  default: "#ac4bff",
  success: "#00c758",
  warning: "#f99c00",
  danger: "#fb2c36",
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "default" | "success" | "warning" | "danger";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export default function StatsCard({
  title,
  value,
  icon,
  color = "default",
  trend,
}: StatsCardProps) {
  const accentColor = COLOR_MAP[color];

  return (
    <div
      className={`p-6 rounded flex items-start justify-between bg-slate-200/70 dark:bg-[#0f172b]/70 border border-[#444444] transition-colors`}
    >
      <div>
        <p className="text-xs font-medium mb-3 text-[#314158] dark:text-gray-400 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold text-[#314158] dark:text-white">
          {value}
        </p>
        {trend && (
          <p
            className={`text-xs mt-2 tracking-wide font-medium ${trend.direction === "up" ? "text-green-500" : "text-red-500"}`}
          >
            {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
      <div
        className="p-3 rounded"
        style={{
          backgroundColor: accentColor + "20",
          color: accentColor,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

import Link from "next/link";
import { LucideIcon } from "../../components/ui/lucideIcon";
import { Check, ArrowUpRight } from "lucide-react";

interface StaticService {
  id: string;
  icon: string;
  title: string;
  shortdesc: string;
  fulldesc: string;
  features: string[];
  color: string;
  popular: boolean;
}

export default function ServiceCard({ service }: { service: StaticService }) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="relative group card-interactive p-6 md:p-8 block"
    >
      {service.popular && (
        <div className="absolute -top-3 right-6 px-3 py-1 rounded text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          Popular
        </div>
      )}
      <div
        className={`size-14 rounded border flex items-center justify-center mb-6 ${service.color}`}
      >
        <LucideIcon name={service.icon} className={service.color} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
        {service.title}
      </h3>
      <p className="text-sm md:text-base mb-5 leading-relaxed text-slate-600 dark:text-gray-400">
        {service.shortdesc}
      </p>
      <div className="space-y-2 mb-6">
        {service.features.slice(0, 3).map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm opacity-60"
          >
            <Check className={`size-4 ${service.color}`} />
            <span className="text-slate-700 dark:text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
        Learn more <ArrowUpRight className="size-3.5" />
      </div>
    </Link>
  );
}

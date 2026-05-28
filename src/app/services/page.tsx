// components/Services.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ShoppingCart,
  Zap,
  Palette,
  Settings,
  Check,
  ArrowRight,
  Layers,
  Code,
  Server,
  Clock,
  Users,
  Award,
  Sparkles,
  Loader2,
} from "lucide-react";
import { LucideIcon } from "../_components/ui/lucideIcon";
import { toast } from "react-toastify";
import { Service } from "@/types/types";

const stats = [
  { icon: Code, value: "500+", label: "Projects Delivered" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: Clock, value: "99.9%", label: "Uptime Guaranteed" },
  { icon: Award, value: "10+", label: "Years Experience" },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "Analyze requirements",
    icon: Sparkles,
  },
  { step: "02", title: "Design", desc: "Create visual designs", icon: Palette },
  { step: "03", title: "Develop", desc: "Build with modern tech", icon: Code },
  { step: "04", title: "Deploy", desc: "Launch and support", icon: Server },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/getServices");
        const resp = await response.json();
        if (resp.success) {
          setServices(resp.data);
        } else {
          toast.error(resp.msg || "Failed to fetch services");
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        toast.error("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-white dark:bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-indigo-200/50 dark:bg-indigo-500/5" />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full blur-3xl bg-purple-200/50 dark:bg-purple-500/5" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6
                       bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          >
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Comprehensive Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Services That Drive{" "}
            <span className="gradient-text">Digital Success</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400"
          >
            From concept to deployment, we offer end-to-end digital solutions.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center border transition-all
                         bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50
                         hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-lg dark:hover:shadow-none"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
              <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="min-h-210 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-indigo-600 dark:text-indigo-400">
              <Loader2 size={64} className="animate-spin" />
              <span className="text-lg">Loading services..</span>
            </div>
          ) : (
            services.map((service, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative group rounded-2xl p-6 md:p-8 border cursor-pointer transition-all duration-300
                           bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                           hover:shadow-xl dark:hover:shadow-none hover:border-slate-300 dark:hover:border-slate-600/50"
                >
                  {service.popular && (
                    <div
                      className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-semibold
                                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    >
                      Popular
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform ${service.color}`}
                  >
                    <LucideIcon name={service.icon} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="text-sm md:text-base mb-5 leading-relaxed text-slate-600 dark:text-gray-400">
                    {hoveredIndex === index
                      ? service.fulldesc
                      : service.shortdesc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, fi) => (
                      <div
                        key={fi}
                        className={`flex items-center gap-2 text-sm transition-opacity ${
                          hoveredIndex === index ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 ${service.color.split(" ").find((c) => c.startsWith("text-"))}`}
                        />
                        <span className="text-slate-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our <span className="gradient-text">Process</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < process.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 left-[60%] w-full h-[2px]
                                  bg-gradient-to-r from-indigo-300 dark:from-indigo-500/50 to-transparent"
                  />
                )}

                <div
                  className="relative p-6 rounded-2xl border transition-all group
                                bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50
                                hover:bg-white dark:hover:bg-slate-800/50 hover:shadow-lg dark:hover:shadow-none"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl border flex items-center justify-center
                                    group-hover:scale-110 transition-transform
                                    bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30"
                    >
                      <item.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span
                      className="text-4xl font-bold text-slate-200 dark:text-slate-700
                                     group-hover:text-indigo-200 dark:group-hover:text-indigo-500/30 transition-colors"
                    >
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="relative px-6 py-16 md:py-20 text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h3>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let&apos;s discuss how we can help transform your digital
              presence.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                         bg-white text-indigo-600 font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

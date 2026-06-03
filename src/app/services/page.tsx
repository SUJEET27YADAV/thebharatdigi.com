// components/Services.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
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
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border mb-6
                       bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          >
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Comprehensive Solutions
            </span>
          </motion.div>
          <h1 className="sr-only">
            The Bharat Digital — "Premium Web Development Company that offers
            SEO Audit Tools, e-commerce solutions, IT support & much more for
            Businesses all over the world.
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Web &amp; IT Services That{" "}
            <span className="gradient-text">Drive Digital Success</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400"
          >
            From concept to deployment, we offer end-to-end solutions custom
            websites, web applications, e-commerce stores, performance
            optimization, UI/UX design, and IT consulting. Each service is
            delivered using modern frameworks and best practices.
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
              className="card p-6 text-center"
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
            <div className="col-span-full empty-state">
              <Loader2 size={32} className="animate-spin text-indigo-600 dark:text-indigo-400 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading services…</p>
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
                  className="relative group card-interactive p-6 md:p-8"
                >
                  {service.popular && (
                    <div
                      className="absolute -top-3 right-6 px-3 py-1 rounded text-xs font-semibold
                                  bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    >
                      Popular
                    </div>
                  )}

                  <div
                    className={`w-14 h-14 rounded border flex items-center justify-center mb-6 ${service.color}`}
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
            <h4 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Our <span className="gradient-text">Process</span>
            </h4>
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

                <div className="relative card-interactive p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded border flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30"
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
                  <h5 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    {item.title}
                  </h5>
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
          className="relative rounded overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="relative px-6 py-16 md:py-20 text-center">
            <h6 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h6>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let&apos;s discuss how we can help transform your digital
              presence.
            </p>
            <a href="/contactus" className="btn bg-white text-indigo-600 px-8 py-3.5 text-lg hover:bg-slate-100">
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

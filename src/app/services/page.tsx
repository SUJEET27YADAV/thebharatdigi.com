// components/Services.tsx
"use client";
import { useState } from "react";
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
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Custom Web Development",
    shortDesc: "Bespoke websites tailored to your brand identity.",
    fullDesc:
      "From simple landing pages to complex web applications with modern technologies.",
    features: [
      "Custom CMS",
      "API Development",
      "Database Design",
      "Cloud Deployment",
    ],
    color: "indigo",
    popular: true,
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    shortDesc: "Pixel-perfect designs for every device.",
    fullDesc:
      "Mobile-first approach ensuring stunning appearance on all devices.",
    features: [
      "Mobile-First",
      "Cross-Browser",
      "Retina Ready",
      "Touch Optimized",
    ],
    color: "purple",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    shortDesc: "Powerful online stores that convert.",
    fullDesc:
      "Complete e-commerce ecosystems with secure payments and inventory.",
    features: [
      "Payment Gateway",
      "Inventory System",
      "Order Management",
      "Analytics",
    ],
    color: "pink",
    popular: true,
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    shortDesc: "Lightning-fast websites that rank higher.",
    fullDesc:
      "Core Web Vitals optimization, lazy loading, CDN setup, and caching.",
    features: [
      "Core Web Vitals",
      "CDN Integration",
      "Image Optimization",
      "Code Splitting",
    ],
    color: "green",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    shortDesc: "User-centric designs that convert.",
    fullDesc:
      "Research-driven design with wireframing, prototyping, and testing.",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Usability Testing",
    ],
    color: "amber",
  },
  {
    icon: Settings,
    title: "Maintenance & Support",
    shortDesc: "24/7 support to keep you running.",
    fullDesc: "Regular updates, security patches, backups, and monitoring.",
    features: [
      "24/7 Monitoring",
      "Regular Backups",
      "Security Updates",
      "Priority Support",
    ],
    color: "cyan",
  },
];

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

const colorStyles: Record<string, string> = {
  indigo:
    "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30",
  purple:
    "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  pink: "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30",
  green:
    "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30",
  amber:
    "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  cyan: "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30",
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-white dark:bg-slate-900"
    >
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
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
                                group-hover:scale-110 transition-transform ${colorStyles[service.color]}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="text-sm md:text-base mb-5 leading-relaxed text-slate-600 dark:text-gray-400">
                  {hoveredIndex === index
                    ? service.fullDesc
                    : service.shortDesc}
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
                        className={`w-4 h-4 ${colorStyles[service.color].split(" ").find((c) => c.startsWith("text-"))}`}
                      />
                      <span className="text-slate-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className={`flex items-center gap-2 font-medium text-sm group-hover:gap-3 transition-all
                                ${colorStyles[service.color].split(" ").find((c) => c.startsWith("text-"))}`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
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

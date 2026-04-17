"use client";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ShoppingCart,
  Zap,
  Palette,
  ChevronRightIcon,
  MoreHorizontal,
} from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    title: "Custom Web Development",
    desc: "Bespoke websites tailored to your brand identity. From simple landing pages to complex web applications.",
    color: "bg-indigo-100 dark:bg-indigo-600/20",
  },
  {
    icon: (
      <Smartphone className="w-8 h-8 text-purple-600 dark:text-purple-400" />
    ),
    title: "Responsive Design",
    desc: "Pixel-perfect designs that look stunning on every device. Mobile-first approach for seamless experience.",
    color: "bg-purple-100 dark:bg-purple-600/20",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
    title: "E-Commerce Solutions",
    desc: "Powerful online stores with secure payment integration. Shopify, WooCommerce, or custom solutions.",
    color: "bg-pink-100 dark:bg-pink-600/20",
  },
  {
    icon: <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />,
    title: "Performance Optimization",
    desc: "Lightning-fast websites that rank higher on Google. We optimize every millisecond for SEO results.",
    color: "bg-green-100 dark:bg-green-600/20",
  },
  {
    icon: <Palette className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />,
    title: "UI/UX Design",
    desc: "User-centric designs that convert visitors into customers. Intuitive interfaces that delight and engage.",
    color: "bg-yellow-100 dark:bg-yellow-600/20",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 text-lg mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Our <span className="gradient-text">Premium Services</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="service-card group bg-white/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-700 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-120 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-4">
                {service.title}
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-gray-300 transition-colors">
                {service.desc}
              </p>
            </motion.div>
          ))}
          <a
            href="/services"
            className="group bg-white/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-700 transition-all duration-300"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 6 * 0.1 }}
            >
              <div
                className={`w-16 h-16 bg-red-100 dark:bg-red-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-120 transition-transform duration-300`}
              >
                <MoreHorizontal className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-slate-900 dark:text-white flex items-center text-2xl font-bold mb-4">
                More Services&nbsp;
                <ChevronRightIcon className="font-extrabold animate-rl" />
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-gray-300 transition-colors">
                Checkout all our services.
              </p>
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
}

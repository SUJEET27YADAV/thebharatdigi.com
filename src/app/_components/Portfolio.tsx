"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Fashion retail giant's online store",
    icon: "🛒",
    color: "from-indigo-600 to-purple-600",
  },
  {
    title: "FinTech Dashboard",
    category: "Banking analytics platform",
    icon: "🏦",
    color: "from-pink-600 to-red-600",
  },
  {
    title: "Healthcare Portal",
    category: "Telemedicine platform",
    icon: "🏥",
    color: "from-green-600 to-teal-600",
  },
  {
    title: "Food Delivery App",
    category: "Restaurant ordering system",
    icon: "🍔",
    color: "from-yellow-600 to-orange-600",
  },
  {
    title: "Travel Booking",
    category: "Holiday package platform",
    icon: "✈️",
    color: "from-cyan-600 to-blue-600",
  },
  {
    title: "EdTech Platform",
    category: "Online learning management",
    icon: "🎓",
    color: "from-violet-600 to-purple-600",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-600 dark:text-indigo-400 text-lg mb-2"
          >
            Our Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg dark:shadow-none"
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${project.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
              >
                <span className="text-7xl group-hover:rotate-12 transition-transform duration-500">
                  {project.icon}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800 dark:from-slate-900 via-slate-800/60 dark:via-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-8 translate-y-4 group-hover:translate-y-0">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 dark:text-gray-300">
                    {project.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

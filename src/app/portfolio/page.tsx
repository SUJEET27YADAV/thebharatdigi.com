// components/Portfolio.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Layers,
  ShoppingCart,
  BarChart3,
  Heart,
  GraduationCap,
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Layers },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  { id: "saas", label: "SaaS", icon: BarChart3 },
  { id: "healthcare", label: "Healthcare", icon: Heart },
  { id: "education", label: "Education", icon: GraduationCap },
];

const projects = [
  {
    id: 1,
    title: "StyleHub E-Commerce",
    subtitle: "Fashion Retail",
    category: "ecommerce",
    icon: "👗",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    technologies: ["Next.js", "Node.js", "MongoDB"],
    year: "2024",
    featured: true,
  },
  {
    id: 2,
    title: "FinFlow Dashboard",
    subtitle: "Banking Analytics",
    category: "saas",
    icon: "📊",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    technologies: ["React", "Python", "PostgreSQL"],
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    title: "MediCare Connect",
    subtitle: "Telemedicine",
    category: "healthcare",
    icon: "🏥",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    technologies: ["React Native", "Node.js"],
    year: "2023",
    featured: true,
  },
  {
    id: 4,
    title: "FoodieGo",
    subtitle: "Food Delivery",
    category: "ecommerce",
    icon: "🍔",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    technologies: ["Flutter", "Firebase"],
    year: "2023",
    featured: false,
  },
  {
    id: 5,
    title: "EduSpark LMS",
    subtitle: "Learning Platform",
    category: "education",
    icon: "🎓",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    technologies: ["React", "Django"],
    year: "2023",
    featured: false,
  },
  {
    id: 6,
    title: "TravelEase",
    subtitle: "Booking Platform",
    category: "ecommerce",
    icon: "✈️",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    technologies: ["Next.js", "GraphQL"],
    year: "2023",
    featured: false,
  },
];

const testimonials = [
  {
    quote:
      "The Bharat Digital delivered beyond expectations. Our platform saw a 250% revenue increase.",
    author: "Priya Mehta",
    role: "CEO, StyleHub India",
    avatar: "PM",
  },
  {
    quote:
      "Their technical expertise transformed our banking operations. Highly recommended!",
    author: "Vikram Singh",
    role: "CTO, National Bank",
    avatar: "VS",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-24 overflow-hidden bg-white dark:bg-slate-900"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl bg-indigo-200/50 dark:bg-indigo-500/5" />
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full blur-3xl bg-purple-200/50 dark:bg-purple-500/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6
                       bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Our Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Projects That <span className="gradient-text">Inspire</span>
          </motion.h2>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-slate-500 dark:text-gray-400" />
            <span className="text-slate-500 dark:text-gray-400 font-medium">
              Filter by Category
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all
                           ${
                             activeCategory === cat.id
                               ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                               : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                           }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-300
                           bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                           hover:shadow-xl dark:hover:shadow-none hover:border-slate-300 dark:hover:border-slate-600/50"
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      {project.icon}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      Featured
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium capitalize">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-lg font-bold group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors text-slate-900 dark:text-white">
                        {project.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-gray-400">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 dark:text-gray-500">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-end mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <a
                      href="#"
                      className="text-sm font-medium flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group/link"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              What Our <span className="gradient-text">Clients Say</span>
            </h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute z-10 -top-6 left-8 text-indigo-200 dark:text-indigo-500/20">
              <Quote className="w-20 h-20" />
            </div>

            <div className="relative rounded-2xl p-8 md:p-12 border bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl md:text-2xl leading-relaxed mb-8 italic text-slate-700 dark:text-gray-300">
                    &quot;{testimonials[testimonialIndex].quote}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonials[testimonialIndex].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonials[testimonialIndex].author}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-gray-400">
                        {testimonials[testimonialIndex].role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50">
                <button
                  onClick={() =>
                    setTestimonialIndex(
                      (p) =>
                        (p - 1 + testimonials.length) % testimonials.length,
                    )
                  }
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all
                             bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50
                             text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === testimonialIndex
                          ? "w-6 bg-indigo-500"
                          : "bg-slate-300 dark:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setTestimonialIndex((p) => (p + 1) % testimonials.length)
                  }
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all
                             bg-white dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50
                             text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full
                         bg-white text-indigo-600 font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  Heart,
  Shield,
  Zap,
  Rocket,
  Users,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Building,
  Star,
} from "lucide-react";

const Counter = ({
  target,
  suffix = "+",
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  {
    icon: Rocket,
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    color: "indigo",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    color: "purple",
  },
  {
    icon: Globe,
    value: 15,
    suffix: "+",
    label: "Countries Served",
    color: "cyan",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    color: "pink",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "We stay ahead of trends.",
    color: "amber",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    desc: "Your success is our success.",
    color: "red",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    desc: "No hidden costs.",
    color: "green",
  },
  {
    icon: Zap,
    title: "Excellence Driven",
    desc: "Every detail matters.",
    color: "indigo",
  },
];

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    desc: "Started as a small freelance operation with big dreams and bigger ambitions.",
    icon: Sparkles,
  },
  {
    year: "2018",
    title: "First Office",
    desc: "Expanded to a full team and opened our first office in New Delhi.",
    icon: Building,
  },
  {
    year: "2021",
    title: "Going Global",
    desc: "Landed our first international clients from USA, UK, and Australia.",
    icon: Globe,
  },
  {
    year: "2023",
    title: "100+ Clients",
    desc: "Crossed the milestone of 100 satisfied clients across 10 countries.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Recently",
    desc: "Expanding services with AI integration and enterprise solutions.",
    icon: Rocket,
  },
];

const colorStyles: Record<string, string> = {
  indigo:
    "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30",
  purple:
    "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  cyan: "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30",
  pink: "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30",
  amber:
    "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  red: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30",
  green:
    "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30",
};

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(4);

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-800/30"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 rounded-full blur-3xl bg-indigo-200/50 dark:bg-indigo-500/5" />
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
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Crafting Digital <span className="gradient-text">Excellence</span>{" "}
            Since 2015
          </motion.h2>
        </div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To democratize world-class web development by making premium digital solutions accessible to businesses of all sizes.",
              color: "indigo",
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "To become the most trusted digital partner for businesses worldwide, known for our innovation and reliability.",
              color: "purple",
            },
          ].map((item, i) => (
            <div key={i} className="relative group">
              <div
                className={`absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity
                              bg-gradient-to-r ${i === 0 ? "from-indigo-400 to-indigo-300" : "from-purple-400 to-purple-300"}`}
              />
              <div
                className="relative rounded-2xl p-8 h-full backdrop-blur-sm border
                              bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/50"
              >
                <div
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-6 ${colorStyles[item.color]}`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center p-6 rounded-2xl border transition-all group
                         bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                         hover:shadow-lg dark:hover:shadow-none hover:bg-white dark:hover:bg-slate-800/60"
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mx-auto mb-4
                              group-hover:scale-110 transition-transform ${colorStyles[stat.color]}`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-slate-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Our Core <span className="gradient-text">Values</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border text-center transition-all
                           bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                           hover:shadow-lg dark:hover:shadow-none hover:bg-white dark:hover:bg-slate-800/60"
              >
                <div
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center mx-auto mb-4
                                group-hover:scale-110 transition-transform ${colorStyles[value.color]}`}
                >
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A decade of growth, learning, and creating digital excellence
            </p>
          </div>

          {/* Timeline Desktop */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-700 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 transition-all duration-500"
              style={{
                width: `${((activeTimeline + 1) / timeline.length) * 100}%`,
              }}
            />

            <div className="grid grid-cols-5 gap-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pt-8 cursor-pointer"
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  {/* Node */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      index <= activeTimeline
                        ? "bg-indigo-500 border-indigo-400"
                        : "bg-slate-800 border-slate-600"
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 ${
                        index <= activeTimeline ? "text-white" : "text-gray-500"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`text-center p-4 rounded-xl transition-all duration-300 ${
                      index === activeTimeline
                        ? "bg-slate-800/60 border border-indigo-500/30"
                        : "hover:bg-slate-800/40"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        index <= activeTimeline
                          ? "text-indigo-400"
                          : "text-gray-500"
                      }`}
                    >
                      {item.year}
                    </span>
                    <h4
                      className={`font-semibold mt-8 mb-1 ${
                        index <= activeTimeline
                          ? "text-black dark:text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed ${
                        index === activeTimeline
                          ? "text-white dark:text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Mobile */}
          <div className="md:hidden space-y-4">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-700 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-indigo-400 text-sm font-bold">
                    {item.year}
                  </span>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 rounded-2xl blur-xl opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div
              className="relative rounded-2xl p-8 backdrop-blur-sm border
                            bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/50"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-lg mb-6 italic text-slate-700 dark:text-gray-300">
                &quot;The Bharat Digital transformed our online presence
                completely. Their attention to detail was exceptional!&quot;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  RS
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Rahul Sharma
                  </div>
                  <div className="text-sm text-slate-500 dark:text-gray-400">
                    CEO, TechStart India
                  </div>
                </div>
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
              Ready to Work With Us?
            </h3>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let&apos;s create something extraordinary together. Your success
              story starts with a simple conversation.
            </p>
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

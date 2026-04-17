"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, Fashion Hub India",
    content:
      "The Bharat Digital delivered beyond our expectations. Our e-commerce sales increased by 300% within 3 months of the new website launch. Highly recommended!",
    initials: "RK",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, TechStart NYC",
    content:
      "Working with The Bharat Digital was a breeze. Despite the time zone difference, they were always available and delivered our project ahead of schedule. True professionals!",
    initials: "SM",
    gradient: "from-pink-500 to-red-500",
  },
  {
    name: "Amit Patel",
    role: "Director, GreenTech Solutions",
    content:
      "The team's attention to detail is remarkable. They understood our brand perfectly and created a website that truly represents our values. Exceptional work!",
    initials: "AP",
    gradient: "from-green-500 to-teal-500",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-lg mb-2"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-indigo-500/30 transition-all duration-300 shadow-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${t.gradient} rounded-full flex items-center justify-center font-bold text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Counter: React.FC<{ target: number; suffix?: string }> = ({
  target,
  suffix = "+",
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

export default function About() {
  const benefits = [
    {
      title: "Global Standards, Local Understanding",
      desc: "We combine international best practices with deep understanding of Indian and global markets.",
    },
    {
      title: "Transparent Pricing",
      desc: "No hidden costs. Competitive rates in INR & USD with flexible payment options.",
    },
    {
      title: "Agile Development",
      desc: "Regular updates, quick iterations, and on-time delivery guaranteed.",
    },
    {
      title: "Post-Launch Support",
      desc: "We don't disappear after delivery. 24/7 support across time zones.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 w-full overflow-x-hidden bg-slate-100 dark:bg-slate-800/30"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-lg mb-2 font-medium">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Crafting Digital <span className="gradient-text">Excellence</span>{" "}
              Since 2015
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              At The Bharat Digital, we believe every business deserves a
              world-class digital presence. Whether you're a budding startup in
              Bangalore, an established enterprise in Delhi, or a global brand
              looking to expand – we speak your language.
            </p>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-4xl font-bold gradient-text mb-1">
                  <Counter target={500} />
                </h3>
                <p className="text-slate-500 dark:text-gray-400">
                  Projects Completed
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold gradient-text mb-1">
                  <Counter target={200} />
                </h3>
                <p className="text-slate-500 dark:text-gray-400">
                  Happy Clients
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold gradient-text mb-1">
                  <Counter target={15} />
                </h3>
                <p className="text-slate-500 dark:text-gray-400">
                  Countries Served
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-bold gradient-text mb-1">
                  <Counter target={8} />
                </h3>
                <p className="text-slate-500 dark:text-gray-400">
                  Years Experience
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-indigo-600/50 to-purple-600/50 rounded-3xl p-[1px]">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl">
                <h3 className="text-slate-900 dark:text-white text-2xl font-bold mb-8">
                  Why Choose Us?
                </h3>
                <ul className="space-y-6">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-slate-600 dark:text-gray-300">
                        <strong className="text-slate-900 dark:text-white block mb-1">
                          {benefit.title}
                        </strong>
                        {benefit.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

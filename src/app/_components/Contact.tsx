"use client";
import React, { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import SubmitAction from "@/actions/formsubmitAction";

const initState = {
  msg: "",
};

const projectTypes = [
  "Custom Website Development",
  "E-Commerce Store",
  "Web Application",
  "Mobile App Development",
  "UI/UX Design",
  "IT Support & Maintenance",
  "Other",
];

const budgetRanges = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

export default function Contact() {
  const [formState, formAction, isPending] = useActionState(
    SubmitAction,
    initState,
  );

  useEffect(() => {
    if (formState.msg !== "") {
      alert(formState.msg);
    }
  }, [formState]);

  return (
    <section
      id="contact"
      className="py-24 w-full overflow-x-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-indigo-600 dark:text-indigo-400 text-lg mb-2 font-medium">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Let's Build Something{" "}
              <span className="gradient-text">Amazing Together</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-lg mb-10 leading-relaxed">
              Ready to transform your digital presence? Get in touch with us
              today for a free consultation. We'd love to hear about your
              project and discuss how we can help you achieve your goals.
            </p>

            <div className="space-y-8">
              <a
                href="tel:+919999239307"
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-600/20 rounded-2xl flex items-center justify-center relative pulse-ring group-hover:bg-indigo-200 dark:group-hover:bg-indigo-600/30 transition-colors">
                  <Phone className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                    Phone
                  </h4>
                  <div className="text-slate-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    +91 99992 39307
                  </div>
                </div>
              </a>

              <a
                href="mailto:tbdhelpcenter@gmail.com"
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-600/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-600/30 transition-colors">
                  <Mail className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                    Email
                  </h4>
                  <div className="text-slate-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    tbdhelpcenter@gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-pink-100 dark:bg-pink-600/20 rounded-2xl flex items-center justify-center group-hover:bg-pink-200 dark:group-hover:bg-pink-600/30 transition-colors">
                  <MapPin className="text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                    Location
                  </h4>
                  <p className="text-slate-600 dark:text-gray-400">
                    Serving clients globally 🌍
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              action={formAction}
              className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-2xl dark:shadow-2xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
                Send Us a Message
              </h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-gray-300">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Company Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      className="w-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="pType"
                      required
                      className="w-full text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.2rem",
                      }}
                    >
                      <option value="" className="bg-white dark:bg-slate-900">
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-white dark:bg-slate-900"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-700 dark:text-gray-300 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.2rem",
                      }}
                    >
                      <option value="" className="bg-white dark:bg-slate-900">
                        Select budget range
                      </option>
                      {budgetRanges.map((range) => (
                        <option
                          key={range}
                          value={range}
                          className="bg-white dark:bg-slate-900"
                        >
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                    Project Details <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all h-36 resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600 text-slate-900 dark:text-white"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-indigo-500 focus:ring-indigo-500/50"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-slate-500 dark:text-gray-400 text-sm"
                  >
                    Keep me updated with news, insights, and exclusive offers
                    from The Bharat Digital
                  </label>
                </div>

                <button
                  type="submit"
                  className="glow-btn w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message{" "}
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

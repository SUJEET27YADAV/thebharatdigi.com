"use client";
import React, { useActionState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
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

const easeOut = [0.23, 1, 0.32, 1] as const;

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [formState, formAction, isPending] = useActionState(
    SubmitAction,
    initState,
  );

  useEffect(() => {
    if (formState.msg !== "") {
      toast.info(formState.msg);
    }
  }, [formState]);

  const slideIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.25, ease: easeOut },
      };

  return (
    <section
      id="contact"
      className="py-24 w-full overflow-x-hidden bg-slate-100 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...slideIn}>
            <p className="section-label mb-2 normal-case tracking-normal text-base">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Amazing Together</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
              Ready to transform your digital presence? Tell us about your
              project and we&apos;ll get back with a free consultation.
            </p>

            <div className="space-y-6">
              <a
                href="tel:+919999239307"
                rel="nofollow"
                className="flex items-center gap-4 group rounded p-2 -ml-2 hover:bg-white/60 dark:hover:bg-slate-800/40 transition-colors duration-150"
              >
                <div className="w-12 h-12 shrink-0 bg-indigo-100 dark:bg-indigo-600/20 rounded flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-600/30 transition-colors duration-150">
                  <Phone className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Phone
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    +91 99992 39307
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@thebharatdigi.com"
                rel="nofollow"
                className="flex items-center gap-4 group rounded p-2 -ml-2 hover:bg-white/60 dark:hover:bg-slate-800/40 transition-colors duration-150"
              >
                <div className="w-12 h-12 shrink-0 bg-purple-100 dark:bg-purple-600/20 rounded flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-600/30 transition-colors duration-150">
                  <Mail className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Email
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    support@thebharatdigi.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-2 -ml-2">
                <div className="w-12 h-12 shrink-0 bg-pink-100 dark:bg-pink-600/20 rounded flex items-center justify-center">
                  <MapPin className="text-pink-600 dark:text-pink-400" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    Location
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Serving clients globally
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...slideIn}
            transition={{ duration: 0.25, delay: 0.05, ease: easeOut }}
          >
            <form action={formAction} className="card p-8 md:p-10">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Send Us a Message
              </h3>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="input"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Company Name
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className="input"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-ptype" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select id="contact-ptype" name="pType" required className="select">
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                      Budget Range
                    </label>
                    <select id="contact-budget" name="budget" className="select">
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5 text-slate-700 dark:text-slate-300">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    className="input h-32 resize-none"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-slate-500 dark:text-slate-400 text-sm leading-snug"
                  >
                    Keep me updated with news and offers from The Bharat Digital
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full py-3.5 text-base"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} aria-hidden />
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

"use client";
import { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  Clock,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Globe,
  Headphones,
  Zap,
  Shield,
  ChevronDown,
} from "lucide-react";
import { CloseOutlined } from "@mui/icons-material";
import SubmitAction from "@/actions/formsubmitAction";

const initState = { msg: "" };

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: "+91 99992 39307",
    href: "tel:+919999239307",
    color: "indigo",
  },
  {
    icon: Mail,
    title: "Email",
    value: "tbdhelpcenter@gmail.com",
    href: "mailto:tbdhelpcenter@gmail.com",
    color: "purple",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "+91 99992 39307",
    href: "https://wa.me/919999239307",
    color: "green",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Global Services",
    href: "#",
    color: "pink",
  },
];

const features = [
  { icon: Clock, title: "Quick Response", desc: "Reply within 24 hours" },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Personal project manager",
  },
  { icon: Zap, title: "Fast Delivery", desc: "On-time completion" },
  { icon: Shield, title: "Secure Process", desc: "NDA & data protection" },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary. Simple websites take 2-4 weeks, complex apps may take 2-3 months.",
  },
  {
    q: "What is your pricing structure?",
    a: "We offer flexible pricing based on requirements. Contact us for a free quote.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes! We offer maintenance packages including updates, security patches, and 24/7 support.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We seamlessly integrate with your team, whether you need full development or specific expertise.",
  },
];

const socials = [
  { icon: Facebook, href: "#" },
  { icon: LinkedIn, href: "#" },
  { icon: Instagram, href: "#" },
];

const colorStyles: Record<string, string> = {
  indigo:
    "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 hover:shadow-indigo-500",
  purple:
    "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30 hover:shadow-purple-500",
  green:
    "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 hover:shadow-green-500",
  pink: "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30 hover:shadow-pink-500",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (formState.msg !== "") {
      if (formState.msg.toLowerCase().includes("Thank you")) {
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(null), 5000);
      } else {
        setFormSuccess(false);
        setTimeout(() => setFormSuccess(null), 5000);
      }
    }
  }, [formState]);

  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-900"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-indigo-200/50 dark:bg-indigo-500/5" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-purple-200/50 dark:bg-purple-500/5" />
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
            <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Available Worldwide
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing Together</span>
          </motion.h2>
        </div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {contactMethods.map((method, i) => (
            <a
              key={i}
              href={method.href}
              className={`group p-6 rounded-2xl border transition-all duration-300
                         bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                         hover:shadow-lg ${colorStyles[method.color].split(" ").find((s) => s.startsWith("hover:shadow"))} hover:bg-white dark:hover:bg-slate-800/60`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform ${colorStyles[method.color]}`}
              >
                <method.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold mb-1 text-slate-900 dark:text-white">
                {method.title}
              </h4>
              <p
                className={`font-medium ${colorStyles[method.color].split(" ").find((c) => c.startsWith("text-"))}`}
              >
                {method.value}
              </p>
            </a>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm overflow-hidden border
                            bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50"
            >
              {/* Success Overlay */}
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl
                             bg-white/95 dark:bg-slate-900/95"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                formSuccess === false && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl
                             bg-white/95 dark:bg-slate-900/95"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 text-5xl font-extrabold">
                      <CloseOutlined
                        fontSize="inherit"
                        className="text-red-400"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                      Failed to send your Message!
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400">
                      Please try again.
                    </p>
                  </motion.div>
                )
              )}

              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  Send Us a Message
                </h3>
                <p className="mt-1 text-slate-500 dark:text-gray-400">
                  Fill out the form and we&apos;ll respond promptly
                </p>
              </div>

              <form action={formAction} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-xl px-4 py-3.5 border transition-all
                                 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700
                                 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600
                                 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl px-4 py-3.5 border transition-all
                                 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700
                                 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600
                                 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full rounded-xl px-4 py-3.5 border transition-all
                                 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700
                                 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600
                                 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">
                      Company Name
                    </label>
                    <input
                      name="company"
                      type="text"
                      className="w-full rounded-xl px-4 py-3.5 border transition-all
                                 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700
                                 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600
                                 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="pType"
                      required
                      className="w-full rounded-xl px-4 py-3.5 border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.2rem",
                      }}
                    >
                      <option
                        value=""
                        className="bg-slate-400 dark:bg-slate-900"
                      >
                        Select a project type
                      </option>
                      {projectTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="bg-slate-400 dark:bg-slate-900"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium dark:text-gray-300">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      className="w-full rounded-xl px-4 py-3.5 border bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.2rem",
                      }}
                    >
                      <option
                        value=""
                        className="bg-slate-400 dark:bg-slate-900"
                      >
                        Select budget range
                      </option>
                      {budgetRanges.map((range) => (
                        <option
                          key={range}
                          value={range}
                          className="bg-slate-400 dark:bg-slate-900"
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
                    className="w-full rounded-xl px-4 py-3.5 h-36 resize-none border transition-all
                               bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700
                               text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600
                               focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all flex items-center justify-center gap-2 group
                             bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                             shadow-lg shadow-indigo-600/20 disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Why Work With Us */}
            <div className="rounded-2xl p-6 border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50">
              <h4 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Why Work With Us?
              </h4>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0
                                    bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30"
                    >
                      <f.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white">
                        {f.title}
                      </h5>
                      <p className="text-sm text-slate-500 dark:text-gray-400">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl p-6 border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all
                               bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50
                               text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white
                               hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:border-indigo-200 dark:hover:border-indigo-500/30"
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div
              className="rounded-2xl p-6 border
                            bg-gradient-to-br from-indigo-50 dark:from-indigo-600/20 to-purple-50 dark:to-purple-600/20
                            border-indigo-200 dark:border-indigo-500/30"
            >
              <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Need Urgent Help?
              </h4>
              <p className="text-sm mb-4 text-slate-600 dark:text-gray-300">
                For time-sensitive projects, reach out directly
              </p>
              <a
                href="https://wa.me/919999239307"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl overflow-hidden border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors
                             hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <span className="font-semibold pr-4 text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300
                                          text-slate-500 dark:text-gray-400 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}
                >
                  <p className="px-5 pb-5 text-slate-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="relative px-6 py-16 md:py-20 text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Still Have Questions?
            </h3>
            <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Can&apos;t find what you&apos;re looking for? Our team is here to
              help with any questions about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919999239307"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 font-semibold hover:bg-indigo-700 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
              <a
                href="https://wa.me/919999239307"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-600 font-semibold hover:bg-slate-800 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Live Chat
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

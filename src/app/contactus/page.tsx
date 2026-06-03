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
    rel: "nofollow",
    color: "indigo",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@thebharatdigi.com",
    href: "mailto:support@thebharatdigi.com",
    rel: "nofollow",
    color: "purple",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "+91 99992 39307",
    href: "https://wa.me/919999239307",
    rel: "nofollow",
    color: "green",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Global Services",
    href: "#",
    rel: "nofollow",
    color: "pink",
  },
];

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string | React.ReactNode;
}
const features: FeatureItem[] = [
  {
    icon: Clock,
    title: "Quick Response",
    desc: (
      <>
        Queries get replied within <strong>24 hours</strong>
      </>
    ),
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: (
      <>
        Personal project manager assistance <strong>24/7</strong>
      </>
    ),
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: (
      <>
        <strong>On-time</strong>/before-time completion
      </>
    ),
  },
  {
    icon: Shield,
    title: "Secure Process",
    desc: (
      <>
        <strong>NDA</strong> & data protection
      </>
    ),
  },
];

interface FaqItem {
  q: string;
  a: string | React.ReactNode;
}
const faqs: FaqItem[] = [
  {
    q: "How long does a typical project take?",
    a: (
      <>
        Project timelines can vary. A simple <strong>website</strong> may take
        1-3 weeks and complex <strong>web apps</strong> may take 2-3 months.
      </>
    ),
  },
  {
    q: "What is your pricing structure?",
    a: (
      <>
        We offer flexible pricing structure based on client's requirements.
        Contact us to get a <strong>free quote</strong> tailored for your needs.
      </>
    ),
  },
  {
    q: "Do you provide ongoing support?",
    a: (
      <>
        Yes ofcourse! We offer <strong>annual maintenance packages</strong>,
        that include one major update, and some regular updates for security
        patches, and <strong>24/7 live support</strong> on call, whatsapp or
        email.
      </>
    ),
  },
  {
    q: "Can you work with our existing team?",
    a: (
      <>
        Absolutely. We can seamlessly integrate with your existing team,
        depending upon your requirement, whether you need just a{" "}
        <strong>design</strong>, a complete <strong>development</strong> or
        expertise in a specific task.
      </>
    ),
  },
];

const socials = [
  { icon: Facebook, href: "#", rel: "nofollow" },
  { icon: LinkedIn, href: "#", rel: "nofollow" },
  { icon: Instagram, href: "#", rel: "nofollow" },
];

const colorStyles: Record<string, string> = {
  indigo:
    "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/30",
  purple:
    "bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30",
  green:
    "bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 hover:shadow-xl hover:shadow-green-500/30",
  pink: "bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/30",
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
    <section className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-200/50 dark:bg-indigo-500/5" />
        <div className="absolute bottom-20 right-10 size-96 rounded-full bg-purple-200/50 dark:bg-purple-500/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border mb-6
                       bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20"
          >
            <Globe className="size-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
              Available Worldwide
            </span>
          </motion.div>
          <h1 className="sr-only">
            The Bharat Digital — "Premium Web Development Company that offers
            SEO Audit Tools, e-commerce solutions, IT support & much more for
            Businesses all over the world.
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white"
          >
            Let&apos;s Build Your{" "}
            <span className="gradient-text">Digital &amp; IT Vision</span>
          </motion.h2>
          <p className="text-lg">
            Ready to transform your valuable vision into a digital
            infrastucture, contact us using any of the below methods:
          </p>
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
              rel={method.rel}
              className={`group p-6 rounded border transition-all duration-300
                         bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50
                         hover:bg-white dark:hover:bg-slate-800/60`}
            >
              <div
                className={`size-12 rounded border flex items-center justify-center mb-4
                              group-hover:scale-110 transition-transform ${colorStyles[method.color]}`}
              >
                <method.icon className="size-5" />
              </div>
              <h3 className="font-semibold mb-1 text-slate-900 dark:text-white">
                {method.title}
              </h3>
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
              className="relative rounded p-6 md:p-10 overflow-hidden border
                             bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50"
            >
              {/* Success Overlay */}
              {formSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded
                             bg-white/95 dark:bg-slate-900/95"
                >
                  <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="size-10 text-green-400" />
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
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded
                             bg-white/95 dark:bg-slate-900/95"
                  >
                    <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 text-5xl font-extrabold">
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
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  Send Us a Message
                </h2>
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
                      className="input"
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
                      className="input"
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
                      className="input"
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
                      className="input"
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
                      className="select"
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
                    <select name="budget" className="select">
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
                    className="input h-36 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full py-3.5 text-base"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} aria-hidden />
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
            <div className="rounded p-6 border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                Why Work With Us?
              </h2>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="size-10 rounded border flex items-center justify-center flex-shrink-0
                                    bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30"
                    >
                      <f.icon className="size-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {f.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded p-6 border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                Connect With Us
              </h2>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    rel={s.rel}
                    className="size-11 rounded border flex items-center justify-center transition-all
                               bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/50
                               text-slate-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white
                               hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:border-indigo-200 dark:hover:border-indigo-500/30"
                  >
                    <s.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div
              className="rounded p-6 border
                             bg-gradient-to-br from-indigo-50 dark:from-indigo-600/20 to-purple-50 dark:to-purple-600/20
                             border-indigo-200 dark:border-indigo-500/30"
            >
              <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Need Urgent Help?
              </h2>
              <p className="text-sm mb-4 text-slate-600 dark:text-gray-300">
                For time-sensitive projects, reach out directly
              </p>
              <a
                href="https://wa.me/919999239307"
                rel="nofollow"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition-all"
              >
                <MessageSquare className="size-4" />
                WhatsApp Us
                <ArrowRight className="size-4" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded overflow-hidden border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors
                             hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <span className="font-semibold pr-4 text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-5 flex-shrink-0 transition-transform duration-300
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
          className="relative rounded overflow-hidden"
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-green-600 font-semibold hover:bg-indigo-700 transition-all"
              >
                <Phone className="size-4" />
                Call Us Now
              </a>
              <a
                href="https://wa.me/919999239307"
                rel="nofollow"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded border border-slate-600 font-semibold hover:bg-slate-800 transition-all"
              >
                <MessageSquare className="size-4" />
                Live Chat
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

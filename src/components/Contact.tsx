"use client";
import { useActionState, useEffect } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import SubmitAction from "@/actions/formsubmitAction";
import { easeOut, viewFade, staggerDelay } from "@/utils/motion";

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

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99992 39307",
    href: "tel:+919999239307",
    color: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50 dark:bg-indigo-600/10",
    glow: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@thebharatdigi.com",
    href: "mailto:support@thebharatdigi.com",
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50 dark:bg-purple-600/10",
    glow: false,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Serving clients globally",
    href: undefined,
    color: "from-pink-500 to-pink-600",
    bgLight: "bg-pink-50 dark:bg-pink-600/10",
    glow: false,
  },
];

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const slideIn = viewFade(prefersReducedMotion, 0.5);
  const [formState, formAction, isPending] = useActionState(
    SubmitAction,
    initState,
  );

  useEffect(() => {
    if (formState.msg !== "") {
      toast.info(formState.msg);
    }
  }, [formState]);

  return (
      <section
        id="contact"
        className="py-24 w-full overflow-x-hidden bg-slate-100/80 dark:bg-slate-900/50 relative"
      >
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <m.div {...slideIn}>
              <p className="section-label mb-3 normal-case tracking-normal text-base">
                Get In Touch
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white leading-tight">
                Let&apos;s Build Something{" "}
                <span className="gradient-text">Amazing Together</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
                Ready to transform your digital presence? Tell us about your
                project and we&apos;ll get back with a free consultation.
              </p>

              <div className="space-y-4">
                {CONTACT_METHODS.map((method, index) => {
                  const Icon = method.icon;
                  const Wrapper = method.href ? "a" : "div";
                  const wrapperProps = method.href
                    ? { href: method.href, rel: "nofollow" }
                    : {};
                  return (
                    <m.div
                      key={method.label}
                      {...slideIn}
                      transition={{
                        duration: 0.4,
                        delay: staggerDelay(prefersReducedMotion, index, 0.08),
                        ease: easeOut,
                      }}
                    >
                      <Wrapper
                        {...wrapperProps}
                        className="flex items-center gap-4 group rounded-xl p-3 hover:bg-white/60 dark:hover:bg-slate-800/40 transition-all duration-200"
                      >
                        <div
                          className={`relative size-12 shrink-0 ${method.bgLight} rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                        >
                          {method.glow && (
                            <span className="absolute inset-0 rounded-xl bg-indigo-500 animate-[pulse-ring_2s_ease-out_infinite] opacity-20" aria-hidden />
                          )}
                          <div className={`bg-gradient-to-br ${method.color} rounded-lg size-8 flex items-center justify-center relative z-10`}>
                            <Icon className="text-white" size={16} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {method.label}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {method.value}
                          </p>
                        </div>
                      </Wrapper>
                    </m.div>
                  );
                })}
              </div>
            </m.div>

            <m.div
              {...slideIn}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            >
              <form action={formAction} className="card p-8 md:p-10 gradient-border">
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
                      aria-label="Subscribe to newsletter"
                      className="mt-1 size-4 rounded border-slate-300 dark:border-slate-600 accent-indigo-600"
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
                    className="btn-primary w-full py-3.5 text-base group"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden />
                        <span>Sending…</span>
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
            </m.div>
          </div>
        </div>
      </section>
  );
}

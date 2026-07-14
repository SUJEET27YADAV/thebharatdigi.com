import Link from "next/link";
import { Palette, ArrowRight, Layers, Code, Server, Clock, Users, Award, Sparkles } from "lucide-react";
import ServiceCard from "./ServiceCard";
import FaqSection from "@/components/FaqSection";
import { faqs as faqData } from "@/lib/faq-data";

const stats = [
  { icon: Code, value: "500+", label: "Projects Delivered" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: Clock, value: "99.9%", label: "Uptime Guaranteed" },
  { icon: Award, value: "10+", label: "Years Experience" },
];

const process = [
  { step: "01", title: "Discovery", desc: "Analyze requirements", icon: Sparkles },
  { step: "02", title: "Design", desc: "Create visual designs", icon: Palette },
  { step: "03", title: "Develop", desc: "Build with modern tech", icon: Code },
  { step: "04", title: "Deploy", desc: "Launch and support", icon: Server },
];

const staticServices = [
  {
    id: "mvp-development",
    icon: "rocket",
    title: "MVP Development",
    shortdesc: "You have an idea and want to launch it within 60 days.",
    fulldesc: "Launch your product in 60 days with a focused MVP approach. We strip away the unnecessary, validate your core hypothesis, and get real users in your hands fast.",
    features: ["60-day launch timeline", "Core feature validation", "Scalable architecture", "Market-ready product"],
    color: "text-orange-500",
    popular: true,
  },
  {
    id: "ai-development",
    icon: "brain",
    title: "AI Development",
    shortdesc: "Build custom generative AI solutions for your business.",
    fulldesc: "From LLM-powered chatbots to custom RAG pipelines and computer vision apps — we turn AI potential into production-ready products.",
    features: ["LLM integration", "RAG pipelines", "Fine-tuned models", "AI agent workflows"],
    color: "text-purple-500",
    popular: false,
  },
  {
    id: "automation",
    icon: "zap",
    title: "Automation",
    shortdesc: "CRM setups, no-code tools, and workflow automation.",
    fulldesc: "Stop doing repetitive work. We design and implement automation workflows using no-code tools, custom scripts, and CRM integrations that save you hours every day.",
    features: ["CRM automation", "No-code workflows", "Custom scripting", "Process optimization"],
    color: "text-amber-500",
    popular: false,
  },
  {
    id: "ecommerce-development",
    icon: "shopping-cart",
    title: "E-commerce Development",
    shortdesc: "Shopify, WooCommerce, and custom stores that convert.",
    fulldesc: "Build a high-converting online store tailored to your brand. Custom themes, payment integrations, inventory management, and SEO-optimised architecture included.",
    features: ["Shopify / WooCommerce", "Custom themes", "Payment gateway setup", "Inventory management"],
    color: "text-emerald-500",
    popular: true,
  },
  {
    id: "seo-marketing",
    icon: "search",
    title: "SEO & Marketing",
    shortdesc: "Rank higher, convert better, and grow your traffic.",
    fulldesc: "Data-driven SEO and digital marketing strategies that drive organic traffic, improve rankings, and maximise ROI. We also offer SEO Audit Pro for deep technical audits.",
    features: ["Technical SEO audits", "Content strategy", "Performance optimisation", "Conversion rate optimisation"],
    color: "text-blue-500",
    popular: false,
  },
  {
    id: "mobile-app-development",
    icon: "smartphone",
    title: "Mobile Apps",
    shortdesc: "iOS, Android, and cross-platform apps built for scale.",
    fulldesc: "Native and cross-platform mobile applications with clean architecture, smooth UX, and robust backend integration. From prototype to App Store deployment.",
    features: ["Cross-platform (React Native / Flutter)", "Native iOS & Android", "App Store deployment", "Backend APIs & cloud sync"],
    color: "text-rose-500",
    popular: false,
  },
  {
    id: "custom-web-development",
    icon: "code",
    title: "Custom Web Development",
    shortdesc: "Tailored websites built for your business goals.",
    fulldesc: "From business websites to complex corporate portals, we build tailored web solutions that align with your brand and growth objectives.",
    features: ["Business websites", "Corporate portals", "CMS integration", "Landing pages"],
    color: "text-cyan-500",
    popular: false,
  },
  {
    id: "performance-optimization",
    icon: "gauge",
    title: "Performance Optimization",
    shortdesc: "Make your website faster, rank higher, convert better.",
    fulldesc: "We optimize Core Web Vitals, implement caching strategies, optimize images, and fine-tune your stack to deliver blazing-fast page loads.",
    features: ["Core Web Vitals", "Caching strategies", "Image optimization", "CDN setup"],
    color: "text-green-500",
    popular: false,
  },
  {
    id: "web-app-development",
    icon: "layout-dashboard",
    title: "Web App Development",
    shortdesc: "SaaS platforms, dashboards, APIs and enterprise tools.",
    fulldesc: "Full-stack web applications with real-time capabilities, robust APIs, and scalable architectures. From SaaS dashboards to enterprise portals.",
    features: ["SaaS platforms", "Real-time apps", "API development", "Enterprise portals"],
    color: "text-violet-500",
    popular: false,
  },
  {
    id: "ui-ux-design",
    icon: "paintbrush",
    title: "UI/UX Design",
    shortdesc: "User research, wireframes, prototypes, design systems.",
    fulldesc: "Data-driven design that balances aesthetics with usability. We create wireframes, interactive prototypes, and maintainable design systems.",
    features: ["User research", "Wireframing", "Interactive prototypes", "Design systems"],
    color: "text-pink-500",
    popular: false,
  },
  {
    id: "responsive-design",
    icon: "smartphone",
    title: "Responsive Design",
    shortdesc: "One website, every device, perfect experience.",
    fulldesc: "Mobile-first responsive design that ensures your website looks and works flawlessly across every screen size and browser.",
    features: ["Mobile-first approach", "Cross-browser support", "Touch optimization", "Adaptive layouts"],
    color: "text-teal-500",
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-indigo-100 dark:bg-indigo-500/5" />
          <div className="absolute bottom-40 right-10 size-96 rounded-full bg-purple-100 dark:bg-purple-500/5" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border mb-6 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20">
              <Layers className="size-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                Comprehensive Solutions
              </span>
            </div>
            <h1 className="sr-only">
              The Bharat Digital: Premium Web Development Company that offers
              SEO Audit Tools, e-commerce solutions, IT support & much more for
              Businesses all over the world.
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Web &amp; IT Services That{" "}
              <span className="gradient-text">Drive Digital Success</span>
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-gray-400">
              From concept to deployment, we offer end-to-end solutions custom
              websites, web applications, e-commerce stores, performance
              optimization, UI/UX design, and IT consulting. Each service is
              delivered using modern frameworks and best practices.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-6 text-center">
                <stat.icon className="size-6 mx-auto mb-3 text-indigo-600 dark:text-indigo-400" />
                <div className="text-3xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {staticServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mb-20">
            <div className="text-center mb-12">
              <h4 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                Our <span className="gradient-text">Process</span>
              </h4>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-indigo-300 dark:from-indigo-500/50 to-transparent" />
                  )}
                  <div className="relative card-interactive p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="size-12 rounded border flex items-center justify-center bg-indigo-100 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30">
                        <item.icon className="size-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-4xl font-bold text-slate-200 dark:text-slate-700 group-hover:text-indigo-200 dark:group-hover:text-indigo-500/30 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h5 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                      {item.title}
                    </h5>
                    <p className="text-sm text-slate-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div className="relative px-6 py-16 md:py-20 text-center">
              <h6 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h6>
              <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Let&apos;s discuss how we can help transform your digital
                presence.
              </p>
              <Link
                href="/contactus"
                className="btn bg-white text-indigo-600 px-8 py-3.5 text-lg hover:bg-slate-100 inline-flex items-center gap-2"
              >
                Get Free Consultation
                <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        <FaqSection faqs={faqData["services"]} title="Services — FAQs" />
      </section>
    </>
  );
}

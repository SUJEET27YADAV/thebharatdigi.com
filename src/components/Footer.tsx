import Link from "next/link";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Phone, Mail, Globe, ArrowUpRight, Heart } from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "facebook",
    icon: <Facebook fontSize="large" />,
    href: "#",
  },
  {
    name: "linkedin",
    icon: <LinkedIn fontSize="large" />,
    href: "#",
  },
  {
    name: "instagram",
    icon: <Instagram fontSize="large" />,
    href: "#",
  },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/aboutus" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Privacy Policy", href: "/privacypolicy" },
  { label: "Terms and Conditions", href: "/termsandconditions" },
];

const SERVICE_LINKS = [
  "Web Development",
  "E-Commerce",
  "UI/UX Design",
  "IT Support & Troubleshooting",
  "System Security",
  "Remote IT Assistance",
];

export default function Footer() {
  return (
    <footer className="relative py-16 bg-slate-800 border-t border-slate-700 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" aria-hidden>
        <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />
      </div>

      {/* Background decorative orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex max-md:flex-col md:flex-wrap md:justify-between gap-12 mb-12">
          <div className="md:w-40 lg:w-70">
            <h3 className="text-2xl font-bold gradient-text mb-6">
              The Bharat Digital
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Transforming ideas into digital reality. Your trusted partner for
              web development & IT excellence, serving clients worldwide with
              precision.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-icon flex items-center justify-center size-10 rounded-lg border border-slate-700 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-150 text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-150 text-sm inline-flex items-center gap-1 group"
                  >
                    {service}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Contact Info
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="tel:+919999239307"
                  className="flex items-center gap-3 hover:text-indigo-400 transition-colors duration-150 group"
                >
                  <div className="relative size-8 rounded-lg bg-indigo-500/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-indigo-500/20">
                    <span className="absolute inset-0 rounded-lg bg-indigo-500 animate-[pulse-ring_2s_ease-out_infinite] opacity-20" aria-hidden />
                    <Phone size={14} className="text-indigo-400 relative z-10" />
                  </div>
                  <span className="text-sm">+91 99992 39307</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@thebharatdigi.com"
                  className="flex items-center gap-3 hover:text-indigo-400 transition-colors duration-150 group"
                >
                  <div className="size-8 rounded-lg bg-purple-500/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-purple-500/20">
                    <Mail size={14} className="text-purple-400" />
                  </div>
                  <span className="text-sm">support@thebharatdigi.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Globe size={14} className="text-pink-400" />
                </div>
                <span className="text-sm">Serving Globally</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom gradient divider */}
        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} The Bharat Digital. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="size-3.5 fill-red-500 text-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}

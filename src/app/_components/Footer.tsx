import Link from "next/link";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Phone, Mail, Globe } from "lucide-react";

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
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
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
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-icon flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors duration-200"
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
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-150 text-sm"
                  >
                    {link.label}
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
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-150 text-sm"
                  >
                    {service}
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
                  <Phone size={16} className="shrink-0 text-indigo-400 transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-sm">+91 99992 39307</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@thebharatdigi.com"
                  className="flex items-center gap-3 hover:text-indigo-400 transition-colors duration-150 group"
                >
                  <Mail size={16} className="shrink-0 text-indigo-400 transition-transform duration-200 group-hover:scale-110" />
                  <span className="text-sm">support@thebharatdigi.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="shrink-0 text-indigo-400" />
                <span className="text-sm">Serving Globally</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-gray-500 text-sm">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} The Bharat Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

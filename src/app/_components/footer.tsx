import React from "react";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Linkedin from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="py-16 bg-slate-800 border-t border-slate-700">
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
              {[
                {
                  icon: <Facebook fontSize="large" />,
                  className:
                    "text-blue-700 drop-shadow-xl drop-shadow-black/50",
                  href: "#",
                },
                {
                  icon: <Linkedin fontSize="large" />,
                  className:
                    "text-blue-900 drop-shadow-xl drop-shadow-black/50",
                  href: "#",
                },
                {
                  icon: <Instagram fontSize="large" />,
                  className:
                    "text-white bg-gradient-to-br from-red-600 via-indigo-600 via-[60%] to-yellow-300 to-[90%] rounded-xl drop-shadow-xl drop-shadow-black/50",
                  href: "#",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`${social.className} flex items-center justify-center hover:drop-shadow-black/80 transition-all duration-300`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Services",
                "About Us",
                "Portfolio",
                "Privacy Policy",
                "Terms and Conditions",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().split(" ").join("")}`}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Web Development",
                "E-Commerce",
                "UI/UX Design",
                "IT Support & Troubleshooting",
                "System Security",
                "Remote IT Assistance",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-3">
                <a href="tel:+919999239307">
                  <span className="text-indigo-400">📞</span>+91 99992 39307
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a href="mailto:tbdhelpcenter@gmail.com">
                  <span className="text-indigo-400">✉️</span>{" "}
                  tbdhelpcenter@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-indigo-400">🌍</span> Serving Globally
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} The Bharat Digital. All rights
            reserved. Made with ❤️ for clients worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const CustomCursor = dynamic(() => import("../components/CustomCursor"));
const ToastContainer = dynamic(() => import("../components/ToastProvider"));
const WhatsAppButton = dynamic(() => import("../components/WhatsAppButton"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Bharat Digital | Web Development, SEO & IT Company",
  description:
    "The Bharat Digital is a premium web development company that also offers e-commerce solutions, and IT support across the globe. 500+ projects delivered worldwide.",
  robots: "index, follow",
  metadataBase: new URL("https://thebharatdigi.com"),
  alternates: {
    canonical: "https://thebharatdigi.com",
  },
  openGraph: {
    title: "The Bharat Digital | Web Development, SEO & IT Company",
    description:
      "Premium Web Development Company that offers SEO, e-commerce solutions, IT support & much more across the globe. 500+ projects delivered worldwide.",
    url: "https://thebharatdigi.com",
    siteName: "The Bharat Digital",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://thebharatdigi.com/logo.png",
        width: 1200,
        height: 630,
        alt: "The Bharat Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bharat Digital | Web Development, SEO & IT Solutions Company",
    description:
      "Premium Web Development Company that offers SEO, e-commerce solutions, IT support & much more across the globe. 500+ projects delivered worldwide.",
    images: ["https://thebharatdigi.com/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MotionProvider>
            <CustomCursor />
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
          <WhatsAppButton />
          <ToastContainer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "The Bharat Digital",
            url: "https://thebharatdigi.com",
            logo: "https://thebharatdigi.com/logo.png",
            description:
              "Premium Web Development Company that offers SEO, e-commerce solutions, IT support & much more across the globe. 500+ projects delivered worldwide.",
            foundingDate: "2015",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1848, Ward-17, Arun Vihar, Sector -37",
              addressLocality: "Noida",
              addressRegion: "Uttar Pradesh",
              postalCode: "201301",
              addressCountry: "IN",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-9999239307",
              contactType: "sales",
              email: "support@thebharatdigi.com",
              availableLanguage: ["English", "Hindi"],
            },
            sameAs: ["https://thebharatdigi.com"],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "The Bharat Digital",
            url: "https://thebharatdigi.com",
            description:
              "Premium Web Development Company that offers SEO, e-commerce solutions, IT support & much more across the globe.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://thebharatdigi.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </body>
    </html>
  );
}

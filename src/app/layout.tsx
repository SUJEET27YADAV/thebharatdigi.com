import type { Metadata } from "next";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./_components/CustomCursor";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Bharat Digital | Web Development, SEO & IT Solutions",
  description:
    "The Bharat Digital offers premium web development, e-commerce solutions, and IT support across India and globally. 500+ projects delivered since 2015.",
  robots: "index, follow",
  metadataBase: new URL("https://thebharatdigi.com"),
  alternates: {
    canonical: "https://thebharatdigi.com",
  },
  openGraph: {
    title: "The Bharat Digital | Web Development, SEO & IT Solutions",
    description:
      "Premium web development, SEO audit tools, e-commerce solutions, and IT support. 500+ projects delivered worldwide since 2015.",
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
    title: "The Bharat Digital | Web Development & IT Solutions",
    description:
      "Premium web development, SEO audit tools, and IT solutions. 500+ projects delivered worldwide.",
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
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Bharat Digital",
              url: "https://thebharatdigi.com",
              logo: "https://thebharatdigi.com/logo.png",
              description:
                "Premium web development, SEO audit tools, e-commerce solutions, and IT support across India and globally.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9999239307",
                contactType: "sales",
                email: "support@thebharatdigi.com",
              },
              sameAs: ["https://thebharatdigi.com"],
            }),
          }}
        />
      </body>
    </html>
  );
}

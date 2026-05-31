import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const CustomCursor = dynamic(() => import("./_components/CustomCursor"));
const ToastContainer = dynamic(() =>
  import("react-toastify").then((m) => m.ToastContainer),
);

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
                "Premium Web Development Company that offers SEO, e-commerce solutions, IT support & much more across the globe. 500+ projects delivered worldwide.",
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

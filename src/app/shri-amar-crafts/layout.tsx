import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import StoreHeader from "@/components/shri-amar-crafts/StoreHeader";
import StoreFooter from "@/components/shri-amar-crafts/StoreFooter";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shri Amar Crafts | Handcrafted Indian Ethnic Wear — Amazon Prime FBA Store",
  description:
    "Official Amazon FBA Storefront for Shri Amar Crafts. Discover handcrafted pure cotton Anarkali kurta sets and lustrous viscose silk ensembles with Banarasi Jacquard dupattas, fulfilled fast by Amazon Prime.",
  keywords: [
    "Shri Amar Crafts",
    "Amazon FBA ethnic wear",
    "Anarkali Kurti Pant Dupatta set",
    "Banarasi Jacquard Dupatta set",
    "Indian ethnic wear Amazon Prime",
    "pure cotton anarkali kurti",
    "viscose silk kurta set",
  ],
  metadataBase: new URL("https://shriamarcrafts.thebharatdigi.com"),
  alternates: {
    canonical: "https://shriamarcrafts.thebharatdigi.com",
  },
  openGraph: {
    title: "Shri Amar Crafts | Handcrafted Indian Ethnic Fashion (Amazon Prime FBA)",
    description:
      "Regal Anarkali kurta sets and Banarasi silk ensembles delivered fast with Amazon Prime. 100% genuine handcrafted fabrics and 7-day hassle-free returns.",
    url: "https://shriamarcrafts.thebharatdigi.com",
    siteName: "Shri Amar Crafts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/shri-amar-crafts/am3-hc-30-maroon-front.jpg",
        width: 800,
        height: 1050,
        alt: "Shri Amar Crafts Women's Ethnic Collection",
      },
    ],
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} min-h-screen bg-[#FAF6F0] text-[#2C1810] font-sans antialiased selection:bg-[#6B1D2F] selection:text-[#FAF6F0]`}
    >
      <StoreHeader />
      <main id="main-content" className="bg-[#FAF6F0]">
        {children}
      </main>
      <StoreFooter />
    </div>
  );
}

import type { Metadata } from "next";
import Navbar from "@/app/_components/navbar";
import Footer from "@/app/_components/footer";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "./_components/CustomCursor";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
  title: "TBD | Premium Web Development &amp; IT Solutions",
  description:
    "The Bharat Digital | Premium Web Development &amp; IT Solutions",
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
        </ThemeProvider>
      </body>
    </html>
  );
}

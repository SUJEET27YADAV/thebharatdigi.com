import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Contact from "../components//Contact";
import Marquee from "../components/Marquee";

export const metadata: Metadata = {
  title: "The Bharat Digital | Web Development, SEO & IT Solutions Company",
  description:
    "The Bharat Digital is a premium web development & IT company. We offer SEO audit tools, e-commerce solutions, web development services & IT support. 500+ projects delivered worldwide.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
  );
}

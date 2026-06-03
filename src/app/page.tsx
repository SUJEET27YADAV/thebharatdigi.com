import type { Metadata } from "next";
import Hero from "@/app/_components/Hero";
import Services from "./_components/Services";
import About from "./_components/About";
import Portfolio from "./_components/Portfolio";
import Testimonials from "./_components/Testimonials";
import Contact from "./_components/Contact";
import Marquee from "./_components/Marquee";

export const metadata: Metadata = {
  title: "The Bharat Digital | Web Development, SEO & IT Solutions Company",
  description: "The Bharat Digital is a premium web development & IT company. We offer SEO audit tools, e-commerce solutions, web development services & IT support. 500+ projects delivered worldwide.",
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

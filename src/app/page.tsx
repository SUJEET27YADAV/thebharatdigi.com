import Hero from "@/app/_components/Hero";
import Services from "./_components/Services";
import About from "./_components/About";
import Portfolio from "./_components/Portfolio";
import Testimonials from "./_components/Testimonials";
import Contact from "./_components/Contact";
import Marquee from "./_components/Marquee";

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

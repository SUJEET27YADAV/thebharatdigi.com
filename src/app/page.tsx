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
      <h1 className="sr-only">
        The Bharat Digital — Premium Web Development, SEO Audit Tools & IT
        Solutions in India for Businesses all over the world.
      </h1>
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

import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Contact from "../components//Contact";
import Marquee from "../components/Marquee";
import { createServerClient } from "@/utils/supabase/server";
import { Project } from "@/types/types";

export const revalidate = 60; // Refresh projects every 60 seconds

export const metadata: Metadata = {
  title: "The Bharat Digital | Web Development, SEO & IT Solutions Company",
  description:
    "The Bharat Digital is a premium web development & IT company. We offer SEO audit tools, e-commerce solutions, web development services & IT support. 500+ projects delivered worldwide.",
};

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data;
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getFeaturedProjects();
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Portfolio initialProjects={projects} />
      <Testimonials />
      <Contact />
    </main>
  );
}

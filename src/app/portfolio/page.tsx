import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";
import { Project } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Portfolio | Web Development Projects | The Bharat Digital",
  description: "Explore our portfolio of web development projects across e-commerce, SaaS, healthcare, education, gaming, and IT solutions. 500+ projects delivered.",
};

export default async function Page() {
  let projects: Project[] = [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && !error) {
      projects = data;
    }
  } catch (error) {
    console.error("Error fetching projects for portfolio:", error);
  }

  return <PortfolioPage projects={projects} />;
}

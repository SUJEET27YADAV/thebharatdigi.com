import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";
import { Project } from "@/types/types";

export const metadata: Metadata = {
  title: "Portfolio | Web Development Projects | The Bharat Digital",
  description: "Explore our portfolio of web development projects across e-commerce, SaaS, healthcare, education, gaming, and IT solutions. 500+ projects delivered.",
};

export default async function Page() {
  let projects: Project[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/getProjects`, { cache: "no-store" });
    const result = await res.json();
    if (result.success) {
      projects = result.data.sort((a: Project, b: Project) =>
        b.created_at.localeCompare(a.created_at),
      );
    }
  } catch {}
  return <PortfolioPage projects={projects} />;
}

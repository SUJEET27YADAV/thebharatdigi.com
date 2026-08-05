import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPage";
import { Project } from "@/types/types";
import { fetchApiList } from "@/utils/api-fetch";

export const metadata: Metadata = {
  title: "Portfolio | Web Development Projects | The Bharat Digital",
  description: "Explore our portfolio of web development projects across e-commerce, SaaS, healthcare, education, gaming, and IT solutions. 500+ projects delivered.",
};

export default async function Page() {
  const projects = (await fetchApiList<Project>("/api/getProjects")).sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );
  return <PortfolioPage projects={projects} />;
}

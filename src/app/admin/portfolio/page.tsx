import type { Metadata } from "next";
import PortfolioManager from "./_components/PortfolioManager";
import { Project } from "@/types/types";
import { fetchApiList } from "@/utils/api-fetch";

export const metadata: Metadata = {
  title: "Portfolio | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  const projects = await fetchApiList<Project>("/api/getProjects");
  return <PortfolioManager projects={projects} />;
}

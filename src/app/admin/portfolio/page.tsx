import type { Metadata } from "next";
import PortfolioManager from "./_components/PortfolioManager";
import { Project } from "@/types/types";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Portfolio | Admin Panel | The Bharat Digital",
};

export default async function Page() {
  let projects: Project[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(`${baseUrl}/api/getProjects`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });
    if (response.ok) {
      const res = await response.json();
      if (res.success && Array.isArray(res.data)) {
        projects = res.data;
      }
    }
  } catch {}
  return <PortfolioManager projects={projects} />;
}

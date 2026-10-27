import { Project } from "@/types/types";

export const SHRI_AMAR_CRAFTS_PROJECT: Project = {
  id: "shri-amar-crafts-d2c",
  icon: "Sparkles",
  title: "Shri Amar Crafts",
  subtitle: "D2C Ethnic Storefront (Amazon FBA Integrated)",
  category: "E-Commerce",
  color: "linear-gradient(135deg, #6B1D2F 0%, #2A0B13 100%)",
  technologies: [
    "Next.js App Router",
    "Subdomain Routing",
    "Amazon FBA",
    "Tailwind CSS",
  ],
  year: "2026",
  featured: true,
  link: "https://shriamarcrafts.thebharatdigi.com",
  created_at: new Date().toISOString(),
};

export function withShriAmarCrafts(projects: Project[]): Project[] {
  const exists = projects.some(
    (p) =>
      p.id === SHRI_AMAR_CRAFTS_PROJECT.id ||
      p.title.toLowerCase().includes("shri amar crafts")
  );

  if (exists) {
    return projects;
  }

  return [SHRI_AMAR_CRAFTS_PROJECT, ...projects];
}

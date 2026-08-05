import { NextRequest } from "next/server";
import { adminInsert } from "@/utils/admin/crud";

export async function POST(req: NextRequest) {
  const { icon, title, subtitle, category, color, technologies, year, link, featured } =
    await req.json();
  return adminInsert(
    req,
    "projects",
    { icon, title, subtitle, category, color, technologies, year, link, featured },
    {
      error: "Error creating project.",
      notFound: "Project not created.",
      success: "Project created successfully.",
    },
  );
}

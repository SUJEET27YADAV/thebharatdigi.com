import { NextRequest } from "next/server";
import { adminUpdate } from "@/utils/admin/crud";

export async function POST(req: NextRequest) {
  const { id, icon, title, subtitle, category, color, technologies, year, link, featured } =
    await req.json();
  return adminUpdate(
    req,
    "projects",
    id,
    { icon, title, subtitle, category, color, technologies, year, link, featured },
    {
      error: "Error updating project.",
      notFound: "Project not found.",
      success: "Project updated successfully.",
    },
  );
}

import { adminFetch } from "@/utils/admin/crud";

export async function GET() {
  return adminFetch(null, "projects", {
    error: "Error fetching projects",
    empty: "No projects found",
    success: "Projects fetched successfully",
  });
}

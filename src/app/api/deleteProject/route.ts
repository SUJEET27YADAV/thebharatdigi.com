import { NextRequest } from "next/server";
import { adminDelete } from "@/utils/admin/crud";

export async function DELETE(req: NextRequest) {
  return adminDelete(req, "projects", {
    error: "Error deleting project.",
    notFound: "Project not found.",
    success: "Project deleted successfully.",
  });
}

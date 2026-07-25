import { NextRequest, NextResponse } from "next/server";
import { runPost } from "@/lib/social/post";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runPost();
    const successCount = result.platforms.filter((p) => p.success).length;
    const totalCount = result.platforms.length;

    console.log(
      `[Social Cron] Posted to ${successCount}/${totalCount} platforms. Topic: ${result.topicTitle}`
    );

    return NextResponse.json({
      success: true,
      message: `Posted to ${successCount}/${totalCount} platforms`,
      data: result,
    });
  } catch (error) {
    console.error("[Social Cron] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

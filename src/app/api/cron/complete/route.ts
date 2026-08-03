import { NextRequest, NextResponse } from "next/server";
import { completePost } from "@/lib/social/complete-post";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let jobId: string;
  try {
    const body = await req.json();
    jobId = body.jobId;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!jobId) {
    return NextResponse.json({ error: "jobId is required" }, { status: 400 });
  }

  try {
    const result = await completePost(jobId);

    if (result.alreadyPosted) {
      return NextResponse.json({ success: true, message: "Job already completed", data: result });
    }

    const successCount = result.platforms.filter((p) => p.success).length;
    const totalCount = result.platforms.length;

    console.log(
      `[Social Complete] Posted to ${successCount}/${totalCount} platforms. Topic: ${result.topicTitle}`
    );

    return NextResponse.json({
      success: true,
      message: `Posted to ${successCount}/${totalCount} platforms`,
      data: result,
    });
  } catch (error) {
    console.error("[Social Complete] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

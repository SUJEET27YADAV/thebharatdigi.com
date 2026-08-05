import { NextRequest, NextResponse } from "next/server";
import { planPost } from "@/lib/social/plan-post";
import { completePost } from "@/lib/social/complete-post";
import { isCronRequest } from "@/utils/cron";

export async function GET(req: NextRequest) {
  if (!isCronRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const plan = await planPost();

    if (!plan.imageJob) {
      const result = await completePost(plan.rowId);
      const successCount = result.platforms.filter((p) => p.success).length;
      const totalCount = result.platforms.length;

      console.log(
        `[Social Cron] Text-only post: ${successCount}/${totalCount} platforms. Topic: ${result.topicTitle}`
      );

      return NextResponse.json({
        success: true,
        message: `Posted text-only to ${successCount}/${totalCount} platforms`,
        data: result,
      });
    }

    console.log(
      `[Social Cron] Image job ${plan.imageJob.jobId} submitted for "${plan.topicTitle}"; posting completes on the next finalize cron`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Image job submitted; posting completes once the image is generated",
        data: {
          jobId: plan.rowId,
          sdJobId: plan.imageJob.jobId,
          topicTitle: plan.topicTitle,
        },
      },
      { status: 202 }
    );
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

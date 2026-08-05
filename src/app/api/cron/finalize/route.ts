import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { pollImageJob, uploadImageToSupabase } from "@/lib/social/sd-server";
import { completePost } from "@/lib/social/complete-post";

type ImageStatus =
  | "pending"
  | "image_ready"
  | "failed"
  | "text_only"
  | "posted"
  | "already_posted";

async function finishPendingImage(row: { id: string; job_id: string }): Promise<ImageStatus> {
  const poll = await pollImageJob(row.job_id);
  const supabase = createServerClient();

  if (poll.status === "queued" || poll.status === "generating") {
    return "pending";
  }

  if (poll.status === "completed") {
    if (!poll.imageBase64) throw new Error("sd-server job completed but returned no image");

    const imageUrl = await uploadImageToSupabase(
      Buffer.from(poll.imageBase64, "base64"),
      "image/png"
    );

    const { error } = await supabase
      .from("social_jobs")
      .update({
        status: "image_ready",
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (error) throw new Error(`DB update: ${error.message}`);

    console.log(`[Social Finalize] job ${row.job_id} -> image ready: ${imageUrl}`);
    return "image_ready";
  }

  if (poll.status === "failed" || poll.status === "cancelled") {
    const errorMessage = poll.error ?? poll.status;
    const { error } = await supabase
      .from("social_jobs")
      .update({
        status: "failed",
        error_message: errorMessage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", row.id);

    if (error) throw new Error(`DB update: ${error.message}`);

    console.error(`[Social Finalize] job ${row.job_id} -> ${poll.status}: ${errorMessage}`);
    return "failed";
  }

  throw new Error(`unknown sd-server job status: ${poll.status}`);
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    const { data: rows, error } = await supabase
      .from("social_jobs")
      .select("id, job_id, status")
      .in("status", ["pending", "image_ready", "failed", "text_only"])
      .order("created_at", { ascending: true })
      .limit(20);

    if (error) throw new Error(`Failed to fetch social jobs: ${error.message}`);

    const processed: { id: string; status: ImageStatus }[] = [];

    for (const row of rows || []) {
      try {
        let status: ImageStatus = row.status;

        if (status === "pending") {
          if (!row.job_id) continue;
          status = await finishPendingImage(row);
        }

        if (status === "image_ready" || status === "failed" || status === "text_only") {
          const result = await completePost(row.id);
          status = result.alreadyPosted ? "already_posted" : "posted";
          console.log(
            `[Social Finalize] job ${row.id} ${result.alreadyPosted ? "already posted" : "posted"} (${status})`
          );
        }

        processed.push({ id: row.id, status });
      } catch (err) {
        console.error(`[Social Finalize] row ${row.id} failed: ${err instanceof Error ? err.message : err}`);
      }
    }

    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error("[Social Finalize] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

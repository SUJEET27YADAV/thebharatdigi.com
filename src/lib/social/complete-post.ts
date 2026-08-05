import { createServerClient } from "@/utils/supabase/server";
import { postToFacebook } from "./facebook";
import { postToInstagram } from "./instagram";
import { postToLinkedIn } from "./linkedin";
import type { PlatformResult, PostResult } from "./post";

interface SocialJobRow {
  id: string;
  topic_id: string;
  topic_title: string;
  facebook_text: string;
  instagram_text: string;
  linkedin_text: string;
  facebook_hashtags: string[] | null;
  instagram_hashtags: string[] | null;
  linkedin_hashtags: string[] | null;
  image_url: string | null;
  status: string;
}

async function logPost(
  supabase: ReturnType<typeof createServerClient>,
  data: {
    platform: string;
    topic_id: string;
    caption: string;
    image_url: string | null;
    hashtags: string[];
    status: string;
    platform_post_id?: string;
    error_message?: string;
  }
) {
  await supabase.from("social_posts").insert({
    platform: data.platform,
    topic_id: data.topic_id,
    caption: data.caption,
    image_url: data.image_url,
    hashtags: data.hashtags,
    status: data.status,
    platform_post_id: data.platform_post_id || null,
    error_message: data.error_message || null,
    posted_at: data.status === "posted" ? new Date().toISOString() : null,
  });
}

export async function completePost(rowId: string): Promise<PostResult> {
  const supabase = createServerClient();

  const { data: job, error } = await supabase
    .from("social_jobs")
    .select("*")
    .eq("id", rowId)
    .single();

  if (error || !job) throw new Error(`Social job not found: ${error?.message || rowId}`);

  const row = job as SocialJobRow;

  if (row.status === "completed") {
    console.log(`[Social] Job ${rowId} already completed, skipping`);
    return {
      topicId: row.topic_id,
      topicTitle: row.topic_title,
      platforms: [],
      imageUrl: row.image_url,
      timestamp: new Date().toISOString(),
      alreadyPosted: true,
    };
  }

  const imageUrl = row.image_url;
  const platforms: PlatformResult[] = [];

  const facebookResult = await postToFacebook(row.facebook_text, imageUrl);
  platforms.push({ platform: "facebook", ...facebookResult });
  await logPost(supabase, {
    platform: "facebook",
    topic_id: row.topic_id,
    caption: row.facebook_text,
    image_url: imageUrl,
    hashtags: row.facebook_hashtags || [],
    status: facebookResult.success ? "posted" : "failed",
    platform_post_id: facebookResult.postId,
    error_message: facebookResult.error,
  });

  if (process.env.INSTAGRAM_ACCOUNT_ID) {
    if (imageUrl) {
      const instagramResult = await postToInstagram(row.instagram_text, imageUrl);
      platforms.push({ platform: "instagram", ...instagramResult });
      await logPost(supabase, {
        platform: "instagram",
        topic_id: row.topic_id,
        caption: row.instagram_text,
        image_url: imageUrl,
        hashtags: row.instagram_hashtags || [],
        status: instagramResult.success ? "posted" : "failed",
        platform_post_id: instagramResult.mediaId,
        error_message: instagramResult.error,
      });
    } else {
      platforms.push({
        platform: "instagram",
        success: false,
        error: "Skipped: no image (Instagram requires an image)",
      });
    }
  } else {
    platforms.push({
      platform: "instagram",
      success: false,
      error: "INSTAGRAM_ACCOUNT_ID not configured",
    });
  }

  if (process.env.LINKEDIN_ACCESS_TOKEN) {
    const linkedinResult = await postToLinkedIn(row.linkedin_text, imageUrl || undefined);
    platforms.push({ platform: "linkedin", ...linkedinResult });
    await logPost(supabase, {
      platform: "linkedin",
      topic_id: row.topic_id,
      caption: row.linkedin_text,
      image_url: imageUrl,
      hashtags: row.linkedin_hashtags || [],
      status: linkedinResult.success ? "posted" : "failed",
      platform_post_id: linkedinResult.postId,
      error_message: linkedinResult.error,
    });
  } else {
    platforms.push({
      platform: "linkedin",
      success: false,
      error: "LINKEDIN_ACCESS_TOKEN not configured",
    });
  }

  const allSuccess = platforms.every((p) => p.success);

  await supabase
    .from("social_jobs")
    .update({
      status: "completed",
      posted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      error_message: allSuccess
        ? null
        : platforms
            .flatMap((p) =>
              p.success ? [] : [`${p.platform}: ${p.error}`],
            )
            .join("; "),
    })
    .eq("id", rowId);

  return {
    topicId: row.topic_id,
    topicTitle: row.topic_title,
    platforms,
    imageUrl,
    timestamp: new Date().toISOString(),
  };
}

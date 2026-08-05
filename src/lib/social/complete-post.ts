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

type SupabaseClient = ReturnType<typeof createServerClient>;

type PlatformPostResult = { success: boolean; postId?: string; error?: string };

interface PlatformConfig {
  name: string;
  caption: string;
  hashtags: string[];
  canPost: () => { ok: boolean; reason?: string };
  post: () => Promise<PlatformPostResult>;
}

async function logPost(
  supabase: SupabaseClient,
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

async function postAndLog(
  supabase: SupabaseClient,
  row: SocialJobRow,
  config: PlatformConfig,
): Promise<PlatformResult> {
  const gate = config.canPost();
  if (!gate.ok) {
    return { platform: config.name, success: false, error: gate.reason };
  }

  const result = await config.post();
  await logPost(supabase, {
    platform: config.name,
    topic_id: row.topic_id,
    caption: config.caption,
    image_url: row.image_url,
    hashtags: config.hashtags,
    status: result.success ? "posted" : "failed",
    platform_post_id: result.postId,
    error_message: result.error,
  });
  return { platform: config.name, ...result };
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
  const platformConfigs: PlatformConfig[] = [
    {
      name: "facebook",
      caption: row.facebook_text,
      hashtags: row.facebook_hashtags || [],
      canPost: () => ({ ok: true }),
      post: () => postToFacebook(row.facebook_text, imageUrl),
    },
    {
      name: "instagram",
      caption: row.instagram_text,
      hashtags: row.instagram_hashtags || [],
      canPost: () => {
        if (!process.env.INSTAGRAM_ACCOUNT_ID) {
          return { ok: false, reason: "INSTAGRAM_ACCOUNT_ID not configured" };
        }
        if (!imageUrl) {
          return {
            ok: false,
            reason: "Skipped: no image (Instagram requires an image)",
          };
        }
        return { ok: true };
      },
      post: () => postToInstagram(row.instagram_text, imageUrl!),
    },
    {
      name: "linkedin",
      caption: row.linkedin_text,
      hashtags: row.linkedin_hashtags || [],
      canPost: () =>
        process.env.LINKEDIN_ACCESS_TOKEN
          ? { ok: true }
          : { ok: false, reason: "LINKEDIN_ACCESS_TOKEN not configured" },
      post: () => postToLinkedIn(row.linkedin_text, imageUrl || undefined),
    },
  ];

  const platforms: PlatformResult[] = await Promise.all(
    platformConfigs.map((config) => postAndLog(supabase, row, config)),
  );

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

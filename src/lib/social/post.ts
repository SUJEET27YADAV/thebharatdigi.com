import { createServerClient } from "@/utils/supabase/server";
import { getRandomTopic, ALL_TOPICS, type ContentTopic } from "./topics";
import { generatePostText } from "./generate-text";
import { generateImage } from "./generate-image";
import { postToFacebook } from "./facebook";
import { postToInstagram } from "./instagram";
import { postToLinkedIn } from "./linkedin";

export interface PlatformResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
}

export interface PostResult {
  topicId: string;
  topicTitle: string;
  platforms: PlatformResult[];
  imageUrl: string;
  timestamp: string;
}

async function getRecentTopicIds(supabase: ReturnType<typeof createServerClient>): Promise<string[]> {
  const { data } = await supabase
    .from("social_posts")
    .select("topic_id")
    .order("created_at", { ascending: false })
    .limit(10);

  return (data || []).map((row: { topic_id: string }) => row.topic_id);
}

async function pickTopic(supabase: ReturnType<typeof createServerClient>): Promise<ContentTopic> {
  const recentIds = await getRecentTopicIds(supabase);
  return getRandomTopic(recentIds);
}

async function logPost(
  supabase: ReturnType<typeof createServerClient>,
  data: {
    platform: string;
    topic_id: string;
    caption: string;
    image_url: string;
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

export async function runPost(): Promise<PostResult> {
  const supabase = createServerClient();
  const topic = await pickTopic(supabase);

  console.log(`[Social] Topic selected: ${topic.title} (${topic.id})`);

  const [facebookText, instagramText, linkedinText] = await Promise.all([
    generatePostText(topic, "facebook"),
    generatePostText(topic, "instagram"),
    generatePostText(topic, "linkedin"),
  ]);

  console.log("[Social] Text generated for all platforms");

  const image = await generateImage(topic);
  console.log(`[Social] Image generated: ${image.url.substring(0, 80)}...`);

  const platforms: PlatformResult[] = [];

  const facebookResult = await postToFacebook(facebookText.caption, image.url);
  platforms.push({ platform: "facebook", ...facebookResult });
  await logPost(supabase, {
    platform: "facebook",
    topic_id: topic.id,
    caption: facebookText.caption,
    image_url: image.url,
    hashtags: facebookText.hashtags,
    status: facebookResult.success ? "posted" : "failed",
    platform_post_id: facebookResult.postId,
    error_message: facebookResult.error,
  });

  if (process.env.INSTAGRAM_ACCOUNT_ID) {
    const instagramResult = await postToInstagram(instagramText.caption, image.url);
    platforms.push({ platform: "instagram", ...instagramResult });
    await logPost(supabase, {
      platform: "instagram",
      topic_id: topic.id,
      caption: instagramText.caption,
      image_url: image.url,
      hashtags: instagramText.hashtags,
      status: instagramResult.success ? "posted" : "failed",
      platform_post_id: instagramResult.mediaId,
      error_message: instagramResult.error,
    });
  } else {
    platforms.push({
      platform: "instagram",
      success: false,
      error: "INSTAGRAM_ACCOUNT_ID not configured",
    });
  }

  if (process.env.LINKEDIN_ACCESS_TOKEN) {
    const linkedinResult = await postToLinkedIn(linkedinText.caption, image.url);
    platforms.push({ platform: "linkedin", ...linkedinResult });
    await logPost(supabase, {
      platform: "linkedin",
      topic_id: topic.id,
      caption: linkedinText.caption,
      image_url: image.url,
      hashtags: linkedinText.hashtags,
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

  return {
    topicId: topic.id,
    topicTitle: topic.title,
    platforms,
    imageUrl: image.url,
    timestamp: new Date().toISOString(),
  };
}

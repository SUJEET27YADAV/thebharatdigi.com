import { createServerClient } from "@/utils/supabase/server";
import { getRandomTopic } from "./topics";
import { generatePostText } from "./generate-text";
import { submitImageJob, type ImageJobHandle } from "./sd-server";

export interface PlannedPost {
  rowId: string;
  topicId: string;
  topicTitle: string;
  imageJob?: ImageJobHandle;
}

export async function planPost(): Promise<PlannedPost> {
  const supabase = createServerClient();

  const { data: recent } = await supabase
    .from("social_posts")
    .select("topic_id")
    .order("created_at", { ascending: false })
    .limit(10);

  const recentIds = (recent || []).map((row: { topic_id: string }) => row.topic_id);
  const topic = getRandomTopic(recentIds);

  console.log(`[Social] Topic selected: ${topic.title} (${topic.id})`);

  const [facebookText, instagramText, linkedinText] = await Promise.all([
    generatePostText(topic, "facebook"),
    generatePostText(topic, "instagram"),
    generatePostText(topic, "linkedin"),
  ]);

  console.log("[Social] Text generated for all platforms");

  let imageJob: ImageJobHandle | undefined;
  try {
    imageJob = await submitImageJob(topic);
    console.log(`[Social] Image job submitted: ${imageJob.jobId}`);
  } catch (error) {
    console.warn("[Social] Image job submission failed, will post text-only:", error);
  }

  const { data, error } = await supabase
    .from("social_jobs")
    .insert({
      job_id: imageJob?.jobId ?? null,
      topic_id: topic.id,
      topic_title: topic.title,
      facebook_text: facebookText.caption,
      instagram_text: instagramText.caption,
      linkedin_text: linkedinText.caption,
      facebook_hashtags: facebookText.hashtags,
      instagram_hashtags: instagramText.hashtags,
      linkedin_hashtags: linkedinText.hashtags,
      status: imageJob ? "pending" : "text_only",
      error_message: imageJob ? null : "Image job submission failed, posting without image",
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Failed to record social job: ${error?.message || "no row returned"}`);
  }

  return { rowId: data.id, topicId: topic.id, topicTitle: topic.title, imageJob };
}

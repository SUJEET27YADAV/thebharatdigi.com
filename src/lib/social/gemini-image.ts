import type { ContentTopic } from "./topics";
import { createServerClient } from "@/utils/supabase/server";

interface GeminiImageResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        inlineData?: { mimeType?: string; data?: string };
      }>;
    };
  }>;
}

function buildGeminiImagePrompt(topic: ContentTopic): string {
  return `Create a professional marketing image for a web development and IT company.
Scene: ${topic.imagePromptBase}.
Context: ${topic.description}.
Style: professional corporate photography, clean modern design aesthetic, sharp focus, well-lit with soft diffused lighting, cinematic color grading, photorealistic, 8K resolution, highly detailed.
No text overlays. If any text appears, it must be in English only.`;
}

export async function generateImageGemini(topic: ContentTopic): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const prompt = buildGeminiImagePrompt(topic);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
          imageConfig: { aspectRatio: "1:1" },
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini image API error ${response.status}: ${err}`);
  }

  const data: GeminiImageResponse = await response.json();
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  const inlineData = part?.inlineData;

  if (!inlineData?.data) throw new Error("Gemini returned no image data");

  const buffer = Buffer.from(inlineData.data, "base64");
  const mimeType = inlineData.mimeType || "image/png";

  return uploadToSupabase(buffer, mimeType);
}

async function uploadToSupabase(buffer: Buffer, mimeType: string): Promise<string> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL not set");

  const supabase = createServerClient();
  const extension = mimeType === "image/jpeg" ? "jpg" : "png";
  const path = `social/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await supabase.storage
    .from("social-images")
    .upload(path, buffer, { contentType: mimeType, upsert: false });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  return `${supabaseUrl}/storage/v1/object/public/social-images/${path}`;
}

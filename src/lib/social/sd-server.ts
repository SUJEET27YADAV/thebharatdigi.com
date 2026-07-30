import type { ContentTopic } from "./topics";

function buildRichPrompt(topic: ContentTopic): string {
  const styles = [
    "professional corporate photography style",
    "clean modern design aesthetic",
    "sharp focus with shallow depth of field",
    "well-lit scene with soft diffused lighting",
    "cinematic grading with teal and orange tones",
    "8K resolution, highly detailed, photorealistic",
  ];

  const negative = "blurry, low quality, distorted, text in any language other than English, Hindi text, Arabic text, Chinese text, non-English text, watermark, signature, logo, brand name, ugly, deformed, bad anatomy";

  return `${topic.imagePromptBase}. ${topic.description}. Only English text if any text is present. High end professional marketing visual for a web development company. ${styles.join(", ")} --negative ${negative}`;
}

interface SdServerResponse {
  data?: Array<{ url?: string }>;
}

export async function generateImageSdServer(topic: ContentTopic): Promise<string> {
  const serverUrl = process.env.SD_SERVER_URL;
  if (!serverUrl) throw new Error("SD_SERVER_URL not set");

  const prompt = buildRichPrompt(topic);

  const response = await fetch(`${serverUrl.replace(/\/$/, "")}/v1/images/generations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "1200x675",
      response_format: "url",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`sd-server API error ${response.status}: ${err}`);
  }

  const data: SdServerResponse = await response.json();
  const imageUrl = data.data?.[0]?.url;

  if (!imageUrl) throw new Error("sd-server returned no image URL");

  const baseUrl = serverUrl.replace(/\/$/, "");
  const urlObj = new URL(imageUrl);

  if (urlObj.hostname === "localhost" || urlObj.hostname === "127.0.0.1") {
    return `${baseUrl}${urlObj.pathname}`;
  }

  return imageUrl;
}

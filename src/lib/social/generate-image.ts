import { buildImagePrompt } from "./templates";
import type { ContentTopic } from "./topics";

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

function encodePrompt(prompt: string): string {
  return encodeURIComponent(prompt.replace(/\s+/g, " ").trim());
}

export async function generateImage(topic: ContentTopic): Promise<GeneratedImage> {
  const prompt = buildImagePrompt(topic);
  const encoded = encodePrompt(prompt);

  const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&seed=${Date.now()}&nologo=true&enhance=true`;

  const response = await fetch(imageUrl, {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Pollinations image generation failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.startsWith("image/")) {
    throw new Error(`Pollinations returned non-image content: ${contentType}`);
  }

  return {
    url: imageUrl,
    width: 1200,
    height: 675,
  };
}

export async function generateImageAsBuffer(topic: ContentTopic): Promise<{
  buffer: Buffer;
  contentType: string;
}> {
  const prompt = buildImagePrompt(topic);
  const encoded = encodePrompt(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&seed=${Date.now()}&nologo=true&enhance=true`;

  const response = await fetch(imageUrl, { redirect: "follow" });

  if (!response.ok) {
    throw new Error(`Pollinations image generation failed: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const contentType = response.headers.get("content-type") || "image/jpeg";

  return { buffer, contentType };
}

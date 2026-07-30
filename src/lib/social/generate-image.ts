import { buildImagePrompt } from "./templates";
import type { ContentTopic } from "./topics";
import { generateImageSdServer } from "./sd-server";

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

function encodePrompt(prompt: string): string {
  return encodeURIComponent(prompt.replace(/\s+/g, " ").trim());
}

async function tryPollinations(prompt: string, width: number, height: number): Promise<string> {
  const encoded = encodePrompt(prompt);
  const seed = Math.floor(Math.random() * 100000);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentType = response.headers.get("content-type");
    if (!contentType?.startsWith("image/")) throw new Error(`Not an image: ${contentType}`);

    return url;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export async function generateImage(topic: ContentTopic): Promise<GeneratedImage> {
  const prompt = buildImagePrompt(topic);

  try {
    const url = await tryPollinations(prompt, 1200, 675);
    return { url, width: 1200, height: 675 };
  } catch (error) {
    console.warn(`[Image] Pollinations failed: ${error instanceof Error ? error.message : error}`);
  }

  try {
    const url = await generateImageSdServer(topic);
    return { url, width: 1200, height: 675 };
  } catch (error) {
    throw new Error(`Image generation failed — ${error instanceof Error ? error.message : error}`);
  }
}

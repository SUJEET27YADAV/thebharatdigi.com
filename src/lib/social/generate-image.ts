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

  const simplifiedPrompts = [
    prompt,
    `${topic.title}, digital technology, professional, modern`,
    `technology office, clean design, professional`,
  ];

  let lastError: Error | null = null;
  for (const p of simplifiedPrompts) {
    try {
      const url = await tryPollinations(p, 1200, 675);
      return { url, width: 1200, height: 675 };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[Image] Prompt failed, trying simpler: ${lastError.message}`);
    }
  }

  throw new Error(`All image generation attempts failed. Last error: ${lastError?.message}`);
}

export async function generateImageAsBuffer(topic: ContentTopic): Promise<{
  buffer: Buffer;
  contentType: string;
}> {
  const prompt = buildImagePrompt(topic);
  const encoded = encodePrompt(prompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&seed=${Math.floor(Math.random() * 100000)}&nologo=true`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`Pollinations failed: ${response.status}`);

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return { buffer, contentType };
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

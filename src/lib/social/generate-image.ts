import type { ContentTopic } from "./topics";
import { generateImageGemini } from "./gemini-image";
import { generateImageSdServer } from "./sd-server";

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
}

export async function generateImage(topic: ContentTopic): Promise<GeneratedImage> {
  try {
    const url = await generateImageGemini(topic);
    return { url, width: 1080, height: 1080 };
  } catch (error) {
    console.warn(`[Image] Gemini failed: ${error instanceof Error ? error.message : error}`);
  }

  try {
    const url = await generateImageSdServer(topic);
    return { url, width: 1080, height: 1080 };
  } catch (error) {
    throw new Error(`Image generation failed — ${error instanceof Error ? error.message : error}`);
  }
}

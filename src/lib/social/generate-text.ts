import type { ContentTopic } from "./topics";
import { buildTextPrompt, adaptForPlatform, generateHashtags } from "./templates";

export interface GeneratedText {
  caption: string;
  hashtags: string[];
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await sleep(5000 * attempt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topP: 0.9,
            maxOutputTokens: 2000,
          },
        }),
      }
    );

    if (response.status === 429) {
      console.warn(`[Social] Gemini rate limited, retrying (attempt ${attempt + 2}/3)...`);
      continue;
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${err}`);
    }

    const data: GeminiResponse = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Gemini returned empty response");
    return text;
  }

  throw new Error("Gemini rate limited after 3 retries");
}

export async function generatePostText(
  topic: ContentTopic,
  platform: "facebook" | "instagram" | "linkedin"
): Promise<GeneratedText> {
  const prompt = buildTextPrompt(topic, platform);
  const rawText = await callGemini(prompt);

  const cleanedText = rawText
    .replace(/^["']|["']$/g, "")
    .replace(/^Post[:\s]*/i, "")
    .trim();

  const adapted = adaptForPlatform(cleanedText, platform);
  const hashtags = generateHashtags(topic);

  return { caption: adapted, hashtags };
}

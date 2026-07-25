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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            topP: 0.9,
            maxOutputTokens: 500,
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

async function callPollinationsText(prompt: string): Promise<string> {
  const response = await fetch("https://text.pollinations.ai/openai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [{ role: "user", content: prompt }],
      seed: Math.floor(Math.random() * 100000),
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Pollinations text API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text || text.length < 10) throw new Error("Pollinations returned empty response");
  return text;
}

async function generateWithFallback(prompt: string): Promise<string> {
  const errors: string[] = [];

  try {
    return await callGemini(prompt);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn("[Social] Gemini failed:", msg);
    errors.push(`Gemini: ${msg}`);
  }

  try {
    return await callPollinationsText(prompt);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn("[Social] Pollinations text failed:", msg);
    errors.push(`Pollinations: ${msg}`);
  }

  throw new Error(`All AI text providers failed — ${errors.join(" | ")}`);
}

export async function generatePostText(
  topic: ContentTopic,
  platform: "facebook" | "instagram" | "linkedin"
): Promise<GeneratedText> {
  const prompt = buildTextPrompt(topic, platform);
  const rawText = await generateWithFallback(prompt);

  const cleanedText = rawText
    .replace(/^["']|["']$/g, "")
    .replace(/^Post[:\s]*/i, "")
    .trim();

  const adapted = adaptForPlatform(cleanedText, platform);
  const hashtags = generateHashtags(topic);

  return { caption: adapted, hashtags };
}

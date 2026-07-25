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

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

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

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data: GeminiResponse = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini returned empty response");
  return text;
}

async function callDeepSeek(prompt: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY not set");

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("DeepSeek returned empty response");
  return text;
}

async function generateWithFallback(prompt: string): Promise<string> {
  try {
    return await callGemini(prompt);
  } catch (geminiError) {
    console.warn("[Social] Gemini failed, trying DeepSeek:", geminiError);
    try {
      return await callDeepSeek(prompt);
    } catch (deepseekError) {
      console.error("[Social] Both AI providers failed:", { geminiError, deepseekError });
      throw new Error("All AI text providers failed");
    }
  }
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

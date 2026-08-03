import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import type { ContentTopic } from "./topics";
import { createServerClient } from "@/utils/supabase/server";

function buildRichPrompt(topic: ContentTopic): string {
  const styles = [
    "professional corporate photography style",
    "clean modern design aesthetic",
    "sharp focus with shallow depth of field",
    "well-lit scene with soft diffused lighting",
    "cinematic grading with teal and orange tones",
    "4K resolution, highly detailed, photorealistic",
  ];

  return `${topic.imagePromptBase}. ${topic.description}. Only English text if any text is present. High end professional marketing visual for a web development company. ${styles.join(", ")}`;
}

const NEGATIVE_PROMPT =
  "blurry, low quality, distorted, text in any language other than English, Hindi text, Arabic text, Chinese text, non-English text, watermark, signature, logo, brand name, ugly, deformed, bad anatomy";

const REQUEST_TIMEOUT_MS = 600000;

function requestJson(
  method: "GET" | "POST",
  url: string,
  body?: unknown
): Promise<{ status: number; body: string }> {
  const target = new URL(url);
  const client = target.protocol === "https:" ? httpsRequest : httpRequest;

  const payload = body === undefined ? null : JSON.stringify(body);

  return new Promise((resolve, reject) => {
    const req = client(
      {
        hostname: target.hostname,
        port: target.port,
        path: `${target.pathname}${target.search}`,
        method,
        headers: {
          ...(payload !== null && {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload),
          }),
        },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode ?? 0, body: data }));
      },
    );

    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error(`sd-server request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    req.on("error", reject);
    if (payload !== null) req.write(payload);
    req.end();
  });
}

function serverBaseUrl(): string {
  const serverUrl = process.env.SD_SERVER_URL;
  if (!serverUrl) throw new Error("SD_SERVER_URL not set");
  return serverUrl.replace(/\/$/, "");
}

export interface ImageJobHandle {
  jobId: string;
  pollUrl: string;
}

export type ImageJobStatus = "queued" | "generating" | "completed" | "failed" | "cancelled";

export interface ImageJobPoll {
  status: ImageJobStatus;
  imageBase64?: string;
  error?: string;
}

export async function submitImageJob(topic: ContentTopic): Promise<ImageJobHandle> {
  const { status, body } = await requestJson("POST", `${serverBaseUrl()}/sdcpp/v1/img_gen`, {
    prompt: buildRichPrompt(topic),
    negative_prompt: NEGATIVE_PROMPT,
    width: 1080,
    height: 1080,
    sample_params: {
      sample_steps: 12,
      guidance: { txt_cfg: 7 },
    },
  });

  if (status < 200 || status >= 300) {
    throw new Error(`sd-server submit error ${status}: ${body.slice(0, 500)}`);
  }

  const data = JSON.parse(body) as { id?: string; poll_url?: string };
  if (!data.id || !data.poll_url) {
    throw new Error(`sd-server submit returned no job: ${body.slice(0, 500)}`);
  }

  return { jobId: data.id, pollUrl: data.poll_url };
}

export async function pollImageJob(jobId: string, baseUrl?: string): Promise<ImageJobPoll> {
  const base = baseUrl ? baseUrl.replace(/\/$/, "") : serverBaseUrl();
  const { status, body } = await requestJson("GET", `${base}/sdcpp/v1/jobs/${jobId}`);

  if (status < 200 || status >= 300) {
    throw new Error(`sd-server poll error ${status}: ${body.slice(0, 500)}`);
  }

  const data = JSON.parse(body) as {
    status?: string;
    error?: unknown;
    result?: { images?: Array<{ b64_json?: string }> };
  };

  switch (data.status) {
    case "completed":
      return { status: "completed", imageBase64: data.result?.images?.[0]?.b64_json };
    case "failed":
    case "cancelled":
      return {
        status: data.status,
        error: data.error ? JSON.stringify(data.error) : undefined,
      };
    case "queued":
    case "generating":
      return { status: data.status };
    default:
      throw new Error(`sd-server job unknown status: ${JSON.stringify(data).slice(0, 500)}`);
  }
}

export async function generateImageSdServer(topic: ContentTopic): Promise<string> {
  const { jobId } = await submitImageJob(topic);

  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const poll = await pollImageJob(jobId);

    if (poll.status === "completed" && poll.imageBase64) {
      return uploadImageToSupabase(Buffer.from(poll.imageBase64, "base64"), "image/png");
    }
    if (poll.status === "failed" || poll.status === "cancelled") {
      throw new Error(`sd-server generation ${poll.status}: ${poll.error || "unknown error"}`);
    }
  }
}

export async function uploadImageToSupabase(buffer: Buffer, mimeType: string): Promise<string> {
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

import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import type { ContentTopic } from "./topics";
import { createServerClient } from "@/utils/supabase/server";

const BRAND_NAME = "The Bharat Digital";

// Core styling fine-tuned for DreamShaper 8 to render high-converting social ad graphics
const MARKETING_BANNER_STYLE =
  "professional digital marketing ad poster design, corporate banner layout, clean graphic background, " +
  "3D glossy vector icons floating, modern laptop and smartphone mockup displaying colorful UI dashboard, " +
  "infographic badge elements, high contrast studio lighting, vibrant tech colors, bold stylized graphic typography artwork, 8k resolution, crisp detail";

// Filter out artifacts common in SD1.5, but allow clean graphic/vector elements
const NEGATIVE_PROMPT =
  "garbled small text, messy handwriting, microtext, low resolution, blurry, dark messy background, " +
  "deformed hands, distorted fingers, ugly faces, photorealistic skin pores, realistic photography, " +
  "oversaturated noise, cluttered composition, cropped header, non-English text, Hindi text, Arabic text";

interface BannerPromptConfig {
  headlineText: string;
  visualSubject: string;
  floatingIcons: string;
}

/**
 * Maps each topic ID to dynamic headlines, 3D devices, and floating icons
 * matching high-converting ad formats.
 */
function getTopicBannerConfig(topic: ContentTopic): BannerPromptConfig {
  const configs: Record<string, BannerPromptConfig> = {
    "mvp-development": {
      headlineText: '"LAUNCH FAST"',
      visualSubject:
        "sleek modern laptop showing a startup product launch analytics dashboard",
      floatingIcons:
        "floating 3D rocket icon, target icon, and glowing checkmark badges",
    },
    "ai-development": {
      headlineText: '"AI POWERED"',
      visualSubject:
        "futuristic tablet display showing neural network node diagrams and AI automation UI",
      floatingIcons:
        "floating glossy 3D brain icon, glowing AI chat bubble, and data chip icons",
    },
    automation: {
      headlineText: '"AUTOMATE"',
      visualSubject:
        "digital workspace with floating workflow chart cards and automated task connections",
      floatingIcons:
        "floating 3D gear icons, speed clock badge, and connected node icons",
    },
    ecommerce: {
      headlineText: '"BOOST SALES"',
      visualSubject:
        "smartphone mockup displaying a vibrant online store product page with green buy button",
      floatingIcons:
        "floating glossy 3D shopping cart icon, discount badge, and credit card icon",
    },
    "seo-marketing": {
      headlineText: '"RANK #1"',
      visualSubject:
        "desktop monitor screen showing rising organic traffic line graph and search engine UI",
      floatingIcons:
        "floating 3D Google logo icon, magnifying glass badge, and rising arrow graph",
    },
    "mobile-apps": {
      headlineText: '"APP GROWTH"',
      visualSubject:
        "two modern smartphones displaying colorful iOS and Android app user interfaces side by side",
      floatingIcons:
        "floating glossy 3D star rating badge, mobile app icons, and notification bell",
    },
    "custom-web": {
      headlineText: '"WEB DESIGN"',
      visualSubject:
        "clean desk setup with ultra-wide monitor rendering a modern responsive business website",
      floatingIcons:
        "floating 3D code tag icons, security shield badge, and lightning speed icon",
    },
    performance: {
      headlineText: '"3X SPEED"',
      visualSubject:
        "dashboard display showing 100/100 Core Web Vitals speed score and instant page load speedometer",
      floatingIcons:
        "floating 3D lightning bolt icon, fast forward badge, and stopwatch",
    },
    "web-apps": {
      headlineText: '"SCALE NOW"',
      visualSubject:
        "SaaS platform web app dashboard displayed on a sleek tablet with interactive chart cards",
      floatingIcons:
        "floating glossy 3D cloud icon, user growth badge, and database icon",
    },
    uiux: {
      headlineText: '"UI/UX DESIGN"',
      visualSubject:
        "Figma style design interface canvas with wireframe cards and sleek mobile app layouts",
      floatingIcons:
        "floating 3D stylus pen, color palette badge, and heart reaction icon",
    },
  };

  return (
    configs[topic.id] || {
      headlineText: '"DIGITAL GROWTH"',
      visualSubject: `modern laptop and smartphone displaying sleek IT company website for ${topic.title}`,
      floatingIcons:
        "floating 3D web icon, phone icon, and verified checkmark badge",
    }
  );
}

function buildRichPrompt(topic: ContentTopic): string {
  const config = getTopicBannerConfig(topic);

  return (
    `Marketing poster ad for ${BRAND_NAME}. ` +
    `Bold stylized text reading ${config.headlineText} in dynamic 3D typography art at top. ` +
    `Main scene features ${config.visualSubject}. ` +
    `Accented with ${config.floatingIcons} around the layout. ` +
    `Includes clean white infographic service cards and rounded call-to-action badges at the bottom. ` +
    `${MARKETING_BANNER_STYLE}`
  ).trim();
}

const REQUEST_TIMEOUT_MS = 600000;

function requestJson(
  method: "GET" | "POST",
  url: string,
  body?: unknown,
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
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 0, body: data }),
        );
      },
    );

    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(
        new Error(`sd-server request timed out after ${REQUEST_TIMEOUT_MS}ms`),
      );
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

export type ImageJobStatus =
  | "queued"
  | "generating"
  | "completed"
  | "failed"
  | "cancelled";

export interface ImageJobPoll {
  status: ImageJobStatus;
  imageBase64?: string;
  error?: string;
}

export async function submitImageJob(
  topic: ContentTopic,
): Promise<ImageJobHandle> {
  const { status, body } = await requestJson(
    "POST",
    `${serverBaseUrl()}/sdcpp/v1/img_gen`,
    {
      prompt: buildRichPrompt(topic),
      negative_prompt: NEGATIVE_PROMPT,
      width: 1080,
      height: 1080,
      sample_params: {
        // Increased to 22 steps for sharper vector icons and cleaner typography art
        sample_steps: 22,
        guidance: { txt_cfg: 7.5 },
      },
    },
  );

  if (status < 200 || status >= 300) {
    throw new Error(`sd-server submit error ${status}: ${body.slice(0, 500)}`);
  }

  const data = JSON.parse(body) as { id?: string; poll_url?: string };
  if (!data.id || !data.poll_url) {
    throw new Error(`sd-server submit returned no job: ${body.slice(0, 500)}`);
  }

  return { jobId: data.id, pollUrl: data.poll_url };
}

export async function pollImageJob(
  jobId: string,
  baseUrl?: string,
): Promise<ImageJobPoll> {
  const base = baseUrl ? baseUrl.replace(/\/$/, "") : serverBaseUrl();
  const { status, body } = await requestJson(
    "GET",
    `${base}/sdcpp/v1/jobs/${jobId}`,
  );

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
      return {
        status: "completed",
        imageBase64: data.result?.images?.[0]?.b64_json,
      };
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
      throw new Error(
        `sd-server job unknown status: ${JSON.stringify(data).slice(0, 500)}`,
      );
  }
}

export async function uploadImageToSupabase(
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
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

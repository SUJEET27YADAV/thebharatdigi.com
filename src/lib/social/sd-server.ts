import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import type { ContentTopic } from "./topics";
import { createServerClient } from "@/utils/supabase/server";

const BRAND_NAME = "The Bharat Digital";

// Refined style string prioritizing clean lighting, sharp 3D render styles, and clear focal depth
const MARKETING_BANNER_STYLE =
  "professional commercial ad graphic for " +
  BRAND_NAME +
  ", 3D glassmorphism aesthetic, " +
  "hyper-detailed laptop and smartphone screen mockups showing modern tech dashboards, " +
  "vibrant electric blue and emerald green ambient glow, polished glass and metal surfaces, " +
  "floating glossy 3D icons, soft studio lighting, sharp focus, octane render style, 8k resolution, ultra-clean composition";

// Focused negative prompt to prevent blurriness, fog, and visual clutter
const NEGATIVE_PROMPT =
  "blurry, foggy, low detail, out of focus, noise, grainy, distorted devices, warped screens, " +
  "messy composition, oversaturated, dark shadows, low quality, draft, duplicate objects, cropped";

interface BannerPromptConfig {
  headlineConcept: string;
  visualSubject: string;
  floatingIcons: string;
}

/**
 * Maps each topic ID to refined subject visuals tailored for clean AI rendering.
 */
function getTopicBannerConfig(topic: ContentTopic): BannerPromptConfig {
  const configs: Record<string, BannerPromptConfig> = {
    "mvp-development": {
      headlineConcept: "LAUNCH FAST",
      visualSubject:
        "sleek modern laptop displaying a modern SaaS analytics dashboard with green growth charts",
      floatingIcons:
        "glowing 3D rocket badge, target icon, and floating checkmarks",
    },
    "ai-development": {
      headlineConcept: "AI POWERED",
      visualSubject:
        "futuristic tablet screen displaying glowing neural network nodes and AI chat interface",
      floatingIcons:
        "glossy 3D brain icon, glowing AI chat badge, and futuristic data chip",
    },
    automation: {
      headlineConcept: "AUTOMATE",
      visualSubject:
        "clean workspace screen rendering a visual workflow automation diagram with connected nodes",
      floatingIcons:
        "3D gear icons, speed clock badge, and glowing connection lines",
    },
    ecommerce: {
      headlineConcept: "BOOST SALES",
      visualSubject:
        "sleek laptop and smartphone mockup showing high-converting e-commerce checkout page with green Buy button",
      floatingIcons:
        "3D glossy shopping cart, discount badge, and glowing credit card",
    },
    "seo-marketing": {
      headlineConcept: "RANK #1",
      visualSubject:
        "desktop monitor displaying rising organic traffic graphs and search engine rank position dashboard",
      floatingIcons:
        "3D search glass badge, upward trend arrow, and verified checkmark",
    },
    "mobile-apps": {
      headlineConcept: "APP GROWTH",
      visualSubject:
        "two sleek modern smartphones displaying polished mobile app user interfaces",
      floatingIcons:
        "3D star rating badge, mobile app icons, and notification bell",
    },
    "custom-web": {
      headlineConcept: "WEB DESIGN",
      visualSubject:
        "ultra-wide screen displaying a modern responsive agency landing page",
      floatingIcons:
        "3D code tag icon, security shield badge, and lightning bolt",
    },
    performance: {
      headlineConcept: "3X SPEED",
      visualSubject:
        "tech dashboard showing 100/100 Core Web Vitals speed score and performance gauges",
      floatingIcons:
        "3D lightning bolt, fast-forward badge, and glowing speedometer",
    },
    "web-apps": {
      headlineConcept: "SCALE NOW",
      visualSubject:
        "cloud SaaS platform interface displayed on a modern glass tablet",
      floatingIcons: "3D cloud icon, user growth badge, and database icon",
    },
    uiux: {
      headlineConcept: "UI/UX DESIGN",
      visualSubject:
        "figma style design canvas rendering crisp app wireframes and color design tokens",
      floatingIcons:
        "3D design stylus, color palette badge, and heart reaction icon",
    },
  };

  return (
    configs[topic.id] || {
      headlineConcept: "DIGITAL GROWTH",
      visualSubject: `sleek laptop displaying high-tech digital website for ${topic.title}`,
      floatingIcons:
        "floating 3D web icon, smartphone icon, and verified checkmark badge",
    }
  );
}

function buildRichPrompt(topic: ContentTopic): string {
  const config = getTopicBannerConfig(topic);

  // Simplified prompt flow: Focal Point -> Supporting Elements -> Style
  return (
    `3D isometric promotional banner. Central focal point is ${config.visualSubject}. ` +
    `Surrounded by ${config.floatingIcons} hovering with realistic glass shadows. ` +
    `Clean gradient background with subtle isometric tech grid patterns. ` +
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
      model: "Z-Image Turbo",
      prompt: buildRichPrompt(topic),
      negative_prompt: NEGATIVE_PROMPT,
      width: 1080,
      height: 1080,
      sample_params: {
        // FIXED: Increased sampling steps and adjusted CFG scale for sharp rendering
        sample_steps: 25,
        guidance: { txt_cfg: 4.5 },
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

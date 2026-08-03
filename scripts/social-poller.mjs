import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

function loadEnvFile(file) {
  const content = readFileSync(file, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cronSecret = process.env.CRON_SECRET;

if (!supabaseUrl || !serviceRoleKey || !cronSecret) {
  console.error("[Poller] Missing env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / CRON_SECRET). Check .env.local");
  process.exit(1);
}

const POLL_INTERVAL_MS = Number(process.env.POLLER_INTERVAL_MS || 15000);
const SD_POLL_URL = (process.env.SD_POLL_URL || "http://localhost:8888").replace(/\/$/, "");
const COMPLETE_URL =
  process.env.COMPLETE_URL || "https://www.thebharatdigi.com/api/cron/complete";

const supabase = createClient(supabaseUrl, serviceRoleKey);

function httpJson(method, url) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const client = target.protocol === "https:" ? httpsRequest : httpRequest;
    const req = client(
      {
        hostname: target.hostname,
        port: target.port,
        path: `${target.pathname}${target.search}`,
        method,
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode ?? 0, body: data }));
      }
    );
    req.setTimeout(60000, () => req.destroy(new Error("request timed out")));
    req.on("error", reject);
    req.end();
  });
}

async function pollSdJob(jobId) {
  const { status, body } = await httpJson("GET", `${SD_POLL_URL}/sdcpp/v1/jobs/${jobId}`);
  if (status < 200 || status >= 300) {
    throw new Error(`sd-server poll ${status}: ${body.slice(0, 300)}`);
  }
  return JSON.parse(body);
}

async function finishPendingImage(row) {
  const sd = await pollSdJob(row.job_id);

  if (sd.status === "queued" || sd.status === "generating") {
    return null;
  }

  if (sd.status === "completed") {
    const base64 = sd.result?.images?.[0]?.b64_json;
    if (!base64) throw new Error("sd-server job completed but returned no image");

    const buffer = Buffer.from(base64, "base64");
    const path = `social/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;

    const { error: uploadError } = await supabase.storage
      .from("social-images")
      .upload(path, buffer, { contentType: "image/png", upsert: false });
    if (uploadError) throw new Error(`Supabase upload: ${uploadError.message}`);

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/social-images/${path}`;

    const { error: updateError } = await supabase
      .from("social_jobs")
      .update({ status: "image_ready", image_url: imageUrl, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    if (updateError) throw new Error(`DB update: ${updateError.message}`);

    console.log(`[Poller] job ${row.job_id} -> image ready: ${imageUrl}`);
    return;
  }

  if (sd.status === "failed" || sd.status === "cancelled") {
    const errorMessage = sd.error ? JSON.stringify(sd.error) : sd.status;
    const { error: updateError } = await supabase
      .from("social_jobs")
      .update({ status: "failed", error_message: errorMessage, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    if (updateError) throw new Error(`DB update: ${updateError.message}`);

    console.error(`[Poller] job ${row.job_id} -> ${sd.status}: ${errorMessage}`);
    return;
  }

  throw new Error(`unknown sd-server job status: ${sd.status}`);
}

async function callComplete(row) {
  const response = await fetch(COMPLETE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cronSecret}`,
    },
    body: JSON.stringify({ jobId: row.id }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`complete endpoint ${response.status}: ${text.slice(0, 300)}`);
  }
  console.log(`[Poller] complete ${row.id}: ${text.slice(0, 160)}`);
}

async function tick() {
  const { data, error } = await supabase
    .from("social_jobs")
    .select("id, job_id, status")
    .in("status", ["pending", "image_ready", "failed"])
    .order("created_at", { ascending: true })
    .limit(20);

  if (error) {
    console.error(`[Poller] query failed: ${error.message}`);
    return;
  }

  for (const row of data || []) {
    try {
      if (row.status === "pending") {
        if (!row.job_id) continue;
        await finishPendingImage(row);
      }

      if (row.status === "image_ready" || row.status === "failed") {
        await callComplete(row);
      }
    } catch (err) {
      console.error(`[Poller] row ${row.id} failed: ${err.message}`);
    }
  }
}

console.log(`[Poller] started. sd-server: ${SD_POLL_URL}, complete: ${COMPLETE_URL}, interval: ${POLL_INTERVAL_MS}ms`);

(async () => {
  for (;;) {
    try {
      await tick();
    } catch (err) {
      console.error(`[Poller] tick error: ${err.message}`);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
})();

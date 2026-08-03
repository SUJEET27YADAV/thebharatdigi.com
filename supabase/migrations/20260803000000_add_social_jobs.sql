-- Social image job queue bridging Vercel cron -> local sd-server -> posting
-- The Vercel cron submits the sd-server job and records it here; the local
-- poller watches this table, finishes the image, then pings Vercel to post.

CREATE TABLE IF NOT EXISTS public.social_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT,
  topic_id TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  facebook_text TEXT NOT NULL,
  instagram_text TEXT NOT NULL,
  linkedin_text TEXT NOT NULL,
  facebook_hashtags TEXT[] DEFAULT '{}',
  instagram_hashtags TEXT[] DEFAULT '{}',
  linkedin_hashtags TEXT[] DEFAULT '{}',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'image_ready', 'failed', 'completed', 'text_only')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  posted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_social_jobs_status ON social_jobs(status);
CREATE INDEX IF NOT EXISTS idx_social_jobs_created_at ON social_jobs(created_at DESC);

ALTER TABLE social_jobs ENABLE ROW LEVEL SECURITY;

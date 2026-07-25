-- Social media marketing tables for The Bharat Digital
-- Run this migration to add social posting support

CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram', 'linkedin')),
  topic_id TEXT NOT NULL,
  caption TEXT NOT NULL,
  image_url TEXT,
  hashtags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  platform_post_id TEXT,
  error_message TEXT,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_posts_created_at ON social_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_topic_id ON social_posts(topic_id);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

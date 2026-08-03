-- Create public storage bucket for AI-generated social media images
INSERT INTO storage.buckets (id, name, public)
VALUES ('social-images', 'social-images', true)
ON CONFLICT (id) DO NOTHING;

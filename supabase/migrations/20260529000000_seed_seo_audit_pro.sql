-- Seed the SEO Audit Pro product
INSERT INTO public.products (name, description, price, tag, features, image_url)
VALUES (
  'SEO Audit Pro',
  'Production-grade SEO auditing tool with AI agent skill generation. Scans websites across 8 critical SEO dimensions — Meta Tags, Performance, Links, Content, Images, Social, Security, and Mobile. Generates detailed reports in JSON, HTML, and AI agent SKILL.md format with actionable fixes ranked by priority.',
  999,
  'SEO Tool',
  ARRAY['8 Category Analysis', 'AI Skill Generation', 'JSON/HTML Reports', 'Broken Link Detection', 'Core Web Vitals Check', 'Security Audit', 'Mobile Check', 'CLI Tool'],
  '/SEO_Audit_Pro.svg'
)
ON CONFLICT (serial) DO NOTHING;

# ADR 0001 — Static TSX pages for services (not DB-driven)

The existing `/services` page queries Supabase at request time via `createServerClient`. New service pillar pages (MVP, AI, Automation, Ecom, SEO, Mobile) will be standalone static TSX files in `src/app/services/{slug}/page.tsx` with hardcoded content, metadata, and schema. The `/services` listing will be refactored to link to these static pages instead of relying on a DB query.

**Why static?** These pages are SEO landing pages — their content changes at most quarterly. Static TSX eliminates the DB round-trip, Supabase client import, and error handling for every page load. Content edits require a PR, which is appropriate for marketing copy that should be reviewed before going live. The admin panel's service management becomes read-only or deprecated.

**Rejected alternative — DB-driven with dynamic slug route:** Would have required a Supabase `services` table redesign, an admin editor for 500+ word marketing pages, and added DB latency to every page load. No benefit since content velocity is low (~6 pages, updated < monthly).

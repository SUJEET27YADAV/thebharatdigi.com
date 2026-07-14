# The Bharat Digital — Domain Glossary

## Content Architecture

- **Service Pages**: Static TSX files, not DB-driven. Each service pillar is a standalone `src/app/services/{slug}/page.tsx` with hardcoded content, metadata, and JSON-LD schema. The `/services` listing page links to these static pages.
- **Industry Pages**: Static TSX files under `src/app/industries/{slug}/page.tsx`. Same pattern as service pages.
- **City Pages**: Static TSX files under `src/app/{city-slug}/page.tsx` for local SEO. Uses LocalBusiness schema with geo coordinates.
- **Portfolio References**: Hardcoded curated snippets on service/industry pages (not live DB queries). Each snippet links to the portfolio detail page for the full story.
- **Blog**: Ghost CMS self-hosted on Ubuntu laptop with SQLite, exposed via Cloudflare Tunnel. Next.js fetches posts at build time via Ghost Content API (`@tryghost/content-api`). Blog routes use `generateStaticParams` at build time — no live API calls at request time. Ghost handles the editor, SEO fields, images, and Article schema automatically.
- **Resource Pages** (guides, cost calculator): Static TSX with optional email-gated PDF downloads via existing nodemailer infrastructure.
- **Pricing Model**: "Most projects start at ₹15,000 – ₹3,00,000" range anchor on all service pages. Exact pricing deferred to `/cost-calculator/` interactive tool. The "Starting from" hint on each service page links to the calculator ("Use our cost calculator for an exact estimate").
- **City Pages**: `LocalBusiness` schema with `areaServed` for cities without a physical office. Only the Noida page uses standard `LocalBusiness` with the actual office address.

## Navigation

- **Navbar**: Mega-menu dropdowns grouping services, industries, locations, and resources. Shipped in Phase 0 (before any content page) so every new page has top-of-site internal links from day one.
- **Footer**: Updated link structure matching mega-menu categories. Both import from `src/lib/routes.ts`.

## Schema Strategy

- **Schema Component**: Single reusable `<JsonLd>` component wrapping `next/script`. Every page imports it instead of writing raw `<script>` tags. Validates `@context` and `@type` presence in dev mode.
- Organization + WebSite schema: In root `layout.tsx` (global, one instance).
- BreadcrumbList: Per-page only. The global BreadcrumbList in `layout.tsx` is removed to avoid conflicting breadcrumbs.
- Service schema: On each service pillar page.
- LocalBusiness schema: On each city page.
- Article schema: On each blog post.
- FAQ schema: On all service and industry pages (6–8 questions each). FAQ Q&A data lives in a centralized `src/lib/faq-data.ts` keyed by page slug. A reusable `<FaqSection>` component renders the accordion UI + FAQ JSON-LD in one place.

## Route Management

- **Shared Routes File**: `src/lib/routes.ts` is the single source of truth for all static routes. Imported by `sitemap.ts`, navbar mega-menu, and footer. Adding a route in one place updates all three.

## Tech Stack

- Next.js App Router (static TSX for marketing pages)
- Supabase (auth, products, orders, portfolio — NOT service content)
- Nodemailer (email capture for gated downloads)

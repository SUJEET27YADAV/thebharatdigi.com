# Beyond SEO 1.0.2 Apify-First Universal Release

This release incorporates the Codex-installed Apify updates and changes the skill behavior from "ask for many APIs" to "Apify-first".

## Changes

- Added Codex-updated `integrations/apify.md`.
- Added `integrations/apify-actor-shortlist.md`.
- Added `integrations/apify-first-operating-policy.md`.
- Rewrote onboarding so the skill asks only for `APIFY_API_TOKEN` by default.
- Updated setup, install, capability detection, audit modes, README, and SKILL.md to prefer Apify first.
- Added `apify-client` to requirements.
- Added `tools/apify_start_check.py`.
- Confirmed no API token is stored in the package.

---

# Beyond SEO 1.0.1 Universal Release

This release polishes the complete Beyond SEO 1.0 structure for broader AI-agent compatibility.

## Fixes Applied

- Added Codex-compatible YAML frontmatter to `SKILL.md`.
- Synced version metadata to `1.0.1`.
- Cleaned README language so completed files are not called upcoming.
- Added `requirements.txt` for optional Python tools.
- Added `INSTALL_FOR_AGENTS.md` for Codex, Claude, OpenClaw, Cursor, and local agents.
- Added `PLAYBOOK_DEPTH.md` to clarify deep modules vs lightweight specialist playbooks.
- Regenerated `MANIFEST.json` with clean file counts.
- Kept the full Beyond SEO structure intact.

## Compatibility

- Codex
- Claude Projects
- OpenClaw
- Cursor
- MCP-enabled agents
- Custom file-based AI agents


---

# Beyond SEO 1.0 Complete Structure Release

This package includes the full expanded Beyond SEO structure requested by the user.

It contains:
- Core brain and operating rules
- Apify and native scraping integrations
- Technical, on-page, content, schema, internal linking, speed, and conversion audit workflows
- Keyword discovery, clustering, intent, money keyword, local keyword, and page mapping workflows
- Competitor crawl, SERP gap, content gap, authority gap, and service-page gap workflows
- AEO/GEO and AI overview opportunity workflows
- Local SEO workflows
- Full backlink system with free/paid backlink source library and backlink database
- Strategy files for 30/60/90-day plans and query/visitor growth models
- Industry playbooks
- Reporting files
- Templates
- Examples
- Tools

Use SKILL.md as the master instruction file.

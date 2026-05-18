# martin-resume-page

Martin Dannelind's resume, on the web. Agent-maintained: `docs/*.md` is the ground truth, and the React site renders from typed data generated out of those markdown files.

## Stack

React 19 · React Router 7 (framework mode, SSG) · Vite 6 · Tailwind CSS v4 · shadcn-style UI primitives + Radix · Biome · pnpm · Firebase Hosting (GCP) · GA4 with Consent Mode v2.

Tech choices mirror Pit's Frontend Platform Engineer stack — the site itself is evidence of fluency with it.

## Local dev

```bash
pnpm install
pnpm content     # generate site/app/generated/content.ts from docs/*.md
pnpm dev         # http://localhost:5173
```

`pnpm dev` and `pnpm build` both run `pnpm content` automatically (`predev` / `prebuild` hooks).

## Workflows (via Claude Code skills)

- **Add an experience** — `/add-experience` scaffolds `docs/experience/YYYY-Qx-company-role.md` with valid frontmatter and regenerates content.
- **Update an experience** — `/update-experience` fuzzy-finds the right file and edits it.
- **Refresh from LinkedIn** — `/refresh-from-linkedin` uses Claude in Chrome to diff LinkedIn against `docs/` and propose changes.
- **Deploy** — `/deploy-site` runs `pnpm build` and `firebase deploy --only hosting`.
- **See analytics** — `/analytics-report` queries the GA4 Data API and returns a one-screen summary.

All five skills live in [.claude/skills/](.claude/skills/).

## Layout

```
docs/            # ground truth — human-edited markdown
site/            # React app (Vite + React Router 7)
  app/           # routes, components, lib, generated/
  scripts/       # build-content.ts (docs/ → typed content)
  public/        # static — robots.txt, sitemap.xml, llms.txt (generated), favicon.svg
.claude/skills/  # project-local skills
firebase.json    # hosting config
.firebaserc      # GCP project — replace `REPLACE_WITH_PROJECT_ID` before first deploy
```

## Deploy

1. Create a personal GCP project (recommended: `martin-dannelind-site`) and enable Firebase.
2. `npm install -g firebase-tools && firebase login`.
3. Update `.firebaserc` with the real project ID.
4. Set `VITE_GA4_MEASUREMENT_ID` in `site/.env.production` (see `site/.env.example`).
5. `/deploy-site` — or manually: `pnpm build && firebase deploy --only hosting`.

The site lands on `https://<project-id>.web.app` by default. A custom domain can be attached later in the Firebase console.

## SEO & agent-findability

Every route emits:

- Unique `<title>` + `<meta name="description">` + canonical URL + Open Graph + Twitter Card.
- Static `og-image.svg` at [site/public/og-image.svg](site/public/og-image.svg).
- Schema.org JSON-LD via [site/app/lib/seo.ts](site/app/lib/seo.ts):
  - **Person** on every page (full `hasOccupation: Role[]` + `sameAs` + `alumniOf` + `knowsAbout`).
  - **ProfilePage** + **WebSite** on the home page — required shape for Google's profile-page rich result.
  - **Role** on each experience detail page, linked back to the Person via `@id`.

Generated at content-build time and committed to `site/public/`:

- `robots.txt` — `User-agent: *` plus explicit allows for ~20 major search/AI agents (Googlebot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, …) so future opt-out-by-default policies preserve indexing.
- `sitemap.xml` — every prerendered route.
- `llms.txt` — short structured index following the [llmstxt.org](https://llmstxt.org) convention.
- `llms-full.txt` — long-form digest with full experience bodies, for LLM retrieval + grounding.
- `.well-known/security.txt` — RFC 9116 contact channel for security disclosures.

Set `SITE_ORIGIN` and `VITE_SITE_ORIGIN` to your real domain before deploying, so URLs in the generated artifacts point to the production host.

### One-time submissions to do after the first deploy

These nudge search engines to index faster — none are required but each takes a minute:

- **Google Search Console** → <https://search.google.com/search-console>: add the property (`https://martin-dannelind-7f7f0.web.app/`), verify via DNS or HTML file, submit the sitemap URL.
- **Bing Webmaster Tools** → <https://www.bing.com/webmasters>: same flow. Bing also reaches Yahoo and DuckDuckGo.
- (Optional) **IndexNow** → <https://www.indexnow.org>: ping endpoint that fan-outs to Bing, Yandex, Seznam, Naver. Not yet wired into deploy — defer until traffic warrants it.

## Conventions

See [.claude/CLAUDE.md](.claude/CLAUDE.md) for invariants and anti-patterns.

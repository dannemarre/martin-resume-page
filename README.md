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

- Per-route `meta` tags + Open Graph + Twitter Card + canonical URL.
- Static `og-image.svg` at [site/public/og-image.svg](site/public/og-image.svg).
- JSON-LD `Person` schema on the home page (with full `hasOccupation: Role[]`), and a `Role` schema on each experience detail page — see [site/app/lib/seo.ts](site/app/lib/seo.ts).
- `<time>` elements for date ranges and ISO 8601 dates inside JSON-LD.
- `sitemap.xml` and `robots.txt` generated at content build.
- `llms.txt` — short structured index following the [llms.txt convention](https://llmstxt.org/).
- `llms-full.txt` — long-form digest with full experience bodies, optimized for LLM retrieval and grounding.

Set `SITE_ORIGIN` and `VITE_SITE_ORIGIN` to your real domain before deploying, so URLs in the generated artifacts (`sitemap.xml`, `llms.txt`, JSON-LD, canonical, OG) point to the production host.

## Conventions

See [.claude/CLAUDE.md](.claude/CLAUDE.md) for invariants and anti-patterns.

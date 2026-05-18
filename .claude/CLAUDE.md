# Project conventions

This is Martin Dannelind's personal resume site — agent-maintained, deployed to Firebase Hosting on GCP.

## The contract: `docs/` is ground truth

Everything visible on the site is derived from `docs/`. Humans (and agents) edit markdown there. A build script transforms it into typed React data.

**Never hand-edit `site/app/generated/content.ts`.** It's auto-written from `docs/*.md` by `site/scripts/build-content.ts`. Edit the source, then run `pnpm content`.

If you find yourself wanting to add a hardcoded string in a component, ask: should this live in `docs/` instead? Usually yes.

## Standard workflows

| Want to… | Use… |
|---|---|
| Add a new assignment | `/add-experience` |
| Edit an existing one | `/update-experience` |
| Change bio / contact / identity | `/update-profile` |
| Manage the tech taxonomy | `/update-skills` |
| Add or edit an education entry | `/update-education` |
| Cross-content quality review | `/audit-content` |
| Pull updates from LinkedIn | `/refresh-from-linkedin` |
| Deploy live | `/deploy-site` |
| See visitor stats | `/analytics-report` |

## Writing style

All content writing — experiences, profile prose, education — follows **[docs/STYLE.md](../docs/STYLE.md)**. The skills above reference it; read it once before touching `docs/` for the first time, then re-skim the relevant section before each significant content edit. It defines voice, structure, length, anti-patterns, and the canonical tag taxonomy.

## Coding conventions

- TypeScript strict. No `any` (Biome warns on it).
- Biome handles lint + format. Run `pnpm lint` and `pnpm format` from the repo root or inside `site/`.
- React Router 7 framework mode, SSG only (`ssr: false`). Every route gets prerendered at build time. If you add a dynamic route, also add its paths to `prerender()` in `site/react-router.config.ts` (today it auto-enumerates from `experiences`).
- Imports: use the `~/*` alias for `site/app/*`. Don't write `../../app/...`.
- Components: PascalCase filenames in `site/app/components/`. UI primitives in `site/app/components/ui/`.
- Styling: Tailwind v4 via `@tailwindcss/vite`. Theme tokens live in `site/app/styles/app.css` under `@theme {}`. Don't add a `tailwind.config.ts` — v4 is CSS-first.

## Anti-patterns

- Don't install TanStack Query, Zustand, React Hook Form, or Zod. The site is static content — those are dead weight here. If a future feature genuinely needs them (e.g. a contact form posting to an API), that's a conscious decision, not a default.
- Don't add multiple package managers. pnpm only.
- Don't add ESLint or Prettier. Biome only.
- Don't fetch markdown at runtime. Content is generated at build time into TypeScript.
- Don't introduce a CMS. `docs/` is the CMS.

## Before reporting a task done

- `pnpm content` succeeds (validates frontmatter).
- `pnpm typecheck` passes.
- `pnpm build` succeeds and prerenders all routes.
- For UI changes: open `pnpm dev` (`http://localhost:5173`) and walk the change visually.

## SEO / GEO checklist

Every page should have:

- A unique `<title>` and `<meta name="description">` (set per route via React Router `meta` exports).
- A `<link rel="canonical">` pointing to its production URL.
- `og:title`, `og:description`, `og:url`, `og:image` (and Twitter equivalents).
- JSON-LD: home page emits `Person` schema with `hasOccupation: Role[]`. Each experience detail page emits a `Role` referencing the same `@id` as the Person. See [site/app/lib/seo.ts](../site/app/lib/seo.ts).

GEO (LLM-search) artifacts generated from `docs/` by `pnpm content`:

- `/llms.txt` — short structured index (facts + linked experience summaries). Follow the [llms.txt convention](https://llmstxt.org/).
- `/llms-full.txt` — long-form digest with full bodies. Designed for retrieval / grounding.
- `/sitemap.xml`, `/robots.txt` — generated.
- `/og-image.svg` — static social card. Regenerate if hero copy changes.

Set `SITE_ORIGIN=https://your-domain.com pnpm content` (or `VITE_SITE_ORIGIN` for the React build) so the absolute URLs in those artifacts are correct when you ship.

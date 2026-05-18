---
name: update-experience
description: Use when Martin wants to update an existing experience entry — fix a typo, expand a bullet, add or remove tags, mark an ongoing project as ended, or rewrite the summary. Locates the right file, edits frontmatter and/or body, regenerates content.
---

# /update-experience

Edit an existing experience entry.

## Finding the right file

1. If the user named a slug, use `docs/experience/{slug}.md` directly.
2. Otherwise grep for the company name in `docs/experience/` — fuzzy match on filename or content.
3. If multiple files match (e.g. Martin had several roles at Tink), list them with start dates and ask which one.

## What to edit

- **Frontmatter fields**: edit in place. Keep YAML valid. If marking an ongoing project as ended, set `ongoing: false` and add `end: YYYY-Qn`. Available fields:
  - `slug` — do **not** rename after first deploy (breaks URLs).
  - `role`, `company`, `companyUrl`, `projectTitle`, `industry`
  - `start`, `end`, `ongoing` (boolean)
  - `nda` (true anonymizes company on the public site), `featured` (boolean, surfaces as "current" work)
  - `tags` (string list), `summary` (one-liner)
- **Body**: edit the relevant `## Context` / `## What I did` / `## Outcome` section. Preserve the section structure — the build script doesn't require it but it keeps the detail pages consistent.
- **Tags**: prefer reusing tags already used elsewhere in `docs/` for consistency. Run `grep -hRE "^\\s*-\\s" docs/experience/*.md | sort -u` to see existing tag values.

## After editing

1. Run `pnpm content` to regenerate. If frontmatter is invalid, the script fails with a clear error.
2. If the dev server is running, refresh to verify the change visually. Otherwise `pnpm dev` and walk it.
3. Commit the modified `docs/experience/*.md` plus regenerated `site/app/generated/content.ts` / `llms.txt` / `sitemap.xml`.

## What not to do

- Don't change `slug` after the file is committed — that breaks the URL and SEO. If you absolutely need to rename, do it as a separate commit and add a Firebase redirect.
- Don't edit `site/app/generated/content.ts` directly. It's overwritten by `pnpm content`.

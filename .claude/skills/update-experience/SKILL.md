---
name: update-experience
description: Use when Martin wants to edit an existing experience entry, for example to fix a typo, expand a bullet, add or remove tags, mark an ongoing project as ended, rewrite the summary, or change the company URL. Locates the right file, edits frontmatter and/or body to the style-guide bar, regenerates content.
---

# /update-experience

Edit an existing experience entry to the same quality bar as new ones.

## Before editing

**Read [docs/STYLE.md](../../../docs/STYLE.md)** for voice, structure, length, anti-patterns. If the change is non-trivial (rewording the summary, adding bullets, changing the framing), re-read the relevant sections before drafting.

## Finding the right file

1. If Martin named a slug, use `docs/experience/{slug}.md` directly.
2. Otherwise grep for the company or project name in `docs/experience/`, with a fuzzy match on filename or content.
3. If multiple files match (e.g. Martin had several roles at Tink), list them with role + date range and ask which one.

## Frontmatter fields you might touch

| Field | Notes |
|---|---|
| `role` | Don't inflate. Match LinkedIn or stay conservative. |
| `company` | Only change if NDA status flipped or the org renamed. |
| `companyUrl` | Add/update the homepage URL. Surfaces as a link on the detail page. |
| `projectTitle` | Short label revision. |
| `start`, `end`, `ongoing` | If marking ongoing → ended, set `ongoing: false` AND add `end: YYYY-Qn`. |
| `nda` | True anonymizes company on the public site. |
| `featured` | True surfaces as current/signature work. |
| `tags` | Add/remove with canonical casing. Run `grep -hE "^  - " docs/experience/*.md \| sort -u` first to check spelling. |
| `summary` | Re-read STYLE.md "Good summary lines" before rewriting. |
| `slug` | **Don't** rename after first deploy; it breaks URLs and external links. If absolutely necessary, add a Firebase redirect. |

## Body edits

- Preserve the `## Context` / `## What I did` / `## Outcome` skeleton.
- Each bullet should still pass the bar in STYLE.md: verb-first, specific, named tech.
- Reading the existing body before editing helps you match the voice.

## Pre-flight quality checklist

Run through this before considering the edit done:

- [ ] Does the summary fit in 12 to 25 words and avoid empty adjectives?
- [ ] Every "What I did" bullet starts with a specific past-tense verb?
- [ ] Tags use canonical casing?
- [ ] Body total is 100 to 500 words?
- [ ] If the role was teamwork, language reflects that?
- [ ] No marketing soup (*robust*, *scalable*, *significant*, *innovative*, *cutting-edge*) without numbers?
- [ ] If `ongoing` flipped to false, the `end` date is set?

## After editing

1. Run `pnpm content`. If frontmatter is invalid, the script fails with a clear error. Fix and re-run.
2. If the dev server is running, refresh to verify the change visually. Otherwise `pnpm dev` and walk it.
3. Commit the modified `docs/experience/*.md` plus regenerated `site/app/generated/content.ts`, `site/public/llms.txt`, `site/public/llms-full.txt`, `site/public/sitemap.xml`. Don't deploy.

## What not to do

- Don't change `slug` after first deploy.
- Don't edit `site/app/generated/content.ts` directly; it's overwritten by `pnpm content`.
- Don't paste in marketing copy from the PDF without rewriting it to first-person specific voice (see STYLE.md).

---
name: audit-content
description: Use when Martin wants a quality + consistency review across all `docs/` content. Checks for style-guide violations, tag spelling drift, frontmatter completeness, voice consistency, and stale information. Produces a findings list with concrete suggestions. Doesn't auto-fix unless explicitly asked.
---

# /audit-content

Periodic review of every file under `docs/`. Surfaces issues; doesn't fix them unless asked.

## When to run this

- After a batch of `/add-experience` or `/update-experience` calls (catch drift).
- After a `/refresh-from-linkedin` (catch inconsistencies the merge introduced).
- Before a deploy, if it's been a while.
- Ad hoc: Martin asks "audit the resume".

## Read this first

**[docs/STYLE.md](../../../docs/STYLE.md)**: the rules you're checking against.

## Checks to run

### 1. Frontmatter completeness

For each `docs/experience/*.md`:

- [ ] Required fields present: `slug`, `role`, `company`, `industry`, `start`, `ongoing`, `tags`, `summary`.
- [ ] `slug` matches filename (sans `.md`).
- [ ] `ongoing: true` ⇒ `end: null`. `ongoing: false` ⇒ `end` is present.
- [ ] `nda: true` ⇒ company body anonymizes the org (search for the real company name in the body; it should NOT appear).
- [ ] `start` and `end` formatted `YYYY-Qn`.

### 2. Tag hygiene

```bash
grep -hE "^  - " docs/experience/*.md | sort | uniq -c | sort -rn
```

Surfaces frequency-sorted tags. Flag:

- Pairs that look like typos of each other (`Vertex AI` vs `VertexAI`: fix one).
- Tags that appear once across the whole corpus (might be a typo; might be legitimate niche).
- Tags missing from `docs/skills/technologies.md` (the public toolbelt should be a superset of what experiences use).
- Casing inconsistencies: see STYLE.md → "Tag conventions".

### 3. Voice + style

For each experience entry:

- [ ] Does the summary pass the STYLE.md bar (12 to 25 words, specific, no empty adjectives)?
- [ ] Body < 500 words? (`wc -w` on the body section).
- [ ] No banned adjectives without numerical backing? Quick check: `grep -E "robust|scalable|innovative|cutting-edge|best-in-class|world-class|seamless|significant|pivotal" docs/experience/*.md`, then review each hit.
- [ ] Body has `## Context`, `## What I did`, `## Outcome` sections (or close variants).
- [ ] First person in `## What I did` (looks for "Built", "Led", "Migrated"; flags "Martin played", "the team led by Martin").

### 4. Cross-content consistency

- [ ] Industries in experience `industry:` fields all appear in `docs/profile/identity.md` `## Industries`?
- [ ] Roles in experience `role:` fields all appear in `docs/profile/identity.md` `## Roles`?
- [ ] `docs/profile/bio.md` body still mentions a relevant subset of current clients (SVT, CAIA, Tink…). Flag if it's pointing at outdated ones.

### 5. Staleness

- [ ] Any `ongoing: true` entry whose `start` is > 18 months ago without recent body updates? Flag for review.
- [ ] `docs/profile/contact.md` still has `EMAIL_TBD` or `GITHUB_TBD`? Flag.
- [ ] `docs/experience/2026-q1-caia-cosmetics.md` still has `TBD` placeholders? Flag.
- [ ] `og-image.jpg` shows the current name, headline and tagline? Open `site/public/og-image.jpg`; if stale, re-run `python3 site/scripts/make-og-image.py`.

### 6. Generated artifacts in sync

```bash
pnpm content   # regenerate
git diff --stat site/app/generated/ site/public/llms.txt site/public/llms-full.txt site/public/sitemap.xml
```

If any of those files diff, the generated state was stale. Re-run + commit the regen as part of the audit.

## Output format

Produce a single markdown report under a clear header. Group by check type. For each finding:

- **What's wrong** (1 line)
- **Where** (file path, line if relevant)
- **Suggested fix** (concrete: what string to change to what)

Don't fix anything unless Martin explicitly approves.

Example finding:

> ### Tag spelling drift
> - `docs/experience/2024-q3-momang-data-scientist.md` line 18: `Vertex AI` vs `docs/experience/2024-q1-tink-cloud-migration.md` line 17: `VertexAI`. **Fix**: rename to `Vertex AI` (canonical per `docs/skills/technologies.md`).

## Don't

- Don't auto-fix without approval. The point of an audit is human (Martin) review.
- Don't be exhaustive about minor cosmetic issues. Flag patterns, not every instance.
- Don't grade in a hostile tone. Findings should read as "here's something to consider", not "this is bad".

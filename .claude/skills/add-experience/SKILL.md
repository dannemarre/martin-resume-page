---
name: add-experience
description: Use when Martin wants to add a new consulting assignment or job to his resume site. Creates a properly-formatted markdown file under `docs/experience/`, regenerates content, and confirms the new entry shows up.
---

# /add-experience

Add a new experience entry to the resume site.

## What you need from the user

If the user didn't already provide them, ask for:

- **Role** (e.g. "AI Engineer", "Data Scientist")
- **Company** (client name; if NDA, ask if they want it anonymized)
- **Company URL** (homepage of the company, e.g. `https://tink.com/`) — optional but strongly recommended for non-NDA entries; surfaces as a link on the detail page
- **Project title** — short label for what they were working on
- **Industry** — one of the values listed in `docs/profile/identity.md` (Fintech, Advertising, Healthcare, Fashion, Media, Broadcasting, …)
- **Start** as `YYYY-Qn` (e.g. `2025-Q3`)
- **End** as `YYYY-Qn` or "ongoing"
- **Tags** — tech stack and concepts, comma-separated
- **A one-line summary** (the elevator pitch)
- **Context / What I did / Outcome** — 1–3 bullets or paragraphs each

If you have an existing description (e.g. a PDF resume blurb), don't force the user to re-type — extract the fields yourself and confirm.

## Steps

1. **Build the slug**: `YYYY-Qx-company-role` — kebab-case, all lowercase. E.g. `2025-q3-acme-ai-engineer`. Strip parentheses and special chars.
2. **Pick the path**: `docs/experience/{slug}.md`. If a file already exists at that path, suggest a disambiguating suffix (e.g. add `-project-name`).
3. **Write the file** using this template — every required frontmatter field must be filled in:

   ```markdown
   ---
   slug: {slug}
   role: {role}
   company: {company}
   companyUrl: {https://... or null}
   projectTitle: {projectTitle}        # or remove the field if there's none
   industry: {industry}
   start: {YYYY-Qn}
   end: {YYYY-Qn or null}
   ongoing: {true/false}
   nda: {true if company name should be anonymized}
   featured: {true to mark current / signature work; default false}
   tags:
     - Tag1
     - Tag2
   summary: One-line elevator pitch.
   ---

   ## Context

   What the situation / client was.

   ## What I did

   - Bullet 1
   - Bullet 2

   ## Outcome

   The result and business value.
   ```

4. **Regenerate content** by running `pnpm content` from the repo root. This rewrites `site/app/generated/content.ts`, `site/public/llms.txt`, and `site/public/sitemap.xml`.
5. **Verify** — if the dev server is running, the new entry appears in the experience list and at `/experience/{slug}`. Otherwise run `pnpm dev` and walk it once.
6. **Commit** the new `docs/experience/{slug}.md` plus the regenerated `site/app/generated/content.ts`, `site/public/llms.txt`, and `site/public/sitemap.xml`. Don't push or deploy — that's `/deploy-site`'s job.

## Errors to watch for

- `pnpm content` will fail loudly if a required frontmatter field is missing. Read the error, fix the file, re-run.
- If the company is under NDA, set `nda: true` and use a descriptive but anonymous string for `company` (e.g. "Healthcare company (NDA)").
- Tags should match existing tags where they exist (e.g. `Vertex AI` not `VertexAI`) — check `docs/skills/technologies.md` first.

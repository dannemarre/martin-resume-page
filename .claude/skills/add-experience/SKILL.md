---
name: add-experience
description: Use when Martin wants to add a new consulting assignment, job, or project to his resume site. Creates a properly-structured markdown file under `docs/experience/` with valid frontmatter and a body that follows the writing style guide. Regenerates content and verifies the new entry surfaces.
---

# /add-experience

Add a new experience entry to the resume site.

## Before you touch anything

**Read [docs/STYLE.md](../../../docs/STYLE.md)** — the canonical writing guide. It defines voice, structure, length, tag conventions, and anti-patterns. Every line you write should pass that guide's bar.

## What to collect from Martin

If he didn't already volunteer them, ask for:

| Field | Notes |
|---|---|
| Role | e.g. "AI Engineer", "Data Scientist". Match LinkedIn or his usual framing; don't inflate. |
| Company | Real name. If NDA, ask whether to anonymize. |
| Company URL | Homepage. e.g. `https://tink.com/`. Omit only for NDA/defunct. |
| Project title | Short label — what the engagement was about. |
| Industry | Pick from `docs/profile/identity.md` (Fintech, Advertising, Healthcare, Fashion, Media, Broadcasting, …). |
| Start | `YYYY-Qn`. |
| End | `YYYY-Qn` or "ongoing". |
| Tags | Tech stack + concepts. See "Tag hygiene" below. |
| Summary | One sentence — see STYLE.md for the bar. |
| Context / What I did / Outcome | 1–3 paragraphs each, or notes you'll shape into bullets. |

If Martin gave you a blob of prose, extract the fields yourself and confirm before writing the file.

## Procedure

1. **Slug**: `YYYY-Qx-company-role`, kebab-case, lowercase. e.g. `2026-q2-acme-ai-engineer`. Strip parentheses, special chars, and "the".
2. **Path**: `docs/experience/{slug}.md`. If a file already exists at that path, suggest a disambiguating suffix (e.g. `-project-name`).
3. **Tag hygiene** before writing the frontmatter:
   - Run `grep -hE "^  - " docs/experience/*.md | sort -u | head -80` to see the canonical tag set.
   - Reuse existing casing (`Vertex AI`, not `VertexAI`; `BigQuery`, not `Big Query`).
   - 8–20 tags. Both broad (`LLM`, `RAG`) and specific (`LangChain`, `FAISS`).
4. **Write the file** using this template, then fill in the body per STYLE.md:

   ```markdown
   ---
   slug: {slug}
   role: {role}
   company: {company}
   companyUrl: {url or null}
   projectTitle: {projectTitle}
   industry: {industry}
   start: {YYYY-Qn}
   end: {YYYY-Qn or null}
   ongoing: {true/false}
   nda: {true/false}
   featured: {true/false}
   tags:
     - Tag1
     - Tag2
   summary: One-line elevator pitch (12–25 words; see STYLE.md).
   ---

   ## Context

   1–3 sentences on the client and what they needed. Third person.

   ## What I did

   - Verb-first bullet, past tense, named tech.
   - 3–6 bullets total.

   ## Outcome

   1–3 sentences on what changed. Customer/business value framing.
   ```

5. **Quality bar — verify before saving**:
   - [ ] Summary doesn't use any banned adjective (*robust*, *scalable*, *innovative*, *significant*, *pivotal*) without backing it with a number.
   - [ ] Every "What I did" bullet starts with a specific verb (*Built*, *Migrated*, *Led*), not vague ones (*Worked on*, *Contributed to*).
   - [ ] Body 100–350 words total. If longer, cut elaboration.
   - [ ] Tags use canonical casing.
   - [ ] If the role was teamwork, language reflects that ("co-led", "as part of a team that…").
6. **Regenerate** with `pnpm content`. Frontmatter validates; the script fails loudly on a missing required field.
7. **Verify** — if the dev server is running, the new entry should appear in the experience list and at `/experience/{slug}`. Otherwise spin up `pnpm dev` and walk it once.
8. **Commit** the new `docs/experience/{slug}.md` plus the regenerated `site/app/generated/content.ts`, `site/public/llms.txt`, `site/public/llms-full.txt`, `site/public/sitemap.xml`. Don't deploy — that's `/deploy-site`'s job.

## Common pitfalls

- **Consultancy-brochure voice**: if your draft starts with "Martin played a pivotal role…", rewrite. The PDF source uses that voice; we don't.
- **Inflated titles**: don't write "Lead Architect" when the role was "Software Developer".
- **Stuffing every tag you can think of**: tags should be ones you actually used, not aspirational.
- **Missing outcome**: every entry needs a result, even a qualitative one.

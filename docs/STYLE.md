# Writing style guide for docs/

The single source of truth for how content gets written on this site. Every skill that touches `docs/` reads this. If a recommendation here conflicts with what an LLM would default to, **follow this guide** — defaults are usually corporate-bland.

## Voice

- **First person for what I did.** "Built X." "Led the migration." "Refactored the categorization service." Past tense, verb-first.
- **Third person for context-setting.** When describing the client or situation: "Tink needed Y." "SVT had made a strategic shift to..." Switch back to first person for action.
- **Never the consultancy-brochure voice.** Anything that reads like a Theodora Tech promo blurb ("Martin played a pivotal role…", "Martin's contributions resulted in substantial business value…") gets rewritten. The PDF source uses that voice; we don't.

## The experience entry: required shape

Every file under `docs/experience/` follows this skeleton. No improvising headings.

```markdown
---
slug: YYYY-Qx-company-role
role: Role title
company: Company name
companyUrl: https://company.example/    # null if NDA / defunct
projectTitle: Short label
industry: One of the values in docs/profile/identity.md
start: YYYY-Qn
end: YYYY-Qn                            # null when ongoing: true
ongoing: false
nda: false                              # true → company name anonymized publicly
featured: false                         # true → current/signature work
tags: [Tag1, Tag2, ...]                 # canonical casing from existing entries
summary: One sentence elevator pitch.
---

## Context

What the client/org was, what they needed. 1–3 sentences. Third person.

## What I did

- Concrete contribution #1 (verb-first, past tense, named tech)
- Concrete contribution #2
- ... 3–6 bullets ideal

## Outcome

What changed. 1–3 sentences. Customer/business value framing — what's better, faster, possible now that wasn't before.
```

### Length targets

| Field | Target |
|---|---|
| `summary` | 1 sentence, 12–25 words |
| `## Context` | 1–3 sentences, 30–80 words |
| `## What I did` | 3–6 bullets, each 1–3 sentences |
| `## Outcome` | 1–3 sentences, 25–70 words |
| Total body | 100–350 words |

If a section is longer, ask whether the extra prose adds new information or just elaborates. If it's elaboration, cut it.

## What "good" looks like

### Good summary lines

- *"Proposed and built SVT's first MCP server so analytics teams could query BigQuery in natural language; grew into an org-wide MCP mesh on LibreChat."* — names the action (proposed + built), the artifact (MCP server, BigQuery, LibreChat), the user (analytics teams), the trajectory (grew into mesh).
- *"Refactored Tink's long-running transaction categorization product and migrated the backend from Go to Python on Vertex AI — making the first Tink product to run on Vertex AI."* — concrete verbs, named the stack change, gave a quantitative "first" claim.
- *"Co-led a major customer's AWS → GCP migration — Tink's first time hosting transactional PII on GCP — and delivered it without service disruption."* — names scope (AWS→GCP), constraint (PII), outcome (no disruption).

### Bad summary lines (cut on sight)

- *"Worked on AI stuff at Tink."* — Says nothing.
- *"Played a pivotal role in delivering a robust, scalable solution that significantly improved customer outcomes."* — Marketing soup. Cut every adjective and re-read; if nothing remains, it was empty.
- *"Spearheaded innovative end-to-end transformation."* — Three buzzwords, zero specifics.
- *"Significantly improved data accuracy."* — By how much? Across what surface?

### Good "What I did" bullets

- *"Spearheaded the migration of the categorization service from Go to Python on Vertex AI — the first Tink product to run on Vertex AI."*
- *"Built a vector database with Vertex AI Vector Search; orchestrated workflows with LangChain; used OpenAI's models for embeddings and retrieval QA chains."*

### Bad bullets (rewrite)

- *"Collaborated with cross-functional teams."* — Who? On what? With what outcome?
- *"Owned the end-to-end product."* — From where to where? What did "owning" mean?
- *"Drove significant business value."* — How much? Measured how?

## Anti-patterns

- **Marketing adjectives**: *robust*, *scalable*, *innovative*, *cutting-edge*, *best-in-class*, *world-class*, *seamless*, *significant*, *pivotal*. Delete on sight unless the next clause backs them up with a number.
- **Stacked adjectives**: "robust scalable performant resilient system" — pick one or use none.
- **Vague verbs**: *worked on*, *contributed to*, *was involved in*. Use specific verbs: *built*, *refactored*, *migrated*, *led*, *deployed*, *proposed*.
- **Buzzword soup**: *synergized*, *empowered*, *leveraged*, *spearheaded* (used twice in the same file = lazy — vary it).
- **Title inflation**: don't write "Lead Architect" when the role was "Software Developer". Match what LinkedIn says, or be honest about scope.
- **Solo claims on team work**: prefer "co-led" / "contributed to" / "as part of a team that…" when accurate.
- **Tense mixing in the same bullet**: pick past tense and stick with it.
- **Sentence fragments masquerading as bullets**: each bullet should be a complete thought.

## Tag conventions

- Canonical forms — check existing entries before adding a new variant. Some that already exist canonically: `Vertex AI` (not VertexAI), `BigQuery`, `Cloud Run`, `DBT` (uppercase), `LLM`, `RAG`, `PyTorch`, `MongoDB`, `OAuth/JWT`, `.NET`, `C#`, `MCP Servers`, `FastMCP`, `LibreChat`, `PowerBI`.
- See the full canonical list per group in `docs/skills/technologies.md`.
- To audit current usage: `grep -hE "^  - " docs/experience/*.md | sort | uniq -c | sort -rn` — frequency-sorted tag list.
- Tag count per experience: aim for **8–20**. Fewer reads as light; more reads as keyword-stuffing.
- Include both broad and specific tags. e.g. for an LLM project: `LLM`, `RAG`, `OpenAI`, `Vector Search`, `LangChain` — not just `AI`.

## NDA handling

Set `nda: true` only when the company name itself is the secret. With `nda: true`:
- Public site shows "Confidential client" instead of the company name.
- The body should still describe the work in detail — what made it hard, what got built, what changed — anonymizing only the org identity.
- For NDA work where the *project* is sensitive (not the company), leave `nda: false` and just describe the work generically. Don't disclose specifics that violate the agreement.

When in doubt, ask Martin before setting `nda: false` on something he flagged as confidential.

## Skills, profile, education — same voice, different shape

- `docs/profile/bio.md` — first person throughout. The tagline is the hook (8–15 words); the body is 2–4 paragraphs of plain prose. No bullet lists.
- `docs/profile/identity.md` — flat lists. No prose. Lowercase-no-period bullets except where the value naturally has caps (proper nouns).
- `docs/profile/contact.md` — pure data in frontmatter; the body's only job is to flag placeholders.
- `docs/education/*.md` — short, factual, 1–2 paragraphs. Lead with the formal degree title. List meaningful extracurriculars.
- `docs/skills/technologies.md` — grouped lists. Groups map to UI section headers on the site. Order within a group: most relevant / most recent first. No duplicates across groups.

## Before reporting a content change done

- Run `pnpm content` — frontmatter validates and the generated TS / llms.txt regenerate.
- Run `pnpm dev` and walk the changed page once.
- Spot-check: did you use any of the banned adjectives (*robust*, *scalable*, *innovative*, *significant*) without backing them with a number? If yes, rewrite.

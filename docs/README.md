# docs/ — ground truth

This folder is the **single source of truth** for everything on the public site. Humans (and Martin) edit the markdown here. Agents read these files, transform them, and write `site/app/generated/content.ts`. The React app renders only from the generated file.

If `docs/` and the rendered site disagree, `docs/` wins. Re-run `pnpm content && pnpm build`.

## Layout

```
docs/
├── profile/
│   ├── bio.md           # Hero summary + longer about
│   ├── identity.md      # Roles, industries, location
│   └── contact.md       # Email, LinkedIn, GitHub
├── experience/          # One file per assignment, slug = YYYY-Qx-company-role
├── education/
└── skills/
    └── technologies.md  # Grouped tech keyword list
```

## Experience file format

Every file under `docs/experience/` has YAML frontmatter followed by markdown body.

```markdown
---
slug: 2024-q3-momang-data-scientist
role: Data Scientist
company: Momang
companyUrl: https://www.momang.com/   # optional but recommended; surfaces as a link on the detail page
projectTitle: AI Search
industry: Fintech              # one of the values listed in profile/identity.md
start: 2024-Q3                 # YYYY-Qn, inclusive
end: 2024-Q4                   # YYYY-Qn or null when `ongoing: true`
ongoing: false
nda: false                     # true → company name redacted on the public site
featured: false                # true → marks the entry as current / signature work
tags:
  - LLM
  - RAG
  - GCP
summary: One-line elevator pitch for the experience-list card.
---

## Context

What the client / situation was.

## What I did

- Concrete bullets of contributions.

## Outcome

The result and business value.
```

### Required fields

`slug`, `role`, `company`, `industry`, `start`, `ongoing`, `tags`, `summary`. Optional: `companyUrl`, `projectTitle`, `end`, `nda`, `featured`. The build script validates against the schema in `site/scripts/build-content.ts` and fails loudly on a missing required field.

### Sorting

Items are sorted automatically: ongoing first (newest `start` wins), then by `end` descending. No `order` field needed.

## Skills file format

`docs/skills/technologies.md` groups keywords into buckets that map to UI sections. Each H2 is a group; bullets under it are individual tech names.

## Adding a new experience

Prefer the `/add-experience` skill — it scaffolds the file with valid frontmatter and re-runs the content build. Manual editing works too; just `pnpm content` afterward.

## What NOT to put here

- Anything under NDA that you don't want published. Mark `nda: true` to anonymize the company name, or omit the file entirely.
- Personal contact info beyond what should be public (no phone, no postal address).
- Build artifacts. `site/app/generated/content.ts` is committed, but it's regenerated from this folder — never hand-edit it.

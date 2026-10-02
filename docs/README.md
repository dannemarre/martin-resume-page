# docs/: ground truth

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

`slug`, `role`, `company`, `industry`, `start`, `ongoing`, `tags`, `summary`. Optional: `companyUrl`, `projectTitle`, `end`, `nda`, `featured`, `priority`, `references`. The build script validates against the schema in `site/scripts/build-content.ts` and fails loudly on a missing required field.

### References

Projects that link to public sources (product pages, articles, papers, regulations) list them under `references:`, each with a `title` and an `http(s)` `url`. They appear as a **References** section at the bottom of the project page, and the experience card shows how many there are. Inline links in the body can stay as well; `references` is the clear, complete list. Never add internal links (SharePoint, Drive, private repos).

### Sorting

Items are sorted automatically: ongoing first (`featured: true` entries lead, then higher `priority`, then newest `start`), then ended ones by `end` descending, then `start` descending, with `priority` breaking exact date ties. `priority` is an optional number (default 0, higher first); use it to pin the current employer to the top. No `order` field needed.

## Skills file format

`docs/skills/technologies.md` groups keywords into buckets that map to UI sections. Each H2 is a group; bullets under it are individual tech names.

## Adding a new experience

Prefer the `/add-experience` skill. It scaffolds the file with valid frontmatter and re-runs the content build. Manual editing works too; just `pnpm content` afterward.

## What NOT to put here

- Anything under NDA that you don't want published. Mark `nda: true` to anonymize the company name, or omit the file entirely.
- Personal contact info beyond what should be public (no postal address). The phone number in `profile/contact.md` is published deliberately.
- Build artifacts. `site/app/generated/content.ts` is committed, but it's regenerated from this folder, so never hand-edit it.

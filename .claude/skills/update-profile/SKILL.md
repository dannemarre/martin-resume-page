---
name: update-profile
description: Use when Martin wants to change anything in his profile section — bio prose, headline, subhead, tagline, location, employer-of-record, email, LinkedIn URL, GitHub URL, roles list, industries list. Touches files under `docs/profile/`, regenerates content, and refreshes the typed React data.
---

# /update-profile

Edit Martin's profile data — bio, identity, contact.

## Before editing

**Read [docs/STYLE.md](../../../docs/STYLE.md)** — especially the "Voice" section. Bio prose is first person; identity and contact are flat data.

## Which file holds what

| Field | File | Frontmatter or body? |
|---|---|---|
| Full name | `docs/profile/bio.md` | frontmatter (`name`) |
| Page headline (e.g. "AI Engineer") | `docs/profile/bio.md` | frontmatter (`headline`) |
| Subhead (e.g. "Data Science & Data Engineering") | `docs/profile/bio.md` | frontmatter (`subhead`) |
| Tagline (hero one-liner) | `docs/profile/bio.md` | frontmatter (`tagline`) |
| Location | `docs/profile/bio.md` AND `docs/profile/identity.md` | both frontmatter |
| Employer of record (consultancy) | `docs/profile/bio.md` | frontmatter (`employerOfRecord`) |
| About prose (longer bio) | `docs/profile/bio.md` | body — plain paragraphs |
| Roles list (sidebar on PDF, hidden on site) | `docs/profile/identity.md` | body bullets under `## Roles` |
| Industries list | `docs/profile/identity.md` | body bullets under `## Industries` |
| `availableFor` (roles he's open to) | `docs/profile/identity.md` | frontmatter |
| Email | `docs/profile/contact.md` | frontmatter (`email`) |
| LinkedIn URL | `docs/profile/contact.md` | frontmatter (`linkedin`) |
| GitHub URL | `docs/profile/contact.md` | frontmatter (`github`) |

## Style notes per file

### `bio.md`

- `tagline`: 8–15 words. The hook on the hero. Specific, not aspirational. Current canonical version: "I build AI systems that turn raw data into decisions people can act on."
- `headline`: short job title. No subtitle stuffing — that's what `subhead` is for.
- Body: 2–4 paragraphs of plain prose. First person. Names companies and concrete tech where relevant. No bullet lists. No section headings inside the body — the build script renders the body as-is.

### `identity.md`

- `## Roles`: a clean list of role titles Martin is open to or has held. Title case. One per line. No periods.
- `## Industries`: the industries he's worked in. Match the values used in `docs/experience/*.md` frontmatter `industry:` field — these are linked by exact string match.

### `contact.md`

- Pure data. Real URLs. If a field is missing on purpose (e.g. no GitHub), set it to `null` (not a placeholder string). Build script normalizes `EMAIL_TBD` / `GITHUB_TBD` to null automatically but real `null` is cleaner.

## Procedure

1. Identify the right file from the table above.
2. Edit the field (frontmatter or body).
3. If editing `tagline`, also consider:
   - It's baked into the static `og-image.svg`. If the change is significant, regenerate the OG image (edit the SVG by hand at `site/public/og-image.svg`).
   - It's used in JSON-LD descriptions and the llms.txt facts block.
4. Run `pnpm content` — regenerates typed data, llms.txt, llms-full.txt.
5. Spot-check with `pnpm dev`. Walk the hero + bio + contact sections.
6. Commit the changed `docs/profile/*.md` plus regenerated `site/app/generated/content.ts`, `site/public/llms.txt`, `site/public/llms-full.txt`.

## Edge cases

- **Personal email change**: replace the value in `contact.md` frontmatter. The `.well-known/security.txt` Contact field is auto-derived from this on the next `pnpm content` run.
- **Location change**: update both `bio.md` and `identity.md` — they're separate fields, easy to drift.
- **Adding a new "available for" role**: also consider whether to add it to `## Roles` in identity.md.
- **`employerOfRecord` change** (e.g. leaving Theodora Tech): update `bio.md`. The body prose probably needs a related edit too.

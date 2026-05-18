---
name: update-skills
description: Use when Martin wants to add, remove, rename, or regroup entries in his technology list — for example "add Rust to my skills" or "move Polars from Languages to Data engineering". Edits `docs/skills/technologies.md` and keeps the public tag taxonomy consistent with what's referenced in experience entries.
---

# /update-skills

Curate the technology taxonomy in `docs/skills/technologies.md`.

## Before editing

**Read [docs/STYLE.md](../../../docs/STYLE.md) → "Tag conventions"**. The file controls both the public "Toolbelt" section on the site **and** the canonical names used by experience entries' `tags:` arrays.

## File structure

`docs/skills/technologies.md` is a flat markdown file:

```markdown
## Group name (e.g. "Cloud & data platforms")

- Tech 1
- Tech 2

## Next group

- ...
```

Each `## Heading` becomes a labelled section on the public site. Each `-` bullet becomes a tag pill. Order within a group: most relevant / most recent first.

## Procedure

### Adding a new technology

1. Pick the right group. If it doesn't fit any existing group, decide whether to (a) extend a group's scope or (b) add a new `## Group`. Prefer (a) — too many small groups fragment the UI.
2. Add the bullet under the chosen group in **canonical casing** — see STYLE.md for examples (`Vertex AI`, not `VertexAI`; `BigQuery`, not `Big Query`).
3. Place it where it makes sense in the existing order (most relevant first, roughly).
4. If the new tech also appears in an experience's `tags:` array, ensure the spelling matches — exact string match.

### Renaming a technology

If the canonical form needs to change (e.g. fixing `Crossfunctional teams` → `Cross-functional teams`):

1. Edit `docs/skills/technologies.md`.
2. Grep + replace across all experience entries: `grep -rl "OLD" docs/experience/` then update each.
3. The build script regenerates `llms.txt` and JSON-LD `knowsAbout` from the union of all tags — these auto-fix once everything is consistent.
4. Run `pnpm content` to confirm the count of canonical tags didn't drop unexpectedly.

### Removing a technology

1. Decide why — Martin no longer wants it surfaced, or it's been deprecated?
2. Remove the bullet from `docs/skills/technologies.md`.
3. **Don't** remove it from experience `tags:` arrays — those are factual records of what was used. The unused-everywhere case is rare; if it happens, leave it as long as one experience still references it.

### Regrouping

Same as renaming: edit `docs/skills/technologies.md` to move bullets between groups. Order within a group matters; ordering across groups is decided by file order.

## Pre-flight checklist

- [ ] No duplicates within a group? (`grep -E "^- " docs/skills/technologies.md | sort | uniq -d`)
- [ ] No duplicates across groups? (`grep -E "^- " docs/skills/technologies.md | sort | uniq -d` — same command catches both)
- [ ] Casing matches what's used in `docs/experience/*.md` for the same tech?
- [ ] If new group added, name is short, plural, and Title Case (e.g. "Cloud & data platforms", "ML & AI").

## After editing

1. Run `pnpm content`. Validates the file and regenerates the skill groups in typed content.
2. Refresh `pnpm dev` and verify the "Toolbelt" section renders the change correctly.
3. Commit the changed `docs/skills/technologies.md` plus regenerated `site/app/generated/content.ts`, `site/public/llms.txt`, `site/public/llms-full.txt`.

## Don't

- Don't add aspirational technologies Martin hasn't actually worked with. Be honest — the experience entries should back up every entry here.
- Don't create a group called "Other" — find a better grouping or expand an existing one.
- Don't reorder for the sake of reordering. UI stability matters.

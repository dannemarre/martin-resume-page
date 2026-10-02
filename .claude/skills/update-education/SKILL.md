---
name: update-education
description: Use when Martin wants to add, edit, or remove an education entry, such as a new course, certificate, degree, exchange semester, or activity. Each entry lives as a separate file under `docs/education/`. Updates frontmatter and body and regenerates content.
---

# /update-education

Manage education entries under `docs/education/`.

## Before editing

**Read [docs/STYLE.md](../../../docs/STYLE.md) → "Skills, profile, education: same voice, different shape"**. Education entries are short and factual.

## File format

```markdown
---
slug: kebab-case-slug             # e.g. uppsala-cs-masters
degree: Degree title              # e.g. Master of Science in Engineering
field: Specialization             # e.g. Software Development (optional)
institution: Institution name     # e.g. Uppsala University
location: City, Country           # e.g. Uppsala, Sweden
start: YYYY                       # year only, no quarter needed
end: YYYY                         # year only; null/omit if ongoing
activities:                       # optional list
  - "Activity 1, year"
  - "Activity 2"
---

## {Degree title}

1 to 2 short paragraphs of factual context. What programme it was, what the focus was, notable activities or honors.

**Activities:** optional inline list of extracurriculars if you didn't put them in frontmatter.
```

## Procedure

### Adding an entry

1. Decide the slug, usually `<institution>-<level>` (e.g. `uppsala-cs-masters`, `kth-summer-school-ml`, `coursera-rl-specialization`).
2. Create `docs/education/{slug}.md` from the template above.
3. Body: 1 to 2 paragraphs. Lead with the formal degree/programme title. Mention what made the programme distinctive. List meaningful activities (student union roles, thesis topic, exchanges).
4. Run `pnpm content` to regenerate.

### Editing an existing entry

1. Find the file: `ls docs/education/`.
2. Edit frontmatter or body as needed. Same fields as above.
3. If the formal degree title needs to change (e.g. you discover LinkedIn lists "Civilingenjör" or "Degree of Master of Science in Engineering"), prefer the most formal/official version that appears on the actual diploma.

### Removing an entry

Rare. Only remove if the entry is genuinely wrong or was added by mistake. If it's outdated but real, keep it: education entries should be a complete record.

## Quality bar

- [ ] Degree title matches the official one (diploma, LinkedIn, university website).
- [ ] Field/specialization is the official programme name, not a summary.
- [ ] Dates are years (not quarters); education entries use `YYYY`, unlike experiences.
- [ ] Body is 1 to 2 short paragraphs, factual, no marketing language.
- [ ] Activities are concrete (e.g. "IT-Sektionen board member, 2018") not vague ("Was active in student life").

## After editing

1. Run `pnpm content`. The script regenerates the education list and updates `Person.alumniOf` in the JSON-LD.
2. Spot-check with `pnpm dev`: the Education section should reflect the change.
3. Commit `docs/education/*.md` plus the regenerated artifacts.

## Don't

- Don't list every Coursera 4-hour course. The Education section is for substantive programmes (degree-bearing, multi-month, or otherwise notable).
- Don't add a body section beyond the 1 to 2 paragraph guideline. Education is a sparse signal on a resume site; resist filling space.
- Don't include grades or GPA. Convention in Europe (and especially Sweden) is to omit unless asked.

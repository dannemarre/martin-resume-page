---
name: refresh-from-linkedin
description: Use when Martin wants to pull updates from his LinkedIn profile into the docs/ folder, e.g. after adding a new role, recommendation, or certificate on LinkedIn that should be reflected on the site.
---

# /refresh-from-linkedin

Pull fresh content from Martin's LinkedIn profile into the resume docs.

## Prerequisites

- Claude in Chrome extension is connected (`mcp__Claude_in_Chrome__*` tools available).
- Martin is signed into LinkedIn in that Chrome instance. If the navigation hits an authwall (`/authwall?...`), stop and ask Martin to sign in, then retry.

## Steps

1. **Navigate** to `https://www.linkedin.com/in/martin-dannelind-24ab88198/` using `mcp__Claude_in_Chrome__navigate`.
2. **Confirm authentication** by checking the page title / URL. If you see `Sign Up | LinkedIn` or `/authwall`, abort and ask Martin to sign in.
3. **Extract** the profile content with `mcp__Claude_in_Chrome__get_page_text`. Scroll if needed to load the full experience section.
4. **Save the raw extraction** to `docs/.raw/linkedin-{YYYY-MM-DD}.md` (gitignored). Include a fenced metadata block at the top with `scrapedAt`, `url`, `userAgent` if known.
5. **Diff against existing docs**:
   - Compare each LinkedIn experience to `docs/experience/*.md`, matching by company + start date.
   - For new experiences not present in `docs/`: propose adding them via the `/add-experience` flow.
   - For existing experiences with new bullets / changed dates: surface the diff and ask Martin which changes to apply.
   - For recommendations and other content not currently rendered on the site: collect into `docs/.raw/recommendations-{YYYY-MM-DD}.md` for future use.
6. **Apply approved changes** by editing the appropriate `docs/experience/*.md` files (or creating new ones), then run `pnpm content`.

## Output for the user

Surface the diff as a checklist before applying anything. Format:

```
## Additions
- [ ] New role: AI Engineer at NewCo, 2026-Q2 → create docs/experience/2026-q2-newco-ai-engineer.md
- [ ] New recommendation from Jane Doe → save to docs/.raw/recommendations-2026-05-18.md

## Updates
- [ ] SVT AI Engineer: new bullet on "evaluation framework" → append to "What I did"
- [ ] Tink AI Engineer Merchant: end date changed from "ongoing" to 2024-Q3 → already correct, skip

## No-op
- All other entries unchanged.
```

Wait for explicit approval per item before editing.

## What not to do

- Don't auto-apply changes. Martin reviews each one.
- Don't commit `docs/.raw/` files. They're gitignored intentionally because they can contain unredacted recommendations / contact info.
- Don't fabricate content. If a LinkedIn field is empty, leave the corresponding doc untouched.

---
slug: 2026-q3-caia-design-system
role: AI Lead
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: CAIA Design System
industry: Fashion
start: 2026-Q3
end: null
ongoing: true
nda: false
featured: false
tags:
  - Design Systems
  - React
  - TypeScript
  - Tailwind
  - shadcn/ui
  - Next.js
  - Design Tokens
  - Claude
  - Claude Skills
  - GitHub Packages
  - CI/CD
summary: Built the CAIA Design System, capturing CAIA's look, tone of voice and feeling for people and AI agents, now the default for AI-generated work.
---

## Context

With more of CAIA's reports, decks and dashboards being produced with AI, CAIA needed one source of brand truth that both people and agents could apply. The interesting part is that a design system for AI agents has to describe more than colours and components: it has to capture CAIA's tone of voice, vibe and feeling, so an agent can create any kind of content that still feels like CAIA.

## What I did

- Wrote down CAIA's tone of voice, vibe and feeling in a form AI agents can follow, alongside the visual rules, so generated copy and layouts sound and look like CAIA.
- Built shared foundations (colour and type tokens, the Artico typeface, radius and wordmark assets), split into an internal track and a website track that share foundations but keep distinct voices.
- Built the internal component set (Button, Badge, Chip, Card, Field, KPI tile, Callout, bar chart, data table) plus templates for leadership reports, market dashboards and board decks, with 36 slide archetypes.
- Wrote the website track's guidance for the Next.js / Tailwind / shadcn/ui stack, including a Tailwind v4 token bridge.
- Published it as an npm package on GitHub Packages and as the organisation's default design system skill on claude.ai, guarded by an adherence CI that lints brand values, token parity and assets.

## Outcome

Colleagues use it daily in Claude: when someone asks for a deck, dashboard or memo, the brand and voice are applied through the organisation skill rather than by hand, including for board and leadership decks. The website track is planned for adoption with CAIA's new website from 2027.

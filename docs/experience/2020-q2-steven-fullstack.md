---
slug: 2020-q2-steven-fullstack
role: Fullstack Developer
company: Steven
companyUrl: null
projectTitle: Data security project
industry: Fintech
start: 2020-Q2
end: 2020-Q3
ongoing: false
nda: false
tags:
  - React
  - TypeScript
  - SQL
  - JavaScript
  - Stakeholder management
summary: Built a PII-safe support web platform for Steven so a new support contractor could handle cases without seeing more user data than they needed.
---

## Context

Steven is an app for splitting shared expenses — people log what they bought for an event or trip and the app evens everyone out. After a change of support contractor, Steven prioritized data security: keep effective support operations, but minimize what personal information the new vendor could see.

## What I did

- Mapped the data flows between Steven's database, support system, and the new contractor's view — identifying what PII could be hidden and what had to remain visible for support agents to do their job.
- Built the new support pages in React and wired them into Steven's existing support system.
- Updated the JavaScript backend's database interactions so the new pages exposed only the minimum data each support task required — query filters, auth scopes, and per-page field allowlists.

## Outcome

A PII-safe support web platform shipped on time. The support contractor sees only the data they need to do their job — reducing risk without compromising support quality.

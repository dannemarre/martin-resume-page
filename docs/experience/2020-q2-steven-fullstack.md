---
slug: 2020-q2-steven-fullstack
role: Fullstack Developer
company: Steven
companyUrl: null
projectTitle: "Privacy-first support platform"
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
  - Stakeholder Management
  - PII
  - Data Security
  - Access Control
  - Remote Collaboration
summary: Built a support platform for Steven that let an outsourced support vendor handle cases while seeing only the personal data each task required.
---

## Context

Steven is an app for splitting shared expenses: people log what they bought for an event or trip and the app evens everyone out. I joined for a summer, working with a development team that was fully remote in another country, so all collaboration happened online. Steven had outsourced its customer support to a third party it did not fully trust, and needed support to keep working while the vendor saw as little personal data as possible.

## What I did

- Mapped the data flows between Steven's database, support system and the vendor's view, identifying which personal data could be hidden and what support agents needed to see to do their job.
- Designed tiers of access, so each support task exposed only the data it required, and enforced them in the JavaScript backend with query filters, auth scopes and per-page field allowlists.
- Built the new support pages in React and wired them into Steven's existing support system.

## Outcome

A support platform that protected users' personal data shipped on time. The outside vendor sees only the data each task needs, which reduced the risk of handing support to a third party without hurting support quality.

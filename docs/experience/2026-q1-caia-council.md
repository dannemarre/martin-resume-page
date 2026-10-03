---
slug: 2026-q1-caia-council
role: AI Lead
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: "CAIAcouncil weekly business review"
industry: Fashion
start: 2026-Q1
end: null
ongoing: true
nda: false
featured: true
tags:
  - Technical Leadership
  - Multi-agent Systems
  - LLM
  - Claude
  - Claude Skills
  - OpenAI
  - Python
  - BigQuery
  - Web Search
  - API
  - FastMCP
  - MCP Servers
  - Cloud Run
  - Cloud Scheduler
  - Terraform
  - GCS
summary: "Built CAIAcouncil: 23 specialist AI experts that investigate CAIA's week across company data, the web and APIs, reconciled into one weekly council report."
---

## Context

CAIA's leadership needed a weekly read of the business that cut across finance, marketing channels, retail, assortment and press, faster than analysts could assemble by hand, and honest about what the data could and could not support.

## What I did

- Designed the council: 23 specialist experts across finance, marketing channels, product, assortment, retail and press, defined in one roster file. Each runs as its own service account with scoped tools: governed CAIAverse queries in BigQuery, web search and external APIs.
- Ran the experts on both Anthropic and OpenAI models on purpose. Different model families read the same week differently, so the council gets genuinely different views instead of one model agreeing with itself.
- Gave each expert a role, not an assignment. Experts decide how to investigate their own area, guided by skills for doing the work and for writing free-form reports, so every run takes a partly randomised path through the data. Over time that gives a fuller, more interesting picture of the company than a hardcoded checklist.
- Built the orchestrator that reconciles the expert reports into ranked decisions and open questions, guarded by six hard vetoes (attribution override, stock, margin floor, data freshness, magnitude sanity and unverified urgency).
- Scheduled weekly runs over the closed ISO week with Cloud Scheduler and Terraform, and built a read-only CAIAcouncil MCP server (FastMCP, Cloud Run) that serves the reports to Claude, ChatGPT and Cursor.
- Turned the council into a feedback loop for CAIAverse. The experts put the data layer under realistic, artificial load every week, and what they can't answer shows where data or aggregates are missing. Those gaps drive what gets modelled next, steering the build-out of conversational analytics.

## Outcome

Everyone at CAIA can read the weekly reports, and leadership goes through them in its weekly meeting. Teams use their own experts: marketing gets weekly press mentions of CAIA from the press expert, the product team follows how products perform, and customer support tracks its own performance and recurring ticket themes. Disagreements, caveats and vetoes are shown, not hidden, and figures are checked against CAIAverse before they reach finance or leadership. It also keeps improving the data platform that everyone else queries, week by week.

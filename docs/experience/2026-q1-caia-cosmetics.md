---
slug: 2026-q1-caia-cosmetics
role: AI Lead
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: "CAIAverse: semantic data layer + MCP"
industry: Fashion
start: 2026-Q1
end: null
ongoing: true
nda: false
featured: true
tags:
  - Technical Leadership
  - GCP
  - BigQuery
  - Dataform
  - Kimball
  - Semantic Modelling
  - FastMCP
  - MCP Servers
  - Cloud Run
  - OAuth/JWT
  - Vertex AI
  - Data Governance
  - Claude
  - LLM
  - Python
  - SQL
summary: Built CAIAverse, CAIA's semantic data layer on BigQuery, exposed through an MCP server so colleagues can query company data in natural language.
---

## Context

CAIA Cosmetics is a Stockholm-founded direct-to-consumer beauty brand (makeup, skincare, haircare and fragrance) selling across the Nordics and Europe. Data lived in dozens of SaaS tools and every question queued behind a small SQL-fluent team. As AI Lead I own CAIA's AI roadmap and build it hands-on, reporting to CAIA's leadership and to Verdane, CAIA's part-owner. The first goal was to make the warehouse the single, AI-readable source of truth.

## What I did

- Designed and built CAIAverse in Dataform on BigQuery: a Kimball-style layered model (sources → staging → intermediate → outputs) with 415 output models, on scheduled daily and hourly workflows with freshness monitoring.
- Built ingestion for 20 sources, including Voyado, Sitoo, Klarna, Zendesk, Meta, TikTok, Snapchat, Google Ads and GA4, mostly as Cloud Run Jobs, with a data contract per source.
- Built the CAIAverse MCP server on FastMCP + Cloud Run with domain-restricted Google OAuth. Queries run under the caller's own identity, so BigQuery permissions and column-level policy tags (PII, Restricted) are enforced per person.
- Made the layer discoverable to LLMs: a catalog-search tool matches questions against a registry of 726 answerable questions (September 2026) using Vertex AI embeddings, and logs unanswerable ones as a gap list that drives the modelling backlog.
- Packaged CAIAverse as organisation-wide Claude skills, so every colleague's Claude knows how to find, query and cite the right data.

## Outcome

Colleagues ask CAIAverse questions directly from Claude and get answers grounded in governed warehouse data, with access controls following each person. Usage grew from 7 colleagues in the first two days after launch (March 2026) to 34 colleagues making 10,181 authenticated requests in a single week (31 August to 7 September 2026), peaking at 40 colleagues in a three-day window in late September. The same layer now feeds the AI council, the Power BI migration and new dashboards.

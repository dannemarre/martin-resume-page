---
slug: 2026-q1-caia-cosmetics
role: AI Engineer
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: Semantic data layer + MCP exposure
industry: Fashion
start: 2026-Q1
end: null
ongoing: true
nda: false
featured: true
tags:
  - GCP
  - BigQuery
  - Dataform
  - FastMCP
  - Cloud Run
  - MCP Servers
  - LLM
  - Claude
  - OpenAI
  - Python
  - SQL
  - Semantic Modelling
summary: Built CAIA's semantic data layer and exposed it through an MCP server so non-SQL teammates can self-serve answers from BigQuery in natural language.
---

## Context

CAIA Cosmetics is a Stockholm-based DTC beauty brand (makeup, skincare, haircare, fragrance) selling across the Nordics. As the org grew, every product, marketing, and merchandising data question queued behind a small SQL-fluent analyst team. CAIA wanted non-technical teammates to query the warehouse directly without learning SQL.

## What I did

- Built a Snowflake-style semantic data layer on BigQuery + Dataform — a single coherent view of product, order, marketing, and customer data.
- Built an MCP server on FastMCP + Cloud Run that exposes the semantic layer to LLMs (Claude, OpenAI, Gemini). The MCP knows the schema, respects table-level access, and translates natural-language questions into safe BigQuery reads.
- Wired the MCP into the team's agent workflows (Claude Code, custom agents) so data questions get grounded answers instead of guesses.

## Outcome

Non-SQL teammates now self-serve answers directly. Product managers, marketing, and merchandising can ask questions like "which fragrance SKUs grew most in Sweden last month?" and get a grounded answer — without the analyst loop.

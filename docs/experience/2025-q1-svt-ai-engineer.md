---
slug: 2025-q1-svt-ai-engineer
role: AI Engineer
company: SVT
companyUrl: https://www.svt.se/
projectTitle: Corporate Domain — MCP mesh & Survey Insights
industry: Broadcasting
start: 2025-Q1
end: 2026-Q1
ongoing: false
nda: false
tags:
  - Python
  - DBT
  - BigQuery
  - OpenAI
  - LLM
  - PowerBI
  - SQL
  - Data Analysis
  - Prompt engineering
  - GitLab
  - DBT Fusion
  - FastMCP
  - Cloud Run
  - MCP Servers
  - Cursor
  - LibreChat
summary: Proposed and built SVT's first MCP server so analytics teams could query BigQuery in natural language; grew into an org-wide MCP mesh on LibreChat.
---

## Context

Sveriges Television (SVT) is Sweden's national public broadcaster, producing impartial, high-quality content across news, entertainment, and culture. As AI became increasingly central to content creation and data analysis, SVT wanted to leverage these capabilities while building strong internal expertise. They specifically needed a way for analytics teams and content producers to perform fast, interactive data analysis without requiring SQL proficiency.

## What I did

- Proposed an MCP server that lets teams query data using natural language. The idea grew into an SVT-wide initiative — an MCP mesh accessible through an internally hosted version of LibreChat, with individual MCP servers owned by separate teams but available to the whole organisation.
- Spearheaded development of a **Survey Insights** MCP server that exposes SVT's extensive history of public surveys to AI agents. Built on FastMCP, hosted on Cloud Run, with tooling that lets agents navigate a Snowflake-style schema of BigQuery tables and respect the access boundaries those tables enforce.
- Extended the MCP to support PowerBI work — it can automatically generate semantic models and dashboards from its knowledge of the underlying tables.

## Outcome

By the end of the engagement, multiple MCP servers were live across SVT — extending from ad-hoc data Q&A into PowerBI semantic-model auto-generation, dashboard creation, and agentic workflows that ground answers directly in survey data. Decision-making no longer queues behind an SQL-fluent analyst.

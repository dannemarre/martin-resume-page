---
slug: 2026-q1-caia-conversational-analytics
role: AI Lead
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: From Power BI to conversational analytics
industry: Fashion
start: 2026-Q1
end: null
ongoing: true
nda: false
featured: false
tags:
  - Technical Leadership
  - PowerBI
  - Conversational Analytics
  - BigQuery
  - Dataform
  - MCP Servers
  - Claude
  - Self-service BI
  - React
  - Vite
  - Cloud Run
  - IAP
  - SQL
summary: Leading CAIA's move from a Power BI-centred reporting stack to conversational analytics, migrating 22 reports onto CAIAverse and making ad-hoc analysis a conversation with Claude.
---

## Context

CAIA's reporting ran on 22 Power BI reports, and a new question typically meant a new dashboard request. The goal is to make the governed semantic layer the single source of truth and let people ask questions directly instead of waiting for a report.

## What I did

- Catalogued all 22 Power BI reports from their PBIP sources into a migration matrix, and rebuilt their marts on top of CAIAverse in Dataform, validating parity against the originals (all within 1% at validation).
- Moved ad-hoc analysis onto the CAIAverse MCP, so questions that used to become dashboard requests are answered in Claude against the same governed models.
- Built a dashboard app on Cloud Run behind IAP where colleagues create and change dashboards by describing them in plain language, with a path to bring claude.ai live artifacts into it.
- Connected the CAIAverse and CAIAcouncil connectors in Claude, so teams build their own dashboards and reports in Claude on governed data instead of filing dashboard requests.

## Outcome

Dashboarding and reporting can now be built directly in Claude through the CAIAverse and CAIAcouncil connectors, and teams have taken ownership of their own data and reports. Dashboard requests have dropped, Power BI reports have been retired and licences saved, and Power BI is now being shut down completely.

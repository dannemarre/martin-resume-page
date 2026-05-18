---
slug: 2024-q1-tink-cloud-migration
role: Cloud Migration Engineer
company: Tink
companyUrl: https://tink.com/
projectTitle: AWS → GCP migration
industry: Fintech
start: 2024-Q1
end: 2024-Q3
ongoing: false
nda: false
tags:
  - Python
  - SQL
  - BigQuery
  - Athena
  - AWS
  - GCP
  - GCS
  - S3
  - Pydantic
  - Stakeholder management
  - Cross-functional teams
summary: Co-led a major customer's AWS → GCP migration — Tink's first time hosting transactional PII on GCP — and delivered it without service disruption.
---

## Context

Tink needed to move a major customer's data from AWS to GCP, primarily to unlock GCP-only products for upsell. Constraint: the live service had to stay live, and this would be the first time the customer's transactional personally identifiable information (PII) sat on GCP — a security and compliance bar to clear before the cutover.

## What I did

- Built the data-copy and verification pipelines between AWS (Athena/S3) and GCP (BigQuery/GCS) — table-by-table moves with parity checks to prove the new side matched the old before cutting traffic over.
- Designed the PII-handling on GCP: encryption, IAM scoping, and audit trails good enough to satisfy the security review before any production data landed.
- Coordinated the cutover across Tink's and the customer's teams: sequencing, rollback path, who-owns-what on the day.

## Outcome

The customer's infrastructure moved to GCP cleanly, with no service disruption during cutover. With transactional PII now on GCP, the customer became eligible for the GCP-only products Tink couldn't previously sell into them — turning the migration from a cost line into an upsell channel.

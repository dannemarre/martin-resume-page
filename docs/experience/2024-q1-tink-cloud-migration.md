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
summary: Co-led moving one of Sweden's major banks and all its transactional and personal data from AWS to GCP, without disruption, opening a high-impact upsell.
---

## Context

Tink needed to move the data of one of Sweden's major banks, a Tink customer, from AWS to GCP. The point was commercial: some of Tink's products ran only on GCP, so the move would let Tink sell them to the bank. It was also complex. All of the bank's transactional and personal data had to move, the live service had to stay live, and it was the first time this customer's personally identifiable information (PII) would sit on GCP, a security and compliance bar to clear before the cutover.

## What I did

- Built the data-copy and verification pipelines between AWS (Athena/S3) and GCP (BigQuery/GCS), moving table by table with parity checks to prove the new side matched the old before any traffic moved.
- Designed the PII-handling on GCP: encryption, IAM scoping, and audit trails good enough to satisfy the security review before any production data landed.
- Built the migration as a job that ran for months, moving the bank's customers to GCP gradually instead of in one big cutover, so risk and downtime for end users stayed minimal.
- Coordinated the rollout across Tink's and the bank's teams: sequencing, rollback paths and who owned what at each step.

## Outcome

The bank's data moved to GCP cleanly over several months, without service disruption for its users. With its transactional and personal data on GCP, the bank became eligible for Tink's GCP-only products, which made the migration a high-impact sale: a cost line turned into an upsell channel into the bank.

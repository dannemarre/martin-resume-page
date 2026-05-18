---
slug: 2022-q3-tink-data-scientist-categorization
role: Data Scientist
company: Tink
companyUrl: https://tink.com/
projectTitle: Transaction categorization
industry: Fintech
start: 2022-Q3
end: 2024-Q3
ongoing: false
nda: false
tags:
  - Python
  - Apache Airflow
  - AWS
  - GCP
  - Looker
  - S3
  - GCS
  - Vertex AI
  - Go
  - XGBoost
  - Fasttext
  - Label Studio
  - Regex
  - Sonarcloud
summary: Refactored Tink's long-running transaction categorization product and migrated the backend from Go to Python on Vertex AI — making the first Tink product to run on Vertex AI.
---

## Context

Tink had offered transaction categorization to its customers for years. By the time I joined the categorization team, the need to improve quality had become acute — recurring transaction prediction, risk work, and customer complaints all surfaced the same underlying issues. The product had been developed over several years by multiple authors, with a Fasttext + XGBoost classifier stack and a layer of static regex patterns. Newer model architectures were on the table, but the Go backend made experimentation painful.

## What I did

- Led a refactoring pass through the codebase: fixed bugs, removed dead code, introduced testing methodologies the team didn't have.
- Migrated the categorization service from Go to Python on Vertex AI — the first Tink product to run on Vertex AI. The move unlocked the data-science team to iterate on model architecture without the Go backend being a blocker.

## Outcome

The data-science team could iterate on model architecture again without backend rewrites. The next planned step — moving from text classification to a tag-based categorization scheme — became feasible thanks to the refactor and the Vertex AI move.

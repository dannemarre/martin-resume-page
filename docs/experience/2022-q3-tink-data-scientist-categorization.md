---
slug: 2022-q3-tink-data-scientist-categorization
role: Data Scientist
company: Tink
companyUrl: https://tink.com/
projectTitle: "Transaction categorisation"
industry: Fintech
start: 2022-Q3
end: 2024-Q3
ongoing: false
nda: false
tags:
  - NER
  - Data Lake
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
references:
  - title: "What is data categorisation?, Tink blog"
    url: https://tink.com/blog/open-banking/what-is-data-categorisation/
summary: Refactored Tink's transaction categorisation, moved it from Go to Python as Tink's first Vertex AI product, and introduced a new NER and tagging approach.
---

## Context

Categorisation is harder than it looks. A single wrong label turns a user's weekly groceries at their local store into "gifts", and every budget, insight and risk signal built on top of it is wrong. Tink had offered [categorisation](https://tink.com/blog/open-banking/what-is-data-categorisation/) for years, and by the time I joined the team the need to improve quality was acute: recurring transaction prediction, risk work and customer complaints all surfaced the same issues. The product combined a Fasttext + XGBoost classifier stack with static regex patterns, and its Go backend made experimentation painful.

## What I did

- Led the refactoring of the codebase: fixed bugs, removed dead code and introduced testing methods the team didn't have.
- Migrated the categorisation service from Go to Python on Vertex AI, making it the first Tink product to run on Vertex AI. The move unlocked the data-science team to iterate on model architecture without the Go backend being a blocker.
- Introduced a new categorisation approach built on an anonymised data lake, combining transaction tagging with named entity recognition (NER) instead of relying on static regex rules.

## Outcome

The data-science team could iterate on model architecture again without backend rewrites, and the tagging and NER approach moved categorisation beyond static rules. Customer complaints about wrong categories dropped as quality improved.

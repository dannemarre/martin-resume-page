---
slug: 2023-q1-tink-ai-engineer-merchant
role: AI Engineer
company: Tink
companyUrl: https://tink.com/
projectTitle: Merchant Information
industry: Fintech
start: 2023-Q1
end: 2024-Q3
ongoing: false
nda: false
tags:
  - Python
  - LLM
  - NER
  - Vertex AI
  - Vector Search
  - LangChain
  - PyTorch
  - Label Studio
  - Apache Airflow
  - Apache Spark
  - Regex
  - Wikidata
  - Brandfetch
  - BigQuery
  - SQL
summary: Built the AI pipeline that turned raw transaction descriptions into structured merchant, product, and location data — the entity backbone for Tink's Merchant Information product.
---

## Context

Tink is an open banking platform in Europe, used by banks, fintechs, and startups to build data-driven financial services. Mastercard's mandate required banks to surface richer transaction detail to customers — but Tink's existing data sources didn't have the merchant, product, or location detail the mandate demanded. Merchant Information had to be built from scratch.

## What I did

- Built the NER pipeline that pulled organizations, products, payment providers, and locations out of raw transaction descriptions.
- Built the entity database that mapped extracted strings to canonical brands and merchants — disambiguating "AMZN MKTPL", "Amazon.de", and "Amazon EU SARL" as the same entity.
- Built the vector-search layer that fell back to fuzzy matching when string extraction was ambiguous, and managed the labelling pipeline (Label Studio + a small team of labellers) that kept ground truth fresh.

## Outcome

With richer enrichment, Tink's customer banks could now surface "what is this charge?" answers to end users, segment transactions by merchant category for budgeting features, and run real-time fraud signals keyed off merchant identity — use cases not reachable from the raw transaction strings alone.

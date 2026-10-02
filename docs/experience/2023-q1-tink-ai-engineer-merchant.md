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
  - Technical Leadership
  - People Management
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
references:
  - title: "Merchant Information, Tink product page"
    url: https://tink.com/products/merchant-information/
  - title: "Meet Merchant Information, Tink launch announcement"
    url: https://tink.com/blog/news/meet-merchant-information/
summary: Built the AI behind Tink's Merchant Information product, turning raw transaction descriptions into structured merchant, product and location data for banks across Europe.
---

## Context

Tink is an open banking platform in Europe, used by banks, fintechs, and startups to build data-driven financial services. Mastercard's mandate required banks to surface richer transaction detail to customers, but Tink's existing data sources didn't have the merchant, product, or location detail the mandate demanded. [Merchant Information](https://tink.com/products/merchant-information/) had to be built from scratch: a product that tells banks and their users which merchant, brand and location is behind every transaction.

## What I did

- Built the NER pipeline that pulled organizations, products, payment providers, and locations out of raw transaction descriptions.
- Built the entity database that mapped extracted strings to canonical brands and merchants, disambiguating "AMZN MKTPL", "Amazon.de", and "Amazon EU SARL" as the same entity.
- Built the vector-search layer that fell back to fuzzy matching when string extraction was ambiguous, and managed the labelling pipeline (Label Studio + a small team of labellers) that kept ground truth fresh.
- Held personnel responsibility for a team of six labellers and developers while the product was built.

## Outcome

Merchant Information [went live](https://tink.com/blog/news/meet-merchant-information/) in Europe, enriching millions of transactions per day. With richer enrichment, Tink's customer banks could now surface "what is this charge?" answers to end users, segment transactions by merchant category for budgeting features, and run real-time fraud signals keyed off merchant identity. None of these were reachable from the raw transaction strings alone.

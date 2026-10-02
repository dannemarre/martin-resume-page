---
slug: 2024-q3-momang-data-scientist
role: Data Scientist
company: Momang
companyUrl: https://www.momang.com/
projectTitle: AI Search
industry: SaaS
start: 2024-Q3
end: 2024-Q4
ongoing: false
nda: false
tags:
  - LLM
  - RAG
  - GCP
  - AI Pipelines
  - Vertex AI
  - LangChain
  - OpenAI
  - BigQuery
  - Python
  - SQL
  - Vector Search
  - FAISS
  - Retrieval QA Chains
  - Pydantic
  - Prompt engineering
summary: Built an AI search on Vertex AI so our operations team could match consultants and projects to new assignments by asking in natural language.
---

## Context

Momang is a CRM tailored for consultancy and staffing businesses: a SaaS for managing clients, leads, consultants and subcontractors. Our consultancy's operations team used it to match consultants with incoming assignments, and finding the right match meant hunting through the database by hand. The goal was natural-language search on top of it, used in-house first.

## What I did

- Built a Retrieval-Augmented Generation pipeline on Vertex AI: vector database via Vector Search, LangChain for orchestration, OpenAI models for embeddings and retrieval QA chains.
- Modelled Momang's consultant + project data so the RAG system could answer cross-entity questions (e.g. "which Stockholm-based React developers worked on healthcare projects?").
- Tuned prompts and retrieval to balance recall (don't miss a real match) against precision (don't surface noise).

## Outcome

The operations team finds matching consultants and past projects for new assignments faster, by asking in natural language instead of building filter queries. What used to require knowing Momang's schema is now one question.

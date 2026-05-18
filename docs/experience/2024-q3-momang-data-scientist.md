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
summary: Built a Retrieval-Augmented Generation system on Vertex AI so Momang's users could ask natural-language questions across their database of consultants and projects.
---

## Context

Momang is a CRM tailored for sales-consultant staffing agencies — a SaaS for managing clients, leads, consultants, and subcontractors. Sales reps spent meaningful time hunting through Momang's database to find the right consultants and projects for each lead. Momang wanted natural-language search on top of it.

## What I did

- Built a Retrieval-Augmented Generation pipeline on Vertex AI: vector database via Vector Search, LangChain for orchestration, OpenAI models for embeddings and retrieval QA chains.
- Modelled Momang's consultant + project data so the RAG system could answer cross-entity questions (e.g. "which Stockholm-based React developers worked on healthcare projects?").
- Tuned prompts and retrieval to balance recall (don't miss a real match) against precision (don't surface noise).

## Outcome

Sales reps now find the right consultants and projects faster, asking the system in natural language instead of building filter queries. What used to require knowing Momang's schema is now one question.

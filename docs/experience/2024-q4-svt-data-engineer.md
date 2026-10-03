---
slug: 2024-q4-svt-data-engineer
role: Data Engineer
company: SVT
companyUrl: https://www.svt.se/
projectTitle: "Survey data and government reporting"
industry: Broadcasting
start: 2024-Q4
end: 2026-Q1
ongoing: false
nda: false
tags:
  - AI Agents
  - BigQuery
  - DBT
  - DBT Fusion
  - Snowflake Schema
  - Power BI
  - Cloud Run
  - GCS
  - GCP
  - Python
  - SQL
  - Apache Airflow
  - GitLab
  - Data Products
  - Tableau
  - Semantic Modelling
  - Data Mesh
  - Alteryx
  - Cloud Functions
  - Stakeholder Management
summary: Built SVT's end-to-end survey data pipeline and a centralised Power BI semantic model, now the single source of truth for survey data across the organisation.
---

## Context

SVT had made a strategic shift toward becoming a more data-driven organisation with a strong user focus, driven in part by declining viewership and the need for deeper audience insights. The corporate domain owned several contracted deliverables, including the Public Service Report (PSR) and user demographic reporting, that needed both new data products and continued maintenance. Every year SVT sends out several nationwide surveys, about SVT itself and about the "temperature" of the Swedish public, which over the years add up to hundreds of thousands of responses.

## What I did

- Designed and implemented a new end-to-end survey data pipeline that replaced multiple legacy systems and unified survey processing across SVT.
- Created a generalized, extensible Snowflake fact-and-dimension schema. This became the foundation for a centralised Power BI semantic model, now the single source of truth for survey data.
- Built additional pipelines for ingesting operational and content-related data from production teams, and proposed structured data products that improved data collection, quality, and reporting for the PSR.
- Gave analysts an early agent-based way to analyse the survey data, with AI agents querying BigQuery through the bq CLI. That work led directly to the MCP servers that followed.

## Outcome

Multi-year survey analyses became faster and more reliable; teams can ingest and visualize a new survey within minutes. The pipeline became the foundation that the contracted Public Service Report (PSR) and demographic reporting deliverables run on, turning what had been multiple legacy systems into one source of truth.

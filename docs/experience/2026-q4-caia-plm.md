---
slug: 2026-q4-caia-plm
role: AI Lead
company: CAIA Cosmetics
companyUrl: https://caiacosmetics.com/
projectTitle: "Product data and PLM"
industry: Fashion
start: 2026-Q4
end: null
ongoing: true
nda: false
featured: false
tags:
  - Technical Leadership
  - PLM
  - Data Modelling
  - Data Governance
  - Regulatory Compliance
  - PPWR
  - Semantic Modelling
  - BigQuery
  - Dataform
  - GCS
  - Cloud Run
  - Document Extraction
references:
  - title: "Regulation (EU) 2025/40 on packaging and packaging waste (PPWR), EUR-Lex"
    url: https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202500040
summary: Leading CAIA's new PLM system, one source of truth for products, packaging, materials and compliance documents, built to meet the EU's new packaging regulation (PPWR).
---

## Context

CAIA's product, packaging and compliance data lived in supplier documents and shared folders. The EU Packaging and Packaging Waste Regulation ([PPWR, Regulation (EU) 2025/40](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202500040)) requires brands to know, for every packaging, what it is made of, how much of it is recycled, how recyclable it is and how much was placed on each market. CAIA needed one system to hold that, next to the product and ingredient data that cosmetics regulation already demands, and chose to build its own PLM in-house.

## What I did

- Designed the data model that links each SKU to its packaging, each packaging to its components (bottle, pump, cap, carton) and each component to its materials. Packaging gets its own ID, because one packaging is often shared by many shades, and each is tagged by level: sales, grouped, transport or e-commerce packaging.
- Defined the compliance data per component and material: supplier article code, weight, dimensions, whether it can be separated by hand, virgin or recycled material, recycled share, recyclability class and heavy-metal content (sum below 100 mg/kg). Each packaging also carries a versioned, dated PPWR traceability number.
- Specified document tracking for drawings, material specifications, heavy-metal and recycled-content certificates and declarations of conformity, each with version, date and status (complete, missing or expired).
- Added the product side: formula ID and version, ingredient lists with concentrations and CAS numbers, ingredient origin, PAO, warnings, approved markets, substantiated claims, and links to each product's PIF and CPSR.
- Built the platform on GCS file storage with extractors that read product drawings, packaging plans, specifications and legal contracts and turn them into structured data, a supplier portal where suppliers upload their documents, and a web app on Cloud Run for the team to review and complete the data.
- Building the integration with CAIAverse, so units sold per SKU, year, country and channel (with Sweden separate), together with purchased component volumes, turn into tonnes of each material placed on each market.

## Outcome

In progress. When complete, CAIA will have one place to answer what PPWR asks per packaging and per market, and material reporting can be produced from data instead of assembled by hand from documents.

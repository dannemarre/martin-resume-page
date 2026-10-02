---
slug: 2021-q3-valtech-radon-fullstack
role: Fullstack Developer
company: Valtech
companyUrl: https://www.valtech.com/
projectTitle: "Radon: digital marketing platform"
industry: Advertising
start: 2021-Q3
end: 2022-Q1
ongoing: false
nda: false
tags:
  - Java
  - Python
  - JavaScript
  - Clojure
  - API
  - MACH
  - Microservices
  - Frontend
  - Backend
  - CSS
  - Bitbucket
  - HTML
  - React Native
references:
  - title: "Valtech Radon"
    url: https://www.valtechradon.com/
summary: "Rebuilt the backend of Radon's digital marketing platform: restored the social-media API integrations and split them out into independent microservices."
---

## Context

My main assignment at Valtech was for Radon (House of Radon, now Valtech Radon), a creative agency Valtech acquired in February 2021. Radon ran a digital marketing platform that had drifted out of sync with the social-media APIs, eroding the accuracy of the campaign tracking its clients paid for.

## What I did

- Owned the backend rewrite of Radon's campaign platform and re-integrated it with Twitter (now X), Facebook, LinkedIn and Instagram, so campaign metrics flowed accurately again.
- Restructured the backend around microservices and API-first patterns, so each social integration could evolve on its own when a platform changed its API.
- Extended the frontend where the new backend exposed new fields, so the campaign-config UI matched.

## Outcome

Radon could once again manage and track multi-channel campaigns reliably. With one microservice per integration, a change from any single social platform became a local patch instead of a backend rework.

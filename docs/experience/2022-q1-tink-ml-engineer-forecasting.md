---
slug: 2022-q1-tink-ml-engineer-forecasting
role: Machine Learning Engineer
company: Tink
companyUrl: https://tink.com/
projectTitle: Forecasting checking-account balance
industry: Fintech
start: 2022-Q1
end: 2022-Q2
ongoing: false
nda: false
tags:
  - Python
  - SQL
  - Jupyter
  - Transformer models
  - Facebook Prophet
  - PyTorch
  - Regression Models
  - Scikit-learn
  - XGBoost
  - GRU
  - LSTM
  - RNN
  - Time Series Forecasting
  - Account Balance Forecasting
  - Supervised Machine Learning
summary: Investigated feasibility of forecasting checking-account balances so banks could warn customers before they overdrafted — the prototype became a production product.
---

## Context

Tink wanted a new value-added service: account balance forecasting. A user would get a predicted balance for a future date based on their previous spending patterns, letting banks proactively warn customers about overdraft risk.

## What I did

- Took on the feasibility investigation for one of the product teams.
- Used a mix of regression models and supervised learning on anonymized checking-account transactional data, splitting it into subgroups to handle the noisy, random, infrequent large transactions cleanly.

## Outcome

Concluded that splitting transactional data into subgroups and forecasting them separately was a viable approach — it minimized the error contribution from infrequent, high-variance transactions. The project was later productized.

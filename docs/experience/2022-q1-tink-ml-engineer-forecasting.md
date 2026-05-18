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

Tink wanted a new feature: account-balance forecasting. A user would get a predicted balance for a future date based on their previous spending patterns, letting banks proactively warn customers about overdraft risk. I ran the feasibility investigation as my Master's thesis at Uppsala, partnered with one of Tink's product teams.

## What I did

- Tested a range of model families on anonymised checking-account data — regression baselines, XGBoost, Facebook Prophet, and RNN variants (GRU/LSTM) — to find what gave acceptable error rates for forward-looking predictions.
- Found that splitting transactional data into subgroups (e.g. recurring bills, salary inflows, one-off purchases) and forecasting each separately minimised the error contribution from rare high-variance transactions.

## Outcome

The subgroup-then-forecast approach proved viable; Tink later productionised it as a real account-balance-forecasting service. The thesis itself documented the comparison across model families and the subgroup-splitting strategy.

---
slug: 2022-q1-tink-ml-engineer-forecasting
role: Machine Learning Engineer
company: Tink
companyUrl: https://tink.com/
projectTitle: "Account balance forecasting"
industry: Fintech
start: 2022-Q1
end: 2022-Q2
ongoing: false
nda: false
tags:
  - TensorFlow
  - Keras
  - Python
  - SQL
  - Jupyter
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
references:
  - title: "Forecasting checking account balance using supervised machine learning, Master's thesis, Uppsala University (2022)"
    url: https://www.diva-portal.org/smash/get/diva2:1676217/FULLTEXT01.pdf
summary: "Showed that checking-account balances can be forecast so banks can warn customers before an overdraft, a prototype that became a production product."
---

## Context

Tink wanted a new feature: account-balance forecasting. A user would get a predicted balance for a future date based on their previous spending patterns, letting banks proactively warn customers about overdraft risk. I ran the feasibility investigation as my Master's thesis at Uppsala University, partnered with one of Tink's product teams: [Forecasting checking account balance using supervised machine learning](https://www.diva-portal.org/smash/get/diva2:1676217/FULLTEXT01.pdf) (UPTEC IT 22011, June 2022).

## What I did

- Built a comparison framework that ran seven models (a naive baseline, Facebook Prophet, XGBoost, LSTM and GRU, including two optimised variants) on 24 datasets built from 377 anonymised checking accounts, scored on RMSE, MAE and MAPE.
- Found that splitting transactions into subgroups (recurring income, recurring bills, one-off purchases) and forecasting each separately limited the damage from rare, large, random transactions. Recurring income was the easiest subgroup to forecast.
- Found multivariate XGBoost with feature selection performed best overall, with GRU close behind and best at rebuilding the full balance from its subgroups.

## Outcome

The subgroup-then-forecast approach proved viable; Tink later productionised it as a real account-balance-forecasting service. The thesis itself documented the comparison across model families and the subgroup-splitting strategy.

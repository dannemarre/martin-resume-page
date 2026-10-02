---
name: analytics-report
description: Use when Martin wants a summary of visitor activity on the resume site (pageviews, unique visitors, top pages, top countries, top referrers). Queries the Google Analytics 4 Data API and returns a one-screen report.
---

# /analytics-report

Fetch a GA4 report for the resume site and summarize it.

## Prerequisites

- GA4 property is set up and the site has been deployed long enough to have traffic (give it ≥24 hours after first deploy for data to settle).
- A GCP service account with the **Viewer** role on the GA4 property:
  1. In GCP console (personal `martin-dannelind-site` project) → IAM → create a service account, e.g. `analytics-reader@martin-dannelind-site.iam.gserviceaccount.com`.
  2. Generate a JSON key, save to `~/.config/martin-resume-analytics.json` (NOT in the repo).
  3. In Google Analytics → Admin → Account Access Management → add the service account email with **Viewer** role.
- `@google-analytics/data` Node SDK installed locally: `pnpm add -D @google-analytics/data` at the repo root, OR a small standalone script run via `npx`.

## Default report period

Last 7 days. Offer to switch to 30 days if Martin asks.

## Metrics to fetch

- Total pageviews
- Unique active users
- Average engagement time
- Top 5 pages by pageviews (with URL + count)
- Top 5 countries by users
- Top 5 referrer hostnames

## Steps

1. Locate the GA4 property ID (the numeric ID, not the measurement ID `G-XXXX`). It lives in GA4 → Admin → Property Settings → Property ID. Cache it in `~/.config/martin-resume-analytics.json` under `propertyId` if not already there.
2. Set `GOOGLE_APPLICATION_CREDENTIALS=~/.config/martin-resume-analytics.json` for the script.
3. Run the report via `@google-analytics/data`'s `runReport` method. If a standalone script doesn't exist yet, propose adding `scripts/analytics-report.ts` to the repo and creating it.
4. Print the result as a compact one-screen summary:

   ```
   Resume site: last 7 days

   Pageviews:        324
   Unique users:     189
   Avg engagement:   01:24

   Top pages:
     1. /                                  142 views
     2. /experience/2025-q1-svt-ai-engineer  47 views
     3. /experience/2024-q3-momang-...       28 views
     …

   Top countries:    SE (98), US (34), DE (15), GB (11), NL (8)
   Top referrers:    linkedin.com, google.com, direct, github.com, news.ycombinator.com
   ```

## What not to do

- Never commit the service account key file. It belongs at `~/.config/martin-resume-analytics.json`, not in the repo.
- Don't fetch personal-identifying dimensions (city-level location, device IDs, IP addresses). Country + page + referrer is enough.
- If the GA4 API call fails with a 403, the service account doesn't have access. Ask Martin to add it in Google Analytics admin.

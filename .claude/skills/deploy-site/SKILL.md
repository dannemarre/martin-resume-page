---
name: deploy-site
description: Use when Martin wants to push the latest version of the resume site live to Firebase Hosting. Runs the production build with content regeneration, then deploys to the active Firebase project. Always confirms with Martin before deploying.
---

# /deploy-site

Build the site for production and deploy it to Firebase Hosting.

## Prerequisites

- `firebase` CLI installed (`npm install -g firebase-tools`). If missing, install and ask Martin to run `firebase login`.
- `.firebaserc` has a real project ID under `projects.default` (not `REPLACE_WITH_PROJECT_ID`). If it doesn't, stop and walk Martin through `firebase init hosting` for the personal `martin-dannelind-site` GCP project.
- `site/.env.production` contains `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX` (real ID, not placeholder). If it doesn't, GA4 will be disabled in the deployed site, so confirm with Martin whether to proceed.

## Steps

1. **Verify Firebase login**: `firebase projects:list 2>&1 | head -5`. If the response is an auth error, stop and ask Martin to run `firebase login`.
2. **Verify the active project**: `firebase use` should print the personal project name (e.g. `martin-dannelind-site`). If it points elsewhere, abort and ask which project to target.
3. **Run `pnpm build`** from the repo root. This in turn runs `pnpm content` (regenerates `site/app/generated/content.ts`, `site/public/llms.txt`, `site/public/sitemap.xml`) and the Vite + React Router build (prerenders all routes to `site/build/client/`).
4. **Verify the build output exists**: `ls site/build/client/index.html` should succeed.
   - **Check the personal letter.** `docs/letter/` is git-ignored (the repo is public), so a build only includes the letter where that folder exists. Read the `[build-content] letter:` line from the build output. If a letter is published on the live site (`curl -s <hosting-url>/ | grep -c "Personal letter"` returns 1) but this build says `letter: none`, **stop**: deploying would remove the letter. Deploy from the checkout that has `docs/letter/` instead.
5. **Confirm with Martin before deploying**. Show what's being deployed:
   - Number of prerendered pages.
   - Any uncommitted changes in `git status`.
   - Current Firebase project.
   - Whether the Personal letter tab is included (from the `letter:` line).
6. After explicit confirmation: `firebase deploy --only hosting`. Capture the hosting URL from the output and surface it to Martin.
7. **Smoke-check the deploy**: `curl -I https://<hosting-url>/` → 200, `curl -sL https://<hosting-url>/llms.txt | head -5` → expected content.

## What not to do

- Never run `firebase deploy` without Martin's explicit go-ahead in chat.
- Never use `--force` or `--no-localhost` to bypass auth.
- Never deploy with uncommitted changes unless Martin confirms. Note them and ask first.
- Never deploy if `.firebaserc` still has the placeholder project ID.

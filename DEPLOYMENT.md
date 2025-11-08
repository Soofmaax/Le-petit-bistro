# Deployment Guide

This document describes how to deploy the frontend template and the optional backend to staging/production.

## Frontend (Vite + React)

### Vercel

Requirements:
- Secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

Deploy:
- Push to `main` triggers the "Deploy (Vercel)" job in `.github/workflows/pipeline.yml`.
- The job builds and deploys to the configured Vercel project in production environment.

Preview:
- You can adapt the pipeline to deploy previews on pull requests (set `production: false` and provide `alias`).

### Netlify

Requirements:
- Secrets in GitHub: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

Deploy:
- Push to `main` triggers the "Deploy (Netlify)" job.
- The job builds `dist` and runs `netlify deploy --prod`.

Headers:
- Security headers are provided by `public/_headers`.

### Staging

- Configure a repository variable `STAGING_URL` to point to your staging site (e.g. https://staging-le-petit-bistro.netlify.app).
- ZAP baseline security scan runs on schedule/dispatch against `STAGING_URL`.

## Backend (Optional)

If you add a backend (e.g., Express), recommend:
- Environments: dev/staging/prod configs.
- Secrets: Vault/AWS Secrets Manager.
- Observability: health (`/health`), readiness (`/ready`), logs (JSON), error tracking (Sentry).

## Branch Protection and Approvals

- Configure GitHub Environments with "production" requiring manual approval for deploy jobs.
- Enable branch protection on `main`: require status checks, PR reviews.

## Rollback

- Vercel: use deployments history to rollback.
- Netlify: deploy previous build artifact or trigger a previous deployment.
# Daily Success — Personal OS Final

Production-ready static Personal OS for GitHub Pages with Supabase authentication/cloud sync and an authenticated Supabase Edge Function for AI.

## Deploy
Upload these files to the root of the GitHub Pages repository:
- index.html
- sw.js
- manifest.webmanifest
- daily-success-icon.png
- icon-192.png
- icon-512.png
- README.md

Remove older unused app files such as `app.js`, `script.js`, `style.css`, `cloud-sync.js`, `service-worker.js`, `supabase-config.js`, and `manifest.json`.

## AI
The deployed `daily-success-ai` Supabase Edge Function expects an `OPENAI_API_KEY` secret in Supabase Edge Functions > Secrets. The browser app never contains that secret.

AI is intentionally on-demand. It supports:
- Next Best Action
- Daily Briefing
- Plan My Day
- Inbox Triage
- Project Rescue
- Weekly Strategy
- Pattern Analysis
- Freeform Advisor chat

Structured AI changes are proposals only and require user approval in the app before data is changed.

## Data safety
The app keeps the existing localStorage key `dailySuccessV2` for compatibility with prior Daily Success versions and continues local-first saving with background Supabase sync.

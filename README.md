# Daily Success — Personal OS 2.0 (Cloud Edition)

This build keeps the existing Daily Success local-first + Supabase architecture and adds the larger Personal OS layer.

## What is new
- Projects + milestones + project-linked tasks
- Routines with reusable steps and daily run history
- Year / Quarter / Month / Week planning hierarchy
- Daily Briefing + local OS Suggestions
- Time blocking inside Calendar
- Focus Mode with logged focus sessions
- Ctrl/Cmd + K Command Center + universal search
- Knowledge Vault
- Auto-built Timeline
- Local Insights engine (including cautious correlations)
- Monthly / Quarterly / Yearly reviews
- Modular area dashboards (turn modules on/off and reorder them)
- AI-ready context permissions + AI context export

## Cloud sync
Everything remains in the same `dailySuccessV2` localStorage state and the same Supabase `public.app_data` JSONB row. Existing V3/Cloud data is merged with new V4 defaults automatically. No database migration is required for these new modules.

## AI note
The app now prepares the data/context layer for an AI coach, but it does **not** put an AI provider secret into browser code. Live AI recommendations should be added later through a secure server-side function (for example a Supabase Edge Function with a server-side model key). The current Daily Briefing, Suggestions and Insights run locally.

## Deploy to GitHub Pages
1. In the current app, Settings → Export JSON first.
2. Replace the repo contents with the files from this package.
3. Commit/push and wait for GitHub Pages to redeploy.
4. Hard-refresh the published site once.
5. Sign in and confirm the top-right cloud pill says `Synced`.

## Files you need in the repo
- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `daily-success-icon.png`
- `icon-192.png`
- `icon-512.png`
- `README.md`

Old standalone `app.js`, `script.js`, `style.css`, `cloud-sync.js`, `service-worker.js`, `supabase-config.js`, etc. are not used by this build and can be removed.

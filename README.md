# Daily Success — Personal OS Cloud Edition

This build adds Supabase authentication and automatic cloud sync while keeping the app local-first.

## Deploy to GitHub Pages
1. Back up your current Daily Success data with Settings → Export JSON.
2. Replace the files in your GitHub Pages repository with the files in this folder.
3. Commit and push.
4. Open the published Daily Success site and hard-refresh once if an old PWA cache appears.
5. Click the cloud status pill (`Local only`) or Settings → Cloud Account and sign in.

## How saving works
- Every edit is written immediately to browser localStorage (`dailySuccessV2`).
- When signed in, changes are automatically debounced and synced to Supabase.
- On a new device, signing in loads the newer cloud copy.
- If the local device has newer edits, it uploads them instead.
- JSON Export/Import remains available as a manual backup.

## Supabase project
This build is configured for the Daily Success Supabase project and uses its publishable browser key. No secret or service-role key is included.

## Database security
The `public.app_data` table has Row Level Security enabled. Authenticated users can SELECT/INSERT/UPDATE/DELETE only the row where `user_id = auth.uid()`.

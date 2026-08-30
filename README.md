# Daily Success — Personal OS (Studio Update)

A single-user personal operating system for getting information out of your head and organizing daily life without turning everything into admin.

## What changed in the Studio update

### Fully customizable check-ins
Check-ins are no longer hard-coded health panels. Open **Check-ins** from the sidebar and create exactly what you want to track.

Each check-in can have:
- A custom name
- Life area (Health, Fitness, Nutrition, School, Work, Finances, or Life)
- Input type: number, scale/slider, yes/no, or short text
- Unit, minimum, maximum, and step
- Custom icon and color
- Optional visibility on the Today dashboard
- Optional chart on the Stats page
- Custom display order using the up/down controls

Starter check-ins include Sleep, Energy, Steps, Protein, Water, Bodyweight, Study Hours, and Focused Work. **All of them can be edited or removed.**

Gut comfort, bloating, acne, skin dryness, AM/PM skincare, mood, sleep quality, rehab, caffeine, calories, carbs, fat, and fruit/veg are now **optional one-click templates**, not permanent panels.

### Visual makeover
- New SVG icon system throughout navigation and dashboards
- Richer card depth and translucent surfaces
- Layered gradients and subtle background texture
- Area-specific color accents
- Custom color/icon treatment for every check-in
- More polished Today dashboard, quick actions, modals, and tracker cards
- Responsive mobile layout retained

### Existing features retained
- Daily Success score
- Tasks and recurring habits
- Brain Dump / Inbox
- Goals
- Workout logging with exercises, sets, reps, and weight
- School and Work dashboards
- Finance snapshot and manual transactions
- Monthly calendar
- Stats and trends
- Lists
- Weekly Reset
- Momentum and streaks
- Light / dark / system themes
- Accent color selection
- JSON backup / restore
- Offline PWA support

## Existing V2 data
The app intentionally keeps using the browser storage key `dailySuccessV2`, so an existing V2 installation can carry its browser-local tasks, goals, check-ins, workouts, etc. into this update. The new check-in definitions are added around that existing data.

Removing a check-in definition does not aggressively erase its old historical values from backups, so you can re-add a matching optional template later without losing the underlying history.

## Deploy to GitHub Pages
1. Replace the files in your Daily Success repository with the contents of this folder.
2. Commit and push.
3. Refresh the deployed site. The service worker cache name changed in this update so the new build replaces the old offline cache.

If a phone has the PWA installed, opening it online once after deployment should pull in the updated files.

## Backups
Use **Settings → Export JSON** before major changes or moving to another device. Use **Import JSON** to restore.

## Keyboard shortcut
- **Ctrl/Cmd + K**: open Brain Dump

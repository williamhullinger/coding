# Thoughtful Gesture App (Working Title)

A mobile-first “thoughtful gesture” app that helps people quickly send the right message + card for real-life moments (birthdays, anniversaries, get well, sympathy, congrats, thank you, thinking of you). Built web-first so it can ship fast, be link-shareable, and later expand into a true mobile app.

## Why this exists
Most “cards” already exist online. The real problem is:
- People **forget to reach out**
- People are **busy**
- People **don’t know what to say**

This product wins on **speed + reminders + personalization**.

## Goals
**Portfolio goal:** Ship a real product with clear UX flows, state management, export/share, and clean UI.  
**Income goal:** Sell premium card packs (and later subscriptions) without app-store friction at first.

## Product concept (MVP)
### Core features (must-have)
- Card categories: Birthday, Anniversary, Congrats, Get Well, Sympathy, Thank You, Thinking of You
- Template gallery (start with 12–20 templates)
- Personalize: recipient name + short message
- One-tap actions:
  - Copy message
  - Download card as image OR share link
- Favorites
- “Saved people” list (manual add — no contact sync in MVP)

### Differentiator (not “just cards”)
- **Saved people + dates**
- **Upcoming occasions list**
- Reminders (Phase 2; start with email reminders in web version)

## Tech (Phase 1: web-first)
- HTML + CSS + JavaScript
- Storage: localStorage (MVP) → optional backend later
- Export: html-to-image (or canvas)
- Hosting: GitHub Pages / Netlify

## Roadmap
- Phase 1: Mobile-first web app MVP (ship as link)
- Phase 2: Reminder engine + packs
- Phase 3: React Native app (contacts + push notifications + subscriptions)

## Repo map
- `/docs` product notes, roadmap, content inventory
- `/src` app code
- `/data` template metadata
- `/tests` manual smoke checklist

## License
TBD

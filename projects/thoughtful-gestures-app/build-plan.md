# Build Plan — Thoughtful Gesture App

## Scope Lock (don’t overbuild)
### MVP (Phase 1)
✅ Template gallery (12–20 templates)  
✅ Card editor: name + message  
✅ Favorites  
✅ Export/share:
- Copy message
- Download as image (preferred) or share link

✅ Saved People (manual add):
- name
- occasion type
- date (optional in MVP, required in Phase 2)

🚫 Not in MVP
- Full contacts sync
- Push notifications
- App store subscriptions
- Accounts/login

---

## Screens (Phase 1)
1) Landing
- Value prop: “Never forget to reach out.”
- CTA: “Open Card Builder”

2) Gallery
- Categories + templates
- Search/filter later (optional)

3) Editor
- Preview template
- Inputs: Recipient name, Message
- Buttons: Favorite, Download, Copy Message

4) Favorites
- Saved templates
- Quick open to editor

5) Saved People (simple list)
- Add person form
- List view (name + occasion)

---

## Data model (simple)
### Template object (card-templates.json)
- id
- title
- category
- tags[]
- background (asset path)
- style hints (optional)

### Saved state (localStorage)
- favorites: [templateId]
- savedPeople: [{ id, name, occasion, date }]

---

## Monetization (Phase 2+)
- Free: starter pack (limited templates)
- One-time purchases:
  - Starter Premium Pack ($3.99)
  - Bundle ($7.99–$12.99)
- Later: optional subscription for monthly drops (only if usage supports it)

---

## “This is what makes it valuable”
- Reminders + upcoming occasions list
- Message suggestions per situation (short, tasteful)
- Fast share flow (3 taps)

---

## Future: React Native (Phase 3)
- Contacts integration
- Push notifications
- Apple/Google in-app purchases

# Design Brief Template (Client-Fill + Developer Build Notes)

> **How to use this**
> - Client fills out the **Client Input** fields.
> - Developer uses the **Developer Notes / Recommendations** fields to plan the build.
> - This can be converted into:
>   1) a web form (HTML/CSS/JS) and
>   2) a printable PDF version.

---

## 0) Project Info
**Project Name (working title):**  
**Company / Client Name:**  
**Primary contact name + role:**  
**Email / Phone:**  
**Date:**  
**Version:** (v1, v2, etc.)

---

## 1) Business Overview (Client Input)
**What does your business do (1–3 sentences)?**  
**Top 3 products/services:**  
1.  
2.  
3.  

**Unique selling points (why choose you?):**  
-  
-  

**Brand words (pick 3–5):** (examples: premium, friendly, rugged, minimalist, bold, playful, trustworthy)

---

## 2) Project Type + Goals (Client Input)
**What are we building?** (check one)
- [ ] Landing page
- [ ] Multi-page website
- [ ] Blog
- [ ] E-commerce (sell products)
- [ ] Booking/appointments
- [ ] Portfolio
- [ ] Dashboard / internal tool
- [ ] Web app (logged-in users)
- [ ] Other:

**Primary goal (ONE main outcome):** (examples: get calls, collect leads, sell a product, get bookings)  
**Secondary goals:**  
-  
-  

**Success metrics (if known):**  
- ( ) Increase leads by ___%  
- ( ) Increase bookings by ___/month  
- ( ) Increase email signups by ___/month  
- ( ) Reduce support requests by ___%  
- ( ) Other:

---

## 3) Audience + User Behavior (Client Input)
**Who is this for?** (age range, industry, local vs national, etc.)  
**Top 3 user needs (what they want fast):**
1.  
2.  
3.  

**Top 3 pain points (what frustrates them now):**
1.  
2.  
3.  

**Devices (check all that apply):**
- [ ] Mobile first
- [ ] Desktop heavy
- [ ] Tablet
- [ ] Accessibility important (keyboard, screen readers, contrast)

---

## 4) Competitive Landscape (Client Input)
**Top 3 competitors (links if possible):**
1.  
2.  
3.  

**What do you like about their sites?**  
**What do you want to do differently/better?**

---

## 5) Site Map / Pages / Sections (Client Input)
**Pages needed (check):**
- [ ] Home
- [ ] About
- [ ] Services
- [ ] Pricing
- [ ] Gallery / Portfolio
- [ ] Testimonials
- [ ] Blog
- [ ] Contact
- [ ] FAQ
- [ ] Legal (Privacy / Terms)
- [ ] Other:

**Home page sections desired (examples):**
- [ ] Hero (headline + CTA)
- [ ] Benefits/features
- [ ] Services list
- [ ] Social proof/testimonials
- [ ] Gallery
- [ ] FAQ
- [ ] Contact CTA

---

## 6) Features + Functionality (Client Input)
Check what you need:

### Contact / Lead capture
- [ ] Basic contact form
- [ ] Quote request form
- [ ] File upload (images/docs)
- [ ] Spam protection (honeypot / captcha)

### Payments / Booking
- [ ] Online payments
- [ ] Subscriptions
- [ ] Booking calendar
- [ ] Deposits

### Accounts / Security
- [ ] User accounts / login
- [ ] Admin dashboard
- [ ] Roles (admin/user)

### Content / Integrations
- [ ] Blog/CMS (editable posts)
- [ ] Email marketing (Mailchimp, etc.)
- [ ] Google Maps embed
- [ ] Analytics (GA4)
- [ ] CRM (HubSpot, etc.)
- [ ] Other integrations:

### AI (optional)
- [ ] AI chatbot
- [ ] AI FAQ / document search
- [ ] AI summarization
- [ ] AI lead qualification
- [ ] Other:

---

## 7) Content & Assets (Client Input)
**Who provides text/content?** (Client / Developer / Both)  
**Who provides images/logo?** (Client / Developer / Both)  
**Existing brand assets available?**
- [ ] Logo files (SVG/PNG)
- [ ] Brand colors
- [ ] Fonts
- [ ] Photos
- [ ] Copywriting

**Links to assets (Drive/Dropbox/etc.):**  

---

## 8) Design Direction (Client Input)
**Style direction (pick):**
- [ ] Clean/minimal
- [ ] Bold/high contrast
- [ ] Luxury/premium
- [ ] Rustic/handmade
- [ ] Corporate
- [ ] Fun/playful
- [ ] Other:

**Color preferences:**  
**Font preferences:**  
**Sites you like (links):**  
1.  
2.  
3.  

**Things you do NOT want:** (animations, clutter, certain colors, etc.)

---

## 9) Accessibility + Compliance (Client Input)
- [ ] Must be accessible (keyboard navigation, focus outlines, contrast)
- [ ] Must support screen readers
- [ ] Legal pages required (privacy/terms)
- [ ] Industry compliance needs (HIPAA, etc.):

---

## 10) Timeline + Budget (Client Input)
**Ideal launch date:**  
**Hard deadline (if any):**  
**Budget range:**  
- [ ] <$500
- [ ] $500–$1,500
- [ ] $1,500–$5,000
- [ ] $5,000–$10,000
- [ ] $10,000+

**Ongoing maintenance desired?**
- [ ] No
- [ ] Yes (monthly)
- [ ] Yes (as-needed)

---

## 11) Approval & Communication (Client Input)
**Preferred communication:** (Text/Email/Call)  
**Who approves final decisions?**  
**Feedback turnaround expectation:** (e.g., 48 hours)

---

# Developer Notes (Build Plan / Recommendations)

## A) Recommended Build Level (choose one)
- **Level 1 — Static Site** (HTML/CSS + tiny JS): best for simple brochure/landing pages.
- **Level 2 — Dynamic Frontend** (React + TypeScript): best for dashboards, multi-step forms, app-like UI.
- **Level 3 — Full Stack** (React/TS + backend + DB): best for logins, admin panels, real data, automation.

**Selected level:**  

---

## B) Suggested Tech Stack (defaults)
### Frontend (recommended defaults)
- HTML5 (semantic structure)
- CSS (Flexbox/Grid, responsive, accessible focus states)
- JavaScript (form handling, validation, UI interactions)

**If Level 2+**
- TypeScript
- React (and later Next.js when ready)

### Data / Backend (if needed)
- SQL database (Postgres recommended long-term)
- API layer (Node or Python)

### Deployment (simple defaults)
- Static: Netlify / Vercel
- Full stack: Vercel + DB / Render / Fly.io (choose later)

---

## C) Accessibility Checklist (must-have)
- Visible focus styles (`:focus` / `:focus-visible`)
- Link states (`:link`, `:visited`, `:hover`, `:active`)
- Color contrast (avoid low contrast text)
- Form labels (every input has a `<label>` or `aria-label`)
- Button vs link semantics:
  - Navigation = `<a href="">`
  - Actions = `<button>`

---

## D) HTML Structure Recommendations
- Use semantic layout:
  - `header`, `nav`, `main`, `section`, `footer`
- Use headings in order (h1 then h2/h3…)
- Forms:
  - group related inputs with `fieldset` + `legend`
  - use `label for="id"` linked to input `id`

---

## E) CSS Recommendations
- Use a consistent spacing scale (example):
  - 4px, 8px, 12px, 16px, 24px, 32px
- Default readable line height:
  - `line-height: 1.5;`
- Responsive:
  - mobile-first, then add breakpoints
- Use `max-width` for readable text blocks:
  - `max-width: 60ch;` for long paragraphs

---

## F) JavaScript Recommendations (only when needed)
- Form validation (required fields, email format)
- Client-side UX:
  - disable submit until valid
  - show inline error messages
- Optional enhancements:
  - smooth scroll
  - accordion FAQ
  - modal dialogs (with accessibility)

---

## G) Deliverables (what you will ship)
- [ ] Wireframe / layout plan
- [ ] Design (or design reference) approved
- [ ] Working site/app
- [ ] Responsive + accessible
- [ ] Deployment live
- [ ] README + basic documentation
- [ ] Maintenance plan (if applicable)

---

## H) Testing Checklist
- Mobile layout looks correct
- Links work + correct states
- Forms submit correctly
- Keyboard-only navigation works
- Performance: images optimized, no obvious lag

---

## I) Project Sign-Off
**Client Approval Name:**  
**Client Approval Date:**  
**Developer Name:**  
**Developer Date:**  


# Client View vs Developer View

This design brief is intentionally split into two perspectives to keep communication clear and prevent misunderstandings.

---

## Client View (What the Client Sees & Fills Out)

**Purpose:**  
The Client View focuses on goals, preferences, and business context — not technical details.

Clients are expected to:
- Describe their business and audience
- Define goals and desired outcomes
- Share preferences for style, content, and functionality
- Set constraints like timeline and budget

Clients are **not required** to understand:
- Code
- Technical architecture
- Frameworks or programming languages

If a client is unsure about an answer, they can leave it blank or write “Not sure.”

---

## Developer View (How the Developer Uses This Information)

**Purpose:**  
The Developer View translates client input into technical decisions and implementation plans.

The developer uses the client’s answers to:
- Define project scope and boundaries
- Choose the appropriate tech stack
- Plan layout, components, and data flow
- Make accessibility and performance decisions
- Prevent scope creep and misaligned expectations

The developer view may include:
- HTML structure planning
- CSS layout and accessibility considerations
- JavaScript behavior and validation logic
- Framework or backend recommendations
- Notes on tradeoffs, risks, and future expansion

---

## Important Clarification

Client input defines **what** needs to be built and **why**.  
Developer decisions determine **how** it is built.

Both views work together to produce a successful, usable, and maintainable product.

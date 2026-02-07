# CSS Viewport Units — vh, vw (Viewport-Relative Units)

Viewport units allow elements to size themselves relative to the browser window.
They are commonly used for responsive layouts, full-screen sections, and fluid scaling.

---

## What Viewport Units Are

Viewport units are relative to the size of the browser’s viewport (the visible area).

- vh = viewport height
- vw = viewport width

1vh = 1% of the viewport height  
1vw = 1% of the viewport width  

These units update in real time as the viewport size changes.

---

## vh — Viewport Height

vh is relative to the height of the viewport.

### How vh Calculates
- 100vh = 100% of the viewport height
- 50vh = half the viewport height
- 1vh = 1% of the viewport height

### Common Use Cases
- Full-screen sections
- Hero banners
- Landing page layouts
- Vertical centering techniques

### Example: Full-Screen Section
HTML:
section.hero
  h1
  p

CSS:
.hero {
  height: 100vh;
}

Result:
- The section always fills the full height of the browser window

---

## vw — Viewport Width

vw is relative to the width of the viewport.

### How vw Calculates
- 100vw = 100% of the viewport width
- 50vw = half the viewport width
- 1vw = 1% of the viewport width

### Common Use Cases
- Full-width sections
- Fluid horizontal layouts
- Responsive typography (with caution)

---

## Example: Full-Viewport Hero Section

HTML:
<section class="hero">
  <h1>100vh / 100vw Example</h1>
  <p>This section fills the entire browser window.</p>
</section>

CSS:
.hero {
  width: 100vw;
  height: 100vh;
}

Result:
- The section fills the entire visible screen on any device

---

## Using vw for Typography

Viewport units can be used for font sizes to create fluid text.

Example:
h1 {
  font-size: 5vw;
}

Result:
- Text scales smoothly as the viewport width changes

---

## Cautions When Using Viewport Units

### Typography Risks
- Text can become too small on narrow screens
- Text can become too large on wide screens
- Avoid using vw alone for body text

Better approach:
- Combine vw with rem, clamp(), or media queries

---

### Mobile Viewport Issues
On mobile devices:
- Browser UI (address bar, toolbars) can change viewport height
- vh values may shift as the UI appears or disappears
- This can cause layout jumps when using 100vh

Mitigation strategies:
- Avoid relying on vh alone for critical layout spacing
- Use min-height instead of height where appropriate

---

## When to Use vh and vw

Use vh when:
- Creating full-height sections
- Designing hero or splash screens
- Aligning content relative to screen height

Use vw when:
- Creating full-width sections
- Designing fluid layouts
- Scaling large display text intentionally

---

## When NOT to Use vh and vw

Avoid for:
- Body text sizing
- Precise spacing that must remain consistent
- Layouts sensitive to mobile browser UI changes

---

## How Viewport Units Interact with Other Units

- vh and vw ignore parent elements
- They are independent of px, %, em, and rem
- They always reference the viewport size

They are best combined with:
- rem for typography
- em for component scaling
- % for container-based layouts

---

## Mental Model

- vh = percentage of screen height
- vw = percentage of screen width
- Viewport units = screen-based, not content-based

---

## Rule of Thumb

- Full-screen layout → vh / vw
- Typography → rem (optionally enhanced with vw)
- Components → em
- Containers → %
- Precision details → px

# CSS Viewport Units — vmin, vmax, dvh, svh (Follow-Up)

This file extends viewport units beyond vh/vw and covers:
- vmin / vmax (min/max viewport dimension units)
- dvh / svh (modern viewport-height units for mobile stability)

---

## vmin — Viewport Minimum

vmin is relative to the *smaller* of viewport width and height.

- 1vmin = 1% of the smaller viewport dimension

Examples:
- If viewport is 1200px wide and 800px tall:
  - 1vmin = 1% of 800px = 8px
- If viewport is 360px wide and 640px tall:
  - 1vmin = 1% of 360px = 3.6px

### When to Use vmin
- Responsive sizing that should follow the smaller dimension
- Squares/circles that scale nicely across orientations
- Maintaining proportions without caring if device is landscape/portrait

### Example: Responsive Square
.box {
  width: 30vmin;
  height: 30vmin;
}

Result:
- The box stays square and scales with the smaller screen dimension

---

## vmax — Viewport Maximum

vmax is relative to the *larger* of viewport width and height.

- 1vmax = 1% of the larger viewport dimension

Examples:
- If viewport is 1200px wide and 800px tall:
  - 1vmax = 1% of 1200px = 12px
- If viewport is 360px wide and 640px tall:
  - 1vmax = 1% of 640px = 6.4px

### When to Use vmax
- Elements that should scale with the largest dimension
- Large background sizing or big display elements where “bigger side” matters

### Example: Large Responsive Header
h1 {
  font-size: 6vmax;
}

Risk:
- Can get huge on very wide displays—use carefully (or use clamp())

---

## Why dvh / svh Exist (Mobile Viewport Problem)

On mobile, the visible viewport height changes when browser UI appears/disappears
(address bar, bottom controls).

This can cause:
- 100vh sections to jump or crop unexpectedly

Modern viewport units help control that behavior.

---

## svh — Small Viewport Height (Stable Minimum)

svh uses the “small viewport height” (when browser UI is showing).

- 100svh = full height of the viewport *with browser chrome visible*

### When to Use svh
- You want “full screen” but prefer stability (no jumping)
- Avoid layout shift when the address bar hides/shows

### Example: Stable Full-Screen Section
.hero {
  min-height: 100svh;
}

---

## dvh — Dynamic Viewport Height (Tracks UI Changes)

dvh uses the dynamic viewport height as the UI changes.

- 100dvh = current visible viewport height at that moment

### When to Use dvh
- You want the element to always match the currently visible screen space
- You’re okay with it resizing as the browser UI changes

### Example: Always-Fit Full Screen
.hero {
  height: 100dvh;
}

---

## Practical Recommendation (What Most Devs Do)

For full-screen sections on mobile:
- Prefer min-height over height
- Use svh for stability, dvh for “always-fit”

Common pattern:
.hero {
  min-height: 100vh;   /* fallback */
  min-height: 100svh;  /* stable mobile behavior */
}

Or, if you want dynamic sizing:
.hero {
  height: 100vh;       /* fallback */
  height: 100dvh;      /* dynamic behavior */
}

---

## Quick “When to Use” Summary

Use vmin when:
- sizing should follow the smaller screen dimension
- squares/circles should scale consistently

Use vmax when:
- sizing should follow the larger screen dimension
- big display elements need to scale up with big screens

Use svh when:
- you want stable full-screen behavior on mobile
- you want to minimize layout jump

Use dvh when:
- you want elements to always match the currently visible viewport
- you accept live resizing as the browser UI changes

---

## Mental Model

- vmin = 1% of the smaller side (good for squares)
- vmax = 1% of the bigger side (good for large scaling)
- svh = stable “small” height (mobile-safe)
- dvh = dynamic height that tracks browser UI changes

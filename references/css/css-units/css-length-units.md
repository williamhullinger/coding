# CSS Units — px, %, em, rem (Single Complete Reference)

This document is a complete, self-contained reference for CSS sizing units.
It explains what each unit is, how it calculates, how it affects other units,
and when to use it in real-world development.

Nothing in this document requires outside explanation.

================================================================

PX — PIXELS (ABSOLUTE UNIT)

What px Is:
- px is a fixed, absolute unit
- It does NOT scale with parent elements
- It does NOT respect user browser font-size or accessibility settings

How px Calculates:
Example:
.text {
  font-size: 16px;
}

Result:
- Always renders at 16px
- Same size regardless of nesting or user settings

How px Affects Other Units:
- If px is set on a parent element:
  - % and em calculate from that px value
- rem is NOT affected unless px is set on the html element

When to Use px:
- Borders
- Box-shadows
- Hairline UI details
- Pixel-perfect visual elements

When NOT to Use px:
- Font sizes
- Layout spacing
- Scalable components
- Accessible typography

================================================================

% — PERCENTAGE (PARENT-RELATIVE UNIT)

What % Is:
- % is relative to the parent element
- The meaning of % depends on the CSS property being used

How % Calculates (Font Size):
Example:
.parent {
  font-size: 20px;
}

.child {
  font-size: 80%;
}

Result:
- 80% of 20px = 16px

How % Calculates (Width / Height):
Example:
.container {
  width: 500px;
}

.box {
  width: 50%;
}

Result:
- 50% of 500px = 250px

How % Affects Other Units:
- % changes the computed font-size
- em uses the computed font-size
- % indirectly affects em
- % does NOT affect rem

When to Use %:
- Responsive layouts
- Fluid widths and heights
- Images and containers
- Flexbox and grid sizing

When NOT to Use %:
- Typography
- Vertical rhythm
- Precision spacing

================================================================

EM — ELEMENT-RELATIVE UNIT

What em Is:
- em is relative to the element’s computed font-size
- If no font-size is set, it inherits from the parent
- em compounds when nested

How em Calculates:
Example:
.element {
  font-size: 20px;
  margin-bottom: 1.5em;
}

Result:
- 1em = 20px
- 1.5em = 30px

em Inheritance Example:
.parent {
  font-size: 18px;
}

.child {
  padding: 1em;
}

Result:
- Padding = 18px

em Compounding Example:
.card {
  font-size: 1.25em;
}

.card p {
  font-size: 1.2em;
}

Calculation:
- Root html = 16px
- Card = 20px
- Paragraph = 24px

How em Affects Other Units:
- em compounds through nesting
- % affects em
- rem is NOT affected by em

When to Use em:
- Component padding
- Buttons
- Cards
- UI elements that scale with text

When NOT to Use em:
- Global layout spacing
- Deep nesting without intent

================================================================

REM — ROOT-RELATIVE UNIT

What rem Is:
- rem is relative only to the root html element
- It does NOT compound
- It respects user accessibility settings

How rem Calculates:
Example:
html {
  font-size: 16px;
}

.text {
  font-size: 1.25rem;
}

Result:
- 1rem = 16px
- 1.25rem = 20px

Accessibility Behavior:
- If a user increases browser font size:
  - html font-size increases
  - all rem values scale automatically

How rem Affects Other Units:
- rem ignores parent elements
- rem is unaffected by % and em
- only the root html font-size matters

When to Use rem:
- Font sizes
- Headings
- Layout spacing
- Vertical rhythm
- Accessible design

================================================================

HOW UNITS INTERACT

Inheritance Order:
- px → % → em
- rem is independent

Interaction Example:
html {
  font-size: 16px;
}

body {
  font-size: 125%;
}

.card {
  font-size: 1.2em;
  padding: 1em;
}

Calculation:
- Body = 20px
- Card = 24px
- Padding = 24px

================================================================

PROFESSIONAL USAGE PATTERN

html {
  font-size: 100%;
}

body {
  font-size: 1rem;
}

h1 {
  font-size: 2.25rem;
}

.card {
  font-size: 1rem;
  padding: 1.5em;
  margin-bottom: 2rem;
}

================================================================

WHAT TO USE AND WHEN

- Typography → rem
- Component spacing → em
- Layout sizing → %
- Fine visual detail → px

================================================================

MENTAL MODEL

- px = fixed
- % = parent-based
- em = element-based
- rem = root-based

================================================================

RULES TO REMEMBER

- If it should scale with text → use em
- If it should scale with the site → use rem
- If it should scale with the container → use %
- If it should never scale → use px

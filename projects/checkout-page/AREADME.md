# Checkout Page – Forms, Labels & Accessibility Reference

This file is a **personal reference guide** for HTML form elements, attributes, and accessibility patterns used in a checkout/payment form.

Use this README to quickly recall **correct structure**, **why each attribute exists**, and **what problems it solves**.

---

## Concepts Demonstrated

- Semantic structure with sections and headings
- Proper `<label>` ↔ `<input>` association
- Required field handling
- ARIA accessibility patterns
- Screen reader–friendly help text

---

## Elements Used

### Structural Elements
| Element | Purpose |
|------|------|
| `<section>` | Groups related content |
| `<h2>` | Section heading |
| `<form>` | Wraps form controls |
| `<p>` | Help or instructional text |

---

### Form Elements
| Element | Purpose |
|------|------|
| `<input>` | Collects user input |
| `<label>` | Describes an input field |
| `<span>` | Holds visual-only symbols (e.g. `*`) |

---

## Label & Input Association (Required)

Every input **must** have a corresponding label.

### Correct Pattern
```html
<label for="card-name">
  Name (First and Last)
  <span aria-hidden="true">*</span>
</label>
<input
  id="card-name"
  name="card-name"
  type="text"
  required
>

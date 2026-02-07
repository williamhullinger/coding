# CSS calc() Function — Dynamic Calculations in CSS

The calc() function allows you to perform calculations directly in CSS to
determine property values dynamically.

It is commonly used to create flexible and responsive layouts by combining
different units such as %, px, em, rem, and viewport units.

---

## What calc() Is

calc() is a built-in CSS function.

A function:
- Performs a specific task
- Is called by its name followed by parentheses
- Receives values called arguments

calc() takes **one argument**:
- An expression that tells CSS what to calculate

Syntax:
calc(expression)

There must be **no space** between `calc` and the opening parenthesis.

---

## What an Expression Is

An expression is a combination of:
- Values (operands)
- Operators (+, -, *, /)

The expression is evaluated into a single final value, which is then assigned
to the CSS property where calc() is used.

---

## Supported Value Types

calc() can work with:
- Lengths (px, em, rem, %, vh, vw, etc.)
- Numbers
- Percentages
- Angles
- Time values
- CSS variables
- Other CSS functions

Different units can be mixed in the same expression.

---

## Basic Example

CSS:
div {
  color: white;
  background-color: #1b1b32;
  width: calc(50% - 20px);
}

Explanation:
- 50% is calculated relative to the parent container’s width
- 20px is subtracted from that value
- The result is recalculated automatically when the container resizes

---

## Why calc() Is Useful

calc() allows values to be:
- Dynamic
- Responsive
- Automatically recalculated

It is especially useful when:
- Combining relative and absolute units
- Accounting for fixed spacing in flexible layouts
- Creating responsive designs without media queries

---

## Operators You Can Use

calc() supports:
- Addition (+)
- Subtraction (-)
- Multiplication (*)
- Division (/)

---

## Whitespace Rules (Important)

Addition (+) and subtraction (-) **must be surrounded by whitespace**.

Invalid:
calc(100% -30px)

Valid:
calc(100% - 30px)

Multiplication (*) and division (/) do not require whitespace, but it is
considered best practice to include it for readability.

---

## Operator Precedence

calc() follows standard math precedence:
- Multiplication and division happen before addition and subtraction

You can use parentheses to control order:

calc((100% - 40px) / 2)

---

## Unit Rules

### All Length Values Must Have Units

Invalid:
calc(100% - 0)

Valid:
calc(100% - 0px)

---

### Multiplication Rules

When using multiplication (*):
- One operand must be unitless

Invalid:
calc(5px * 50px)

Valid:
calc(5 * 50px)
calc(5px * 50)

---

### Division Rules

When using division (/):
- The **right operand must be unitless**

Invalid:
calc(50% / 5%)

Valid:
calc(50% / 5)

---

## Nesting calc()

calc() functions can be nested if needed.

Example:
calc(100% - calc(2 * 1rem))

Use nesting sparingly for readability.

---

## Common Use Cases

- Layout widths with padding compensation
- Responsive spacing
- Centering elements with fixed offsets
- Mixing % with fixed units
- Working with CSS variables

---

## Example: Responsive Layout Spacing

.container {
  width: calc(100% - 2rem);
}

This ensures the container always has spacing on both sides
while remaining fluid.

---

## Interaction With Other Units

- calc() works with px, %, em, rem, vh, vw, vmin, vmax, dvh, svh
- Values are recalculated when the viewport or parent changes
- calc() does not break responsiveness — it enhances it

---

## Best Practices

- Keep expressions readable
- Use whitespace around operators
- Avoid overly complex nesting
- Combine with rem, em, and viewport units thoughtfully

---

## Mental Model

- calc() = math inside CSS
- Expression → evaluated into one final value
- Best used to combine flexible and fixed measurements

---

## Rule of Thumb

Use calc() when:
- A single unit is not enough
- Layout needs both flexibility and precision
- You want responsiveness without media queries

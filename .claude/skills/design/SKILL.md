---
name: design
description: Design system skill for localhost. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# localhost Design System

You are building UI for **localhost**. Supports both **light** and **dark** themes via Tailwind's `dark:` variant pattern. Light is the default; dark overrides use the `dark:` prefix. Cool palette, sans-serif typography (Inter), compact density on a 4px grid, flat elevation (no shadows), expressive motion.

## Design Philosophy

- **Dual theme** — light mode is the default (stored as `:root`), dark mode is an opt-in variant (`.dark` class on `<html>`). Components always define the light look first, then override with `dark:`.
- **Flat elevation** — depth through color shifts and borders, never shadows. Surfaces get progressively lighter to indicate elevation (dark mode) or progressively darker (light mode).
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — Inter for body/UI text, Geist for headings/display. Never introduce a third typeface.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **cool palette** — the color temperature runs cool, matching the sans-serif typography.
- **Restrained accent** — accent shifts between modes: `#4f46e5` (indigo-600) in light mode, `#ac4bff` (purple-500) in dark mode. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role         | Light Hex              | Dark Hex                 | Example Usage                              |
| ------------ | ---------------------- | ------------------------ | ------------------------------------------ |
| Background   | `#f8fafc` (slate-50)   | `#1d293d` (slate-800)    | Page background                            |
| Surface      | `#ffffff` (white)      | `#0f172b` (slate-900)    | Cards, panels, modals                      |
| Surface Alt  | `#f1f5f9` (slate-100)  | `#1e293b` (slate-800/30) | Alternate sections (About, etc.)           |
| Text Primary | `#0f172a` (slate-900)  | `#ffffff` (white)        | Headings, body text                        |
| Text Muted   | `#475569` (slate-600)  | `#314158` (slate-700)    | Captions, placeholders, secondary info     |
| Accent       | `#4f46e5` (indigo-600) | `#ac4bff` (purple-500)   | CTAs, links, focus rings, active states    |
| Accent Soft  | `#eef2ff` (indigo-50)  | `#ac4bff/10`             | Soft highlight backgrounds (badges, pills) |
| Border       | `#d1d5db` (gray-300)   | `#444444`                | Dividers, input borders, table borders     |

### Theme Toggle Mechanism

```css
/* globals.css */
:root {
  --background: #f8fafc;
  --foreground: #020617;
  @variant dark {
    --background: #020617;
    --foreground: #ffffff;
  }
}
```

- **Default state** (`:root`, no `.dark` class) = **light mode**
- **Dark mode** = `.dark` class on `<html>` element
- Toggled by `ThemeContext` -> sets `localStorage("theme")` + `document.documentElement.classList`
- Tailwind dark mode configured via `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`
- Always define the light value first, then override with `dark:` prefix

### Status Colors (same in both modes)

| Status  | Hex       | Use                            |
| ------- | --------- | ------------------------------ |
| Success | `#00c758` | Confirmations, positive trends |
| Warning | `#f99c00` | Caution states, pending items  |
| Danger  | `#fb2c36` | Errors, destructive actions    |

### Extended Palette (both modes)

- **indigo-500:** `#625fff` — Info highlights, gradient stops
- **indigo-50:** `#eef2ff` — Light surface/highlight color
- **indigo-600:** `#4f39f6`
- **pink-500:** `#f6339a`
- **slate-400:** `#90a1b9`
- **slate-600:** `#45556c`
- **cyan-500:** `#00b7d7`
- **purple-600:** `#9810fa`

### How to Apply Colors

Use the Tailwind `dark:` variant pattern — **never use `light:`** (it doesn't exist in Tailwind v3/v4):

```tsx
{
  /* ✅ CORRECT: default = light, dark: = dark */
}
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  <p className="text-slate-600 dark:text-slate-300">Muted text</p>
  <a className="text-indigo-600 dark:text-indigo-400">Accent link</a>
</div>;

{
  /* ❌ WRONG: no "light:" prefix needed */
}
<div className="light:bg-white dark:bg-slate-900">
  {/* "light:" is not a Tailwind variant — this will not work */}
</div>;
```

## Typography

### Font Stack

- **Inter** — Heading 1, Heading 2, Heading 3
- **Geist** — Body, Caption
- **Geist Mono** — Code

### Font Sources

```css
@font-face {
  font-family: "Geist";
  src: url("fonts/Geist-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist";
  src: url("fonts/Geist-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

### Type Scale

| Role      | Family     | Size    | Weight |
| --------- | ---------- | ------- | ------ |
| Heading 1 | Inter      | 10px    | 700    |
| Heading 2 | Inter      | inherit | 700    |
| Heading 3 | Inter      | 1em     | 700    |
| Body      | Geist      | 80%     | 400    |
| Caption   | Geist      | 75%     | 400    |
| Code      | Geist Mono | 14px    | 400    |

### Typography Rules

- Body/UI: **Inter**, Headings: **Geist** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48` px

### Spacing as Meaning

| Spacing | Use                                                |
| ------- | -------------------------------------------------- |
| 4-8px   | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section            |
| 24-32px | Wide: between distinct sections                    |
| 48px+   | Vast: major page section breaks                    |

### Border Radius

Scale: `.25rem`
Default: `.25rem`

### Breakpoints

| Name | Value |
| ---- | ----- |
| xs   | 24rem |
| sm   | 31rem |
| sm   | 40rem |
| md   | 48rem |
| lg   | 64rem |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

All components must work in both light and dark mode. Use Tailwind's `dark:` variant pattern. **The default (no prefix) class is the light mode value; `dark:` overrides it.**

### Card

```tsx
<div className="bg-white dark:bg-slate-900 rounded-[.25rem] p-4 border border-gray-300 dark:border-[#444444]">
  <h3 className="text-slate-900 dark:text-white text-lg font-bold">
    Card Title
  </h3>
  <p className="text-slate-600 dark:text-gray-300">Card content goes here.</p>
</div>
```

### Button

```tsx
{
  /* Primary — same accent in both modes */
}
<button className="bg-indigo-600 dark:bg-[#ac4bff] text-white rounded-[.25rem] px-4 py-2 font-medium transition-opacity duration-150 hover:opacity-90">
  Get Started
</button>;

{
  /* Ghost */
}
<button className="bg-transparent border border-gray-300 dark:border-[#444444] text-slate-900 dark:text-white rounded-[.25rem] px-4 py-2">
  Learn More
</button>;
```

### Input

```tsx
<input
  type="text"
  placeholder="Search..."
  className="bg-white dark:bg-[#1d293d] border border-gray-300 dark:border-[#444444] rounded-[.25rem] px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:border-indigo-600 dark:focus:border-[#ac4bff] focus:outline-none"
/>
```

### Badge / Chip

```tsx
<span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-[#ac4bff]/10 text-indigo-600 dark:text-[#ac4bff]">
  New
</span>
```

### Modal / Dialog

```tsx
{
  /* Backdrop */
}
<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
  <div className="bg-white dark:bg-slate-900 rounded-[.25rem] p-6 max-w-md w-[90vw] border border-gray-300 dark:border-[#444444]">
    <h2 className="text-slate-900 dark:text-white font-bold mb-4">
      Dialog Title
    </h2>
    <p className="text-slate-600 dark:text-gray-300 mb-6">Dialog content.</p>
    <div className="flex gap-3">
      <button className="bg-indigo-600 dark:bg-[#ac4bff] text-white rounded-[.25rem] px-4 py-2 font-medium">
        Confirm
      </button>
      <button className="bg-transparent border border-gray-300 dark:border-[#444444] text-slate-900 dark:text-white rounded-[.25rem] px-4 py-2">
        Cancel
      </button>
    </div>
  </div>
</div>;
```

### Table

```tsx
<table className="w-full border-collapse">
  <thead>
    <tr className="bg-slate-100 dark:bg-[#1d293d] border-b border-gray-300 dark:border-[#444444]">
      <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 dark:text-[#314158] uppercase tracking-wider">
        Name
      </th>
      <th className="text-left px-4 py-3 text-xs font-medium text-slate-600 dark:text-[#314158] uppercase tracking-wider">
        Status
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-gray-300 dark:border-[#444444] hover:bg-gray-100 dark:hover:bg-[#1d293d]/50">
      <td className="px-4 py-3 text-slate-900 dark:text-white">Item One</td>
      <td className="px-4 py-3 text-slate-600 dark:text-gray-300">Active</td>
    </tr>
  </tbody>
</table>
```

### Navigation

```tsx
<nav className="bg-white dark:bg-slate-900 border-b border-gray-300 dark:border-[#444444]">
  <div className="flex items-center gap-2 px-4 py-3">
    <a
      href="/"
      className="px-3 py-2 rounded-[.25rem] text-indigo-600 dark:text-[#ac4bff] font-medium"
    >
      Home
    </a>
    <a
      href="/about"
      className="px-3 py-2 rounded-[.25rem] text-slate-600 dark:text-[#314158] hover:text-slate-900 dark:hover:text-white"
    >
      About
    </a>
    <button className="ml-auto bg-indigo-600 dark:bg-[#ac4bff] text-white rounded-[.25rem] px-4 py-2 text-sm font-medium">
      Get Started
    </button>
  </div>
</nav>
```

### Theme Toggle (Switch)

The toggle is a small pill-shaped switch in the Navbar:

```tsx
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={toggleTheme}
  className="w-14 h-7 rounded-full p-1 bg-indigo-200 dark:bg-slate-700 transition-colors"
>
  <motion.div
    layout
    className="w-5 h-5 rounded-full flex items-center justify-center bg-white dark:bg-slate-900"
    animate={{ x: theme === "dark" ? 0 : 28 }}
  >
    {theme === "dark" ? (
      <Moon className="w-3 h-3 text-indigo-400" />
    ) : (
      <Sun className="w-3 h-3 text-amber-500" />
    )}
  </motion.div>
</motion.button>;
```

- Pill width: `56px` (14 × 4), height: `28px` (7 × 4)
- Knob: `20px` (5 × 4) circle, animates `x: 0` (dark, left) or `x: 28` (light, right)
- Light track: `bg-indigo-200`, Dark track: `bg-slate-700`
- Spring animation: `{ stiffness: 500, damping: 30 }`

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `gradientBG`
- `pulse-ring`
- `marquee`
- `particleFloat`
- `bounce`

### Motion Tokens

- **Duration scale:** `.2s`, `.3s`, `.5s`, `300ms`, `800ms`
- **Easing functions:** `cubic-bezier(.8,0,1,1)`, `cubic-bezier(0,0,.2,1)`
- **Animated properties:** `background-color`, `color`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (.2s) for micro-interactions, long (800ms) for page transitions
- **Easing:** Use `cubic-bezier(.8,0,1,1)` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

This design uses **flat elevation** — no box-shadows anywhere.

### Elevation Strategy

| Level        | Technique                              | Use                 |
| ------------ | -------------------------------------- | ------------------- |
| 0 — Base     | Background color                       | Page background     |
| 1 — Raised   | Lighter surface + subtle border        | Cards, panels       |
| 2 — Floating | Even lighter surface + stronger border | Dropdowns, popovers |
| 3 — Overlay  | Backdrop + modal surface               | Modals, dialogs     |

### Z-Index Scale

`2, 10, 30, 50, 9999, 999999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No box-shadow** on any element — use borders and surface colors for depth
- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Inter and Geist and Geist Mono are allowed
- **No arbitrary border-radius** — use the scale: .25rem
- **No opacity for disabled states** — use muted colors instead
- **No pill shapes** — this design doesn't use rounded-full / 9999px radius
- **No `light:` Tailwind variant** — Tailwind doesn't have a `light:` variant. The default (unprefixed) class IS the light mode value.
- **No hardcoded dark-only values** — every component must look correct in both light and dark mode. Always provide both a default and a `dark:` class.

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Inter, Geist, Geist Mono only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — flat, surface color shifts only
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `http://localhost:3000`
- **Brand color:** `#ac4bff`
- **Brand typeface:** Inter

## Quick Reference

```
Mode:           Dual (light default, dark via .dark class)
                Light = unprefixed class, Dark = dark: prefix

Background:     #f8fafc (light)         / #1d293d (dark)
Surface:        #ffffff (light)          / #0f172b (dark)
Text Primary:   #0f172a (light)          / #ffffff (dark)
Text Muted:     #475569 (light)          / #314158 (dark)
Accent:         #4f46e5 (light indigo)   / #ac4bff (dark purple)
Border:         #d1d5db (light)          / #444444 (dark)
Status:         #00c758 / #f99c00 / #fb2c36 (same both modes)
Font:           Inter (body), Geist (headings)
Spacing:        4px grid
Radius:         .25rem
Motion:         Expressive, spring physics
```

## When to Trigger

Activate this skill when:

- Creating new components, pages, or visual elements for localhost
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "localhost" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# localhost DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: Tailwind CSS
> Colors: 20+ · Fonts: 3 · Components: 0
> Icon library: lucide-react · State: React Context + Tailwind
> Primary theme: light · Dark mode toggle: yes (`.dark` class on `<html>`) · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This interface supports **dual themes (light + dark)** with a flat, cool visual language. Light mode (default) uses a white/slate-50 background with indigo-600 accents; dark mode uses a slate-800/900 background with purple-500 accents via the `.dark` class on `<html>`. Elevation is achieved through color and border shifts rather than shadows — a clean, industrial aesthetic. Typography pairs **Geist** for display/headings with **Inter** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 4, 8, 12, 16, 20, 24, 28, 32px. The accent color shifts between modes (**#4f46e5** light / **#ac4bff** dark) anchoring interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token        | Dark Hex  | Light Hex | Role         | Use                                     |
| ------------ | --------- | --------- | ------------ | --------------------------------------- |
| background   | `#1d293d` | `#f8fafc` | background   | Page/app background                     |
| surface      | `#0f172b` | `#ffffff` | surface      | Card and panel backgrounds              |
| text-primary | `#ffffff` | `#0f172a` | text-primary | Headings and body text                  |
| text-muted   | `#314158` | `#475569` | text-muted   | Captions, placeholders, secondary info  |
| accent       | `#ac4bff` | `#4f46e5` | accent       | CTAs, links, focus rings, active states |
| border       | `#444444` | `#d1d5db` | border       | Dividers, input borders, table borders  |
| danger       | `#fb2c36` | `#fb2c36` | danger       | Error states, destructive actions       |
| success      | `#00c758` | `#00c758` | success      | Success states, positive indicators     |
| warning      | `#f99c00` | `#f99c00` | warning      | Warning states, caution indicators      |
| indigo-50    | `#eef2ff` | `#eef2ff` | highlight    | Soft accent backgrounds, badges         |
| indigo-500   | `#625fff` | `#625fff` | info         | Informational highlights                |
| indigo-600   | `#4f39f6` | `#4f39f6` | accent-alt   | Hover states, deeper accent             |
| pink-500     | `#f6339a` | `#f6339a` | decorative   | Gradient stops, decorative elements     |
| cyan-500     | `#00b7d7` | `#00b7d7` | decorative   | Gradient stops                          |
| purple-600   | `#9810fa` | `#9810fa` | decorative   | Gradient stops                          |

### CSS Variable Tokens

Light mode (`:root`):

```css
--background: #f8fafc;
--foreground: #020617;
```

Dark mode (`:root .dark`):

```css
--background: #020617;
--foreground: #ffffff;
```

---

## 3. Typography Rules

**Font Stack:**

- **Inter** — Heading 1, Heading 2, Heading 3
- **Geist** — Body, Caption
- **Geist Mono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Geist";
  src: url("fonts/Geist-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist";
  src: url("fonts/Geist-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Geist Mono";
  src: url("fonts/GeistMono-Regular.ttf") format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Bold.ttf") format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "Inter";
  src: url("fonts/Inter-Regular.ttf") format("truetype");
  font-weight: 400;
}
```

| Role      | Font       | Size    | Weight |
| --------- | ---------- | ------- | ------ |
| Heading 1 | Inter      | 10px    | 700    |
| Heading 2 | Inter      | inherit | 700    |
| Heading 3 | Inter      | 1em     | 700    |
| Body      | Geist      | 80%     | 400    |
| Caption   | Geist      | 75%     | 400    |
| Code      | Geist Mono | 14px    | 400    |

**Typographic Rules:**

- Limit to 3 font families max per screen
- Use **Inter** for body/UI text, **Geist** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes

---

## 4. Component Stylings

No components detected. Scan `src/components/` or `components/` to populate this section.

---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48
- **Border radius:** .25rem

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |

---

## 6. Depth & Elevation

No box-shadow values detected. The design uses a **flat visual style** — elevation is conveyed through background color shifts and borders rather than shadows.

**Elevation Strategy:**

In **dark mode**, raised surfaces are lighter than the background. In **light mode**, raised surfaces are darker than the background (the pattern inverts).

| Level        | Dark Mode                    | Light Mode                  | Use                 |
| ------------ | ---------------------------- | --------------------------- | ------------------- |
| 0 — Base     | `#1d293d` (dark bg)          | `#f8fafc` (light bg)        | Page background     |
| 1 — Raised   | `#0f172b` (lighter) + border | `#ffffff` (darker) + border | Cards, panels       |
| 2 — Floating | Lighter + stronger border    | White + stronger border     | Dropdowns, popovers |
| 3 — Overlay  | Black backdrop + `#0f172b`   | Black backdrop + white      | Modals, dialogs     |

**Z-Index Scale:** `2, 10, 30, 50, 9999, 999999`

---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes gradientBG`
- `@keyframes pulse-ring`
- `@keyframes marquee`
- `@keyframes particleFloat`
- `@keyframes bounce`
- `@keyframes float`
- `@keyframes right-left`
- `@keyframes spin`

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`

---

## 8. Do's and Don'ts

### Do's

- Use `dark:` prefix for dark mode overrides — the default (unprefixed) class is always light mode
- Use `#4f46e5` (light) / `#ac4bff` (dark) for interactive elements (buttons, links, focus rings)
- Use `#f8fafc` (light) / `#1d293d` (dark) as the primary page background
- Pair **Inter** (body) with **Geist** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: .25rem
- Provide both light and dark values for every color property

### Don'ts

- Don't use `light:` prefix — Tailwind doesn't have a `light:` variant; the default class IS light mode
- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Inter and Geist and Geist Mono
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't add box-shadow — this design system uses flat elevation
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't use backdrop-blur or blur effects
- Don't leave any component without a dark mode override — every component must work in both themes

### Anti-Patterns (detected from codebase)

- No box-shadow on any element
- No blur or backdrop-blur effects
- No zebra striping on tables/lists

---

## 9. Responsive Behavior

| Name | Value | Source |
| ---- | ----- | ------ |
| xs   | 24rem | css    |
| sm   | 31rem | css    |
| sm   | 40rem | css    |
| md   | 48rem | css    |
| lg   | 64rem | css    |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.

---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Light:   bg-white border border-gray-300
Dark:    dark:bg-slate-900 dark:border-[#444444]
Radius: .25rem
Padding: 16px
Font: Inter
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary light:  bg-indigo-600 text-white
Primary dark:   dark:bg-[#ac4bff] dark:text-white
Ghost light:    bg-transparent border border-gray-300 text-slate-900
Ghost dark:     dark:border-[#444444] dark:text-white
Padding: 8px 16px
Radius: .25rem
Hover: opacity 0.9
Focus: ring with accent color
```

### Build a Page Layout

```
Light bg:  #f8fafc
Dark bg:   #1d293d
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Light:   bg-white text-slate-900 (value) / text-slate-600 (label)
Dark:    dark:bg-slate-900 dark:text-white (value) / dark:text-[#314158] (label)
Label:   12px uppercase tracking-wider
Value:   24-32px bold
Status:  use success/warning/danger from Core Palette
```

### Build a Form

```
Light:   bg-white border-gray-300
Dark:    dark:bg-[#1d293d] dark:border-[#444444]
Focus:   border-indigo-600 / dark:focus:border-[#ac4bff]
Label:   text-slate-600 / dark:text-gray-500 12px
Spacing: 16px between fields
Radius:  .25rem
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette, always provide light + dark values
3. Font: Inter, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
7. Theme: default class = light, dark: prefix = dark
```

Light: bg-white border border-gray-300
Dark: dark:bg-slate-900 dark:border-[#444444]
Radius: .25rem
Padding: 16px
Font: Inter
No shadows — use borders and surface colors for depth.

```

### Build a Button

```

Primary light: bg-indigo-600 text-white
Primary dark: dark:bg-[#ac4bff] dark:text-white
Ghost light: bg-transparent border border-gray-300 text-slate-900
Ghost dark: dark:border-[#444444] dark:text-white
Padding: 8px 16px
Radius: .25rem
Hover: opacity 0.9
Focus: ring with accent color

```

### Build a Page Layout

```

Light bg: #f8fafc
Dark bg: #1d293d
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9

```

### Build a Stats Card

```

Light: bg-white text-slate-900 (value) / text-slate-600 (label)
Dark: dark:bg-slate-900 dark:text-white (value) / dark:text-[#314158] (label)
Label: 12px uppercase tracking-wider
Value: 24-32px bold
Status: use success/warning/danger from Core Palette

```

### Build a Form

```

Light: bg-white border-gray-300
Dark: dark:bg-[#1d293d] dark:border-[#444444]
Focus: border-indigo-600 / dark:focus:border-[#ac4bff]
Label: text-slate-600 / dark:text-gray-500 12px
Spacing: 16px between fields
Radius: .25rem

```

### General Component

```

1. Read SKILL.md — Color System for dual-mode tokens
2. Start with light mode values (unprefixed Tailwind classes)
3. Add dark: overrides for every color property
4. Font: Inter, type scale from Typography section
5. Spacing: 4px grid
6. Match components to patterns above before creating new ones
7. Elevation: flat, surface shifts only
8. Validate — every value traces back to a design token. No magic numbers.

```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Geist-Black.ttf`
- `fonts/Geist-Bold.ttf`
- `fonts/Geist-ExtraBold.ttf`
- `fonts/Geist-ExtraLight.ttf`
- `fonts/Geist-Light.ttf`
- `fonts/Geist-Medium.ttf`
- `fonts/Geist-Regular.ttf`
- `fonts/Geist-SemiBold.ttf`
- `fonts/Geist-Thin.ttf`
- `fonts/GeistMono-Black.ttf`
- `fonts/GeistMono-Bold.ttf`
- `fonts/GeistMono-ExtraBold.ttf`
- `fonts/GeistMono-ExtraLight.ttf`
- `fonts/GeistMono-Light.ttf`
- `fonts/GeistMono-Medium.ttf`
- `fonts/GeistMono-Regular.ttf`
- `fonts/GeistMono-SemiBold.ttf`
- `fonts/GeistMono-Thin.ttf`
- `fonts/Inter-Black.ttf`
- `fonts/Inter-Bold.ttf`
- `fonts/Inter-ExtraBold.ttf`
- `fonts/Inter-ExtraLight.ttf`
- `fonts/Inter-Light.ttf`
- `fonts/Inter-Medium.ttf`
- `fonts/Inter-Regular.ttf`
- `fonts/Inter-SemiBold.ttf`
- `fonts/Inter-Thin.ttf`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

```

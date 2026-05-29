# localhost DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: Tailwind CSS
> Colors: 20+ · Fonts: 3 · Components: 0
> Icon library: lucide-react · State: React Context + Tailwind
> Primary theme: light · Dark mode toggle: yes (`.dark` class on `<html>`) · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This interface supports **dual themes (light + dark)** with a flat, cool visual language. Light mode (default) uses a white/slate-50 background with indigo-600 accents; dark mode uses a slate-800/900 background with purple-500 accents via the `.dark` class on `<html>`. Elevation is achieved through color and border shifts rather than shadows — a clean, industrial aesthetic. Typography pairs **Geist** for display/headings with **Inter** for body text. Spacing follows a **4px base grid** (compact density). The accent color shifts between modes (**#4f46e5** light / **#ac4bff** dark). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

### Theme Mechanism

- **Light mode** (default): `:root` — values set on the `:root` element
- **Dark mode** (opt-in): `.dark` class on `<html>` — Tailwind's custom `dark:` variant swaps all values
- Pattern: `className="[light-value] dark:[dark-value]"` — never use a `light:` prefix

### Core Palette

| Role | Light Hex | Dark Hex | Tailwind Classes |
|------|-----------|----------|-----------------|
| Background | `#f8fafc` | `#1d293d` | `bg-white dark:bg-slate-800` |
| Surface | `#ffffff` | `#0f172b` | `bg-white dark:bg-slate-900` |
| Surface Alt | `#f1f5f9` | `#334155` | `bg-slate-100 dark:bg-slate-800/30` |
| Text Primary | `#0f172a` | `#ffffff` | `text-slate-900 dark:text-white` |
| Text Muted | `#475569` | `#314158` | `text-slate-600 dark:text-slate-700` |
| Accent | `#4f46e5` | `#ac4bff` | `text-indigo-600 dark:text-[#ac4bff]` |
| Accent Soft | `#eef2ff` | `#ac4bff/10` | `bg-indigo-50 dark:bg-[#ac4bff]/10` |
| Border | `#d1d5db` | `#444444` | `border-gray-300 dark:border-[#444444]` |

### Status Colors (same in both modes)

| Status | Hex | Use |
|--------|-----|-----|
| Success | `#00c758` | Confirmations, positive trends |
| Warning | `#f99c00` | Caution states, pending items |
| Danger | `#fb2c36` | Errors, destructive actions |

### Extended Palette (same in both modes)

| Token | Hex | Use |
|-------|-----|-----|
| indigo-500 | `#625fff` | Info highlights, gradient stops |
| indigo-600 | `#4f39f6` | Hover states, deeper accent |
| pink-500 | `#f6339a` | Gradient stops, decorative |
| cyan-500 | `#00b7d7` | Gradient stops |
| purple-600 | `#9810fa` | Gradient stops |
| indigo-50 | `#eef2ff` | Light surface/highlight |

### CSS Variable Tokens

Light mode (`:root`):
```css
--background: #f8fafc;
--foreground: #020617;
```

Dark mode (`:root` with `.dark` class via `@variant dark`):
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
  src: url("http://localhost:3000/_next/static/media/fef07dbb0973bf53-s.12tyk43_3sh9u.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "Geist Mono";
  src: url("http://localhost:3000/_next/static/media/5ce348bf30bf5439-s.0ee55_hj9qcer.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "Inter";
  src: url("http://localhost:3000/_next/static/media/2c55a0e60120577a-s.0bjc5tiuqdqro.woff2") format("woff2");
  font-weight: 100;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Inter | 10px | 700 |
| Heading 2 | Inter | inherit | 700 |
| Heading 3 | Inter | 1em | 700 |
| Body | Geist | 80% | 400 |
| Caption | Geist | 75% | 400 |
| Code | Geist Mono | 14px | 400 |

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

| Level | Dark Mode | Light Mode | Use |
|-------|-----------|------------|-----|
| 0 — Base | `#1d293d` (dark bg) | `#f8fafc` (light bg) | Page background |
| 1 — Raised | `#0f172b` (lighter) + border | `#ffffff` (darker) + border | Cards, panels |
| 2 — Floating | Lighter + stronger border | White + stronger border | Dropdowns, popovers |
| 3 — Overlay | Black backdrop + `#0f172b` | Black backdrop + white | Modals, dialogs |

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
|---|---|---|
| xs | 24rem | css |
| sm | 31rem | css |
| sm | 40rem | css |
| md | 48rem | css |
| lg | 64rem | css |

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

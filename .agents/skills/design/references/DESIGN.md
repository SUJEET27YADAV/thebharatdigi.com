# localhost DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 3 · Components: 0
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: expressive

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a flat, cool visual language. Elevation is achieved through color and border shifts rather than shadows — a clean, industrial aesthetic. Typography pairs **Geist** for display/headings with **Inter** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **4px base grid** (compact density), with scale: 4, 8, 12, 16, 20, 24, 28, 32px. The accent color **#ac4bff** anchors interactive elements (buttons, links, focus rings). Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| color-slate-800 | `#1d293d` | background | Page background, darkest surface |
| color-slate-900 | `#0f172b` | surface | Card and panel backgrounds |
| tw-ring-offset-color | `#ffffff` | text-primary | Headings and body text |
| color-slate-700 | `#314158` | text-muted | Captions, placeholders, secondary info |
| color-purple-500 | `#ac4bff` | accent | CTAs, links, focus rings, active states |
| color-red-500 | `#fb2c36` | danger | Error states, destructive actions |
| color-green-500 | `#00c758` | success | Success states, positive indicators |
| color-amber-500 | `#f99c00` | warning | Warning states, caution indicators |
| color-indigo-500 | `#625fff` | info | Informational highlights |
| color-indigo-50 | `#eef2ff` | unknown | Palette color |
| color-indigo-600 | `#4f39f6` | unknown | Palette color |
| color-pink-500 | `#f6339a` | unknown | Palette color |
| color-slate-400 | `#90a1b9` | unknown | Palette color |
| color-slate-600 | `#45556c` | unknown | Palette color |
| color-cyan-500 | `#00b7d7` | unknown | Palette color |
| color-purple-600 | `#9810fa` | unknown | Palette color |
| color-pink-600 | `#e30076` | unknown | Palette color |
| color-black | `#000000` | unknown | Palette color |
| color-red-600 | `#e40014` | unknown | Palette color |
| color-amber-100 | `#fef3c6` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
--tw-border-style: dashed;
--background: #f8fafc;
--foreground: #020617;
--background: #020617;
--foreground: #fff;
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
| Level | Technique | Use |
|---|---|---|
| 0 — Base | Background color | Page background |
| 1 — Raised | Lighter surface + subtle border | Cards, panels |
| 2 — Floating | Even lighter surface + stronger border | Dropdowns, popovers |
| 3 — Overlay | Backdrop + modal surface | Modals, dialogs |

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

- Use `#ac4bff` for interactive elements (buttons, links, focus rings)
- Use `#1d293d` as the primary page background
- Pair **Inter** (body) with **Geist** (display) — these are the only allowed fonts
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: .25rem

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond Inter and Geist and Geist Mono
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't add box-shadow — this design system uses flat elevation
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't use backdrop-blur or blur effects

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
Background: #0f172b
Border: 1px solid var(--border)
Radius: .25rem
Padding: 16px
Font: Inter
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary: bg #ac4bff, text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: .25rem
Hover: opacity 0.9 or lighter shade
Focus: ring with #ac4bff
```

### Build a Page Layout

```
Background: #1d293d
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #0f172b
Label: #314158 (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #1d293d
Input border: 1px solid var(--border)
Focus: border-color #ac4bff
Label: #314158 12px
Spacing: 16px between fields
Radius: .25rem
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Inter, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
```

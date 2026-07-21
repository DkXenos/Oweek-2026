# RESPONSIVE.md — Maximalist Layout & Responsiveness Playbook

This document captures the **hand-written HTML-structure + CSS coding style** used in this
portfolio so it can be replicated in a new project of the same maximalist style.

It is a *style guide*, not a copy-paste of the CSS. The reference implementation is the Homepage's
three stacked sections — [hero-section.tsx](app/Homepage/components/hero-section.tsx),
[about-me.tsx](app/Homepage/components/about-me.tsx), and
[project-showcase.tsx](app/Homepage/components/project-showcase.tsx) — each a single-use section in
its own file with its own CSS (the section-isolation pattern in §9). `project-showcase` is the
canonical example for the grid/asset patterns (§1–§7).

The whole philosophy in one sentence:

> **Structure the DOM so flexbox alignment (`justify-content` / `align-items`) puts every asset in
> its natural resting place, then only ever resize things per-screen — never re-position them.**

If you find yourself reaching for `top / right / bottom / left` on a decorative asset to place it,
you have made a structural mistake. Go back and add a nesting layer instead.

---

## 1. The core principle: nest for position, size for responsiveness

There are two completely separate jobs in this layout:

| Job | How it's solved | Where it lives |
| --- | --- | --- |
| **Positioning** an asset (where it sits) | DOM nesting + flex `justify`/`align` + negative margins | Written **once**, at the top of the CSS (outside media queries) |
| **Sizing** an asset (how big it is on this screen) | `width` / `height` / `gap` / `margin` / `padding` / `font-size` | Repeated **inside every `@media` block** |

Positioning is solved by *structure*, so it is correct at every screen size automatically. Only
*size* changes per breakpoint. This is why the layout stays responsive without a rewrite per device.

**The anti-pattern we deliberately avoid:** dumping assets into one big outer container and
absolute-positioning each with manual `top/left`. That looks fine on one screen and breaks on every
other one, and it turns every responsive tweak into a coordinate-guessing nightmare.

---

## 2. HTML / JSX structure style

### 2.1 Nest down until flex can do the placement

Build containers from outer → inner, adding a nesting level every time you need an asset to anchor to
a specific spot. Each level is a flex container whose only job is to align its direct children.

The reference hierarchy:

```
showcase-container            (column flex; page section; owns absolute background siblings)
├── popup-overlay             (fixed modal, conditionally rendered)
├── pillar-left / pillar-right/ ribbon-whole / project-bg   (absolute-positioned STRUCTURAL siblings)
├── bento-grid                (column flex; the actual grid)
│   ├── bento-layer-1         (row flex; align-items:end)
│   │   ├── bento-item item-1 (the clickable button)
│   │   │   └── bento-img-wrapper1   (flex; justify:start align:start → anchors image + asset)
│   │   │       ├── <img> project
│   │   │       └── <img aset-1>      (position:absolute, floated over the project)
│   │   ├── aset-15           (a free-floating decorative asset, direct child of the layer)
│   │   └── bento-item item-2
│   ├── bento-layer-2         (row flex; align-items:center)
│   └── bento-layer-3         (row flex; align-items:start)
└── ribbon-bot                (absolute structural sibling)
```

Key structural rules:

- **A "layer" row is its own div** so the whole row can be aligned as a unit. The three layers use
  `align-items: end / center / start` respectively — that single difference is what creates the
  staggered bento look. No manual offsets.
- **Each project image gets its own wrapper div** (`bento-img-wrapper1` … `6`), and each wrapper has
  a **distinct `justify-content` / `align-items` pair** (`start/start`, `end/start`, `start/end`, …)
  so each project anchors to a different corner. The wrapper is the positioning unit; the image just
  fills it.
- **An overlay asset (sparkle, heart, wing) lives *inside* the same wrapper as the image it decorates.**
  It is `position: absolute` relative to that wrapper, then nudged with **negative margins**, not
  `top/left`. Because it's inside the flex-anchored wrapper, it travels with the image at every size.
- **A free-floating decorative asset** (one not tied to a specific project, e.g. `aset-15`, `aset-55`)
  is a **direct child of the layer row**, so flex spacing places it between items.
- **Structural / full-bleed elements** (background, pillars, ribbons) are **absolute-positioned
  siblings at the container level**, pinned with `top/left/right/bottom: 0` + `width/height: 100%`.
  Absolute positioning IS correct here — these are backdrop furniture, not flow content.

### 2.2 Data-drive the repeating items

The six projects come from a single `projects` array and are rendered by index. Keep the repeating
content in an array so structure and data stay separate:

```tsx
const projects = [
  { id: 1, projectId: "ill-2", src: "...", largeSrc: "...", asset: "...", className: "aset-1" },
  // ...
];
```

### 2.3 Class-naming convention

- Numbered structural classes: `item-1..6`, `bento-img-wrapper1..6`, `aset-1..6` (plus `aset-15`,
  `aset-55` for the in-between floaters). The number ties a JSX node to its sizing rules.
- Group selectors that share values: `.item-1, .item-2 { width: 80rem; }`.
- One `className` per asset carries only *identity*; all its geometry lives in CSS.

### 2.4 When inline styles are acceptable

Inline `style={{…}}` is used **only** for the popup/modal one-offs (the MORE DETAIL / CLOSE buttons)
— UI that appears once, is centered by its own flex, and never needs per-breakpoint sizing. Anything
that must respond to screen size goes in the CSS file with a class. Keep this split.

---

## 3. CSS style: the two-tier file layout

The stylesheet is intentionally split into two zones. **Preserve this split in the new project.**

### Tier 1 — Layout / structural CSS (top of file, OUTSIDE all media queries)

Declared **once**. These are properties that define *what an element is and how it anchors* and never
change between screens:

- `position` (`absolute` / `relative` / `fixed`)
- `display: flex`, `flex-direction`, `justify-content`, `align-items`
- `overflow`, `z-index`
- `top/left/right/bottom: 0` for pinned structural elements
- `object-fit`, `pointer-events`, `cursor`, `transition`
- static cosmetics: `background`, `border`, `border-radius`, `box-shadow`, `color`, `font-family`

Example (verbatim style):

```css
.pillar-left,
.pillar-right { position: absolute; z-index: 2; }

.bento-layer-1 { display: flex; flex-direction: row; justify-content: center; align-items: end; }
.bento-layer-2 { display: flex; flex-direction: row; justify-content: center; align-items: center; }
.bento-layer-3 { display: flex; flex-direction: row; justify-content: center; align-items: start; }

.aset-1 { position: absolute; }   /* WHERE it floats is set here; how big is set per-breakpoint */
```

### Tier 2 — Sizing CSS (INSIDE every `@media` block)

Repeated for **each** breakpoint. These are the properties that scale with the screen:

- `width` / `height` (usually `width: Nrem; height: auto;`)
- `gap`
- `margin` — including the **negative margins** that fine-tune overlay-asset placement
- `padding`
- `font-size`
- per-screen offsets like `ribbon-whole { top: -16rem; }`

The same block of selectors reappears in every media query; only the numbers differ. That repetition
is intentional and expected — it is the price of per-device control.

```css
@media (max-width: 1920px) and (max-height: 1080px) {
  .item-1, .item-2 { width: 26rem; height: auto; }
  .item-3          { width: 40rem; height: auto; }
  .aset-1 { width: 8rem; height: auto; margin-top: -2rem; margin-left: -2rem; }
  .ribbon-whole { top: -16rem; }
  .more-btn { font-size: 2rem; }
}
```

**Rule of thumb for which tier a property goes in:** ask *"would this value be the same on a 4K
monitor and on an iPhone?"* If yes → Tier 1 (write once). If it must shrink/grow → Tier 2 (per media
query).

---

## 4. Positioning assets with negative margins (not top/left)

Overlay assets are `position: absolute` (set once in Tier 1) but are **placed with negative margins
per breakpoint**, e.g.:

```css
.aset-1 { width: 8rem; margin-top: -2rem; margin-left: -2rem; }
```

Why negative margins instead of `top/left`:

- The asset is inside a flex-anchored wrapper, so margins nudge it *relative to its anchored corner*,
  which stays correct as the parent resizes.
- Margins scale naturally in `rem` alongside the asset's own `rem` width, so the offset stays
  proportional across breakpoints.

So: **flex + wrapper decides the corner; negative margin does the fine nudge; both scale in `rem`.**

---

## 5. Breakpoint strategy

- **No Tailwind.** Plain hand-written CSS is used specifically to keep full control over media queries.
- **Device-targeted breakpoints**, not generic `sm/md/lg`. Each query constrains **both width AND
  height** (and `orientation` at small sizes) to match real hardware:
  ```css
  @media (max-width: 3840px) and (max-height: 2160px) { /* 4K */ }
  @media (max-width: 1920px) and (max-height: 1080px) { /* 1080p */ }
  @media (max-width: 1024px) and (max-height: 768px)  and (orientation: landscape) { /* tablet */ }
  @media (max-width: 440px)  and (max-height: 956px)  and (orientation: portrait)  { /* phone */ }
  ```
- **Ordered largest → smallest.** Because they're `max-width`/`max-height`, the last matching (most
  specific / smallest) block wins.
- **`orientation` splits tablets/phones** into portrait vs landscape variants, each tuned separately.
- **Empty `@media` stubs are left as placeholders** for specific devices (e.g. iPhone 14/15 widths:
  430, 414, 393, 390, 375, 360, 344px) — pre-seeded selectors ready to fill in when a particular
  device needs tuning. They are **"emergency" breakpoints for anomaly screens**: sizes that may or
  may not ever get reported, or whose difference from an adjacent breakpoint is too minimal to be
  worth a full sizing block. Keeping them empty and ready is deliberate scaffolding, not dead code —
  if such a screen turns up, the block already exists to drop values into.

### Units

- **`rem` everywhere** for widths, heights, margins, padding, font-size — so one root `font-size`
  change can rescale the whole composition, and negative-margin offsets stay proportional.
- **Plain `rem` for gaps too** — e.g. `gap: 2rem;`. Do **not** use `clamp()` / `vw` fluid values.
  Every size is stepped explicitly per breakpoint (that's the whole point of the Tier-2 blocks);
  a fluid `clamp()` gap fights that model by scaling on a different curve than the `rem` assets it
  sits between. Keep one number per breakpoint so spacing tracks the assets exactly.
- **Write multi-value properties longhand, one side per line.** No shorthand like `padding: 0.4rem 0`
  or `margin: 1rem 2rem`. Use `padding-top` / `padding-right` / `padding-bottom` / `padding-left`
  (and the equivalent `margin-*`) as separate declarations. It keeps each Tier-2 tweak surgical —
  you change the one side you mean without decoding or rewriting a 2/3/4-value shorthand.
- `%` for full-bleed structural elements (`width/height: 100%`, `height: 80%` pillars).

---

## 6. Authoring workflow — anchor screens & propagation

The breakpoints are **not** authored independently. Each is derived from a designated **anchor
screen**, then propagated outward. This matters: when editing, **find the anchor first, get it right,
then copy its block outward** rather than tuning random breakpoints in isolation.

**Two anchor screens:**

| Anchor | `@media` query | Used as template for |
| --- | --- | --- |
| **Desktop anchor** | `(max-width: 1512px) and (max-height: 982px)` | all desktop sizes |
| **Mobile anchor** | `(max-width: 440px) and (max-height: 956px) and (orientation: portrait)` | all phone sizes |

**Propagation order:**

1. **Build the desktop anchor first** — the whole layout was designed on the 1512×982 screen.
2. **Go up from the anchor:** copy the anchor block into the next-larger breakpoint (up to 4K) and
   scale the `rem` sizes up.
3. **Then work downward:** each smaller desktop breakpoint uses **the screen directly above it as its
   template**, scaling sizes down step by step. So every block is a lightly-resized copy of its
   larger neighbor — that's why the selector list is identical across blocks and only numbers change.
4. **Mobile is a parallel track:** build the mobile anchor (440×956 portrait) the same way, then
   propagate to the other phone sizes.

**Cross-device reuse (which layout seeds which):**

- **Tablet landscape** reuses the **desktop** layout/sizing as its starting point.
- **Tablet portrait** reuses the **mobile** layout/sizing as its starting point.

Practical implication for editing: to change sizing everywhere, start at the relevant **anchor**, then
walk the copy outward in the same direction it was originally propagated. Don't edit a lone middle
breakpoint and expect consistency.

---

## 7. z-index layering scale

Layering is explicit and consistent. Rough scale used (low → high):

| z-index | Element |
| --- | --- |
| 0 | `project-bg`, `showcase-container-clip` (background) |
| 2 | `pillar-left/right` |
| 3 | `bento-grid` (content) |
| 13 | `ribbon-whole` |
| 100 | `ribbon-bot`, `showcase-container` |
| 999 | `more-btn`, `more-btn-container` |
| 10000 | overlay assets (`aset-*`) — always above the project images |
| 2000 / 999999 | popup overlay + its controls (above everything) |

Keep decorative overlay assets on a high band (`10000`) so they always render above content, and put
modals on their own top band.

---

## 8. Centering, vertical layout, and shared chrome (session-hardened rules)

These are the mistakes that cost the most time in practice. They are extensions of the
nest-for-position principle — apply the same "add a layer" instinct to the **vertical** axis and to
centering, not just to corner-anchoring.

### 8.1 Center with a flex layer, never `transform` / `left: 50%`

To place a structural backdrop asset (e.g. a centered castle pinned to the bottom), **do not** write:

```css
/* ❌ don't */
.castle { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); }
```

Instead give it a **full-parent absolute flex layer** and let flex do the centering — exactly the
same "layer" pattern used for the mascot row:

```css
/* ✅ do — the layer fills the parent; flex centers + bottom-anchors the child */
.castle-layer {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; justify-content: center; align-items: flex-end;   /* bottom-center */
  z-index: 2; pointer-events: none;
}
.castle-center { display: block; }   /* plain in-flow child; only width lives in Tier 2 */
```

Why: `left: 50% + translateX(-50%)` is a manual coordinate placement — the exact anti-pattern this
doc exists to avoid. It also subtly drifts when the parent's box changes and is one more thing to
re-reason about per breakpoint. A flex layer is self-correcting at every size and reads consistently
with the rest of the structure. **Rule: if you typed `translate` or `left: 50%` to position
something, delete it and wrap the asset in a `*-layer` flex div instead.** This applies even to
`position: absolute` backdrop furniture — absolute is fine for *taking it out of flow*, but the
*centering within that layer* is still flex's job.

### 8.2 Full-height pages: `min-height`, never a fixed `100vh`

The page container must **grow with its content** while still filling the screen when content is
short. Use `min-height: 100vh` (a floor), **not** `height: 100vh` (a fixed cage that clips or
scrolls-inside when content is taller):

```css
.page-container { position: relative; min-height: 100vh; height: auto; overflow: hidden; }
```

Full-bleed backgrounds are `position: absolute; height: 100%` children of that container. Because
the container's real height is set by its in-flow content, `height: 100%` backgrounds **always cover
exactly that height** — never less than one screen, never clipped when content pushes the page
taller. This is how "the background must cover the whole screen no matter what" is satisfied without
guessing a pixel height.

### 8.3 Footers and bottom-anchored assets: the `hero` wrapper

When a section has a **footer** and also has assets that must sit *at the bottom of the content but
above the footer* (a castle, ground-level mascots), do **not** anchor those assets to the container
bottom — the container bottom is *below the footer*, so they crash into / through it.

Add a **`hero` wrapper** that holds everything above the footer and grows to fill the leftover space:

```
page-container            (column flex; min-height:100vh)
├── gradient-bg / clouds  (absolute, z0 — full container)
├── hero                  (column flex; flex:1 1 auto; min-height:0; position:relative)
│   ├── castle-layer      (absolute flex layer → bottom-center of the HERO)
│   ├── mascot-layer      (absolute flex layer → mascots at HERO bottom)
│   ├── title             (in-flow)
│   └── countdown         (in-flow; margin-top:auto pushes it toward the hero bottom)
└── footer                (in-flow, last)
```

```css
.hero { position: relative; display: flex; flex-direction: column; align-items: center;
        width: 100%; flex: 1 1 auto; min-height: 0; }
```

`flex: 1` makes the hero absorb all space the footer doesn't use, so **the hero's bottom edge *is*
the footer's top edge.** Now `align-items: flex-end` on the castle/mascot layers rests them exactly
on the footer's top — never overlapping it. This is the nest-for-position principle on the vertical
axis: *you needed a bottom edge that isn't the page bottom, so you added a layer that provides one.*

**Corollary — margins *inside* a flex-filled hero only reposition; they never grow the page.** If the
hero is `flex: 1` inside a `min-height: 100vh` container, any margin on an in-flow child (or on a
centered content block) is absorbed by the flex fill: the child just shifts within the fixed screen
height, and the page does **not** get taller. To actually extend the page downward you must grow a
real box: pin the hero to one screen (`flex: 0 0 auto; min-height: 100vh`) and add **`padding-bottom`
to the container** (padding, not margin — the `height: 100%` backgrounds cover padding but leave a
margin gap uncovered). A margin inside the centered content is the wrong lever and is the classic
"why did my countdown move up instead of the page growing?" symptom.

### 8.4 In-flow content needs an explicit positive `z-index` to beat absolute backdrops

A static, in-flow element (e.g. an opaque footer) paints **behind** a positioned sibling that has
`z-index: 0` in the same stacking context — positioned elements win ties against static flow content.
So any in-flow content that must sit **above** the `z-index: 0` backgrounds needs
`position: relative; z-index: 3;` (some positive value) of its own, or it silently disappears behind
the gradient/clouds. Give the title, the countdown, and the footer an explicit positive z-index.

### 8.5 A fixed shared bar (navbar) needs `top: 0` AND reserved space in the layout root

Two separate bugs, both seen this session:

1. **`position: fixed` with no `top`/`left`** keeps the element at its *static flow position*. If you
   later add padding above it, its origin shifts down and it looks "pushed down." Always pin a fixed
   bar explicitly: `.navbar { position: fixed; top: 0; left: 0; }`.
2. **A fixed bar is out of flow, so page content slides underneath it.** Reserve its height **once,
   in the layout root** that wraps every page (e.g. `padding-top` on `<body>` equal to the bar's
   height) — not per-page. One rule in the shared layout fixes every route; don't duplicate a
   top-offset into each page's CSS. Match the value to the bar's height exactly (`5rem` bar → `pt-20`
   / `padding-top: 5rem`).

### 8.6 Crossover assets: overflowing a section onto the one above it

Sometimes a section's decorative assets (bushes, a pedestal) must **straddle its top edge** — half
inside the section, half poking up *over the section above it*, rendering in front of that section's
content. The pattern:

- The section is `position: relative`, `overflow: visible` (so the crossover isn't clipped), and
  carries a **high `z-index`** (e.g. `100`) so its whole stacking context — including the crossover
  children — paints in front of the preceding section.
- Each crossover asset lives in its own **absolute flex layer** pinned to the section's `top: 0`,
  flex-centered, and pulled **up** with a **negative `margin-top`** (Tier 2) so it straddles the edge.
  This is §4's negative-margin nudge and §8.1's flex-layer centering applied on the vertical axis.
- The section's own background (gradient + pattern overlay) stays a `height: 100%` child of the
  section box, so it does **not** bleed up over the section above — only the transparent crossover
  PNGs do.

A parent with `overflow: hidden` does **not** clip a *sibling* section's crossover, because the
crossover belongs to the sibling, not the clipping parent — so a footer mounted after an
`overflow: hidden` page can still poke its bushes up over that page.

---

## 9. Section isolation — keeping each section's assets inside its own box

The page is built as **one file per section** (`hero-section`, `about-me`, `project-showcase`) — not
because they're reusable components (each is used exactly once) but so **each section is a
self-contained positioning + stacking unit**. That separation is what stops section 1's absolute
assets, negative margins, and sky-high z-indexes from crashing into section 2. Three properties on the
**section root** do the containment; a fourth handles local cases.

### 9.1 `position: relative` on every section root — the containing block

Every section wrapper (`hero-container`, `about-container`, `showcase-container`) is
`position: relative`. This is the single most important line for isolation: it makes every
`position: absolute` descendant resolve against **its own section box**, not the viewport. Without it,
an absolute asset climbs to the nearest positioned ancestor (or the viewport) and floats over
unrelated sections. **Rule: any section that contains an absolute asset must itself be
`position: relative`.**

### 9.2 `overflow: hidden` on the section root — clip the bleed at the edge

`hero-container` and `about-container` are `overflow: hidden`. Any asset whose size or negative margin
would push it past the section's box is **clipped at the section boundary** instead of spilling into
the section above or below. This is the default for a "sealed" section. The **only** exception is a
section that deliberately wants a crossover asset to straddle its edge — that one section opts into
`overflow: visible` (§8.6). So: **`overflow: hidden` = sealed section (the default);
`overflow: visible` = opt-in crossover.**

### 9.3 The section root is its own stacking context — internal z-index wars stay internal

Because each section root has `position` **plus** a `z-index` (`about-container: z-index 10`,
`showcase-container: z-index 100`), it forms its **own stacking context**. Every wild z-index inside
it — including `aset-*` at `10000` — is **trapped in that context** and ranked only against its
siblings. It cannot out-stack another section's content no matter how large the number. Sections
themselves stack by their **root z-index in document order** (later section → higher root z-index).
This is why an asset at `z-index: 10000` in the showcase never paints over the about section: the
whole showcase context sits at `100`, and `10000` only matters *within* it.

**Takeaway:** you can use absurd z-index values freely *inside* a section precisely because the
section root quarantines them. The only z-index that matters section-to-section is the **root's** —
give each section root a positive z-index that ascends in document order.

### 9.4 `isolation: isolate` — a stacking context without inventing a z-index

When a child needs a **negative** z-index (e.g. `about-text-bg` at `z-index: -1`, tucked behind its
own text), put `isolation: isolate` on that child's parent (`about-text`). It forms a local stacking
context so the `-1` child stays behind the text **but never falls behind the section background**.
Reach for `isolation: isolate` whenever you want a containment boundary without picking a z-index
number — it's the clean way to trap a negative-z child.

### 9.5 Crossover is the deliberate breach of this isolation

A crossover asset (§8.6) works precisely by **opting out** of 9.1–9.3 for one element: it's a sibling
placed *outside* the sealed section's `overflow: hidden` (e.g. `top-border` is a sibling rendered
after `hero-container`, so hero's clip can't trim it), pinned absolute, and given a high z-index so it
paints over the neighbor. Read §9 and §8.6 together: **§9 seals sections by default; §8.6 is the one
sanctioned way to poke through the seal.**

---

## 10. Checklist for replicating this style in a new project

1. Build the DOM outer → inner; **add a nesting level whenever you'd otherwise reach for `top/left`.**
2. Make every container a flex box whose job is to align its direct children.
3. Put each image + its overlay assets in a dedicated wrapper; give each wrapper a distinct
   `justify/align` pair to anchor to a corner.
4. Absolute-position only *structural backdrop* elements (bg, pillars, ribbons) — pinned with
   `0` + `100%`. **Center them with a full-parent flex `*-layer`, never `transform`/`left: 50%`** (§8.1).
5. Split the CSS file: **Tier 1 (position/flex/z-index/cosmetics) at the top, once**; **Tier 2
   (width/height/gap/margin/padding/font-size) inside each `@media`.**
6. Place overlay assets with **negative margins in `rem`**, never `top/left`.
7. Write **device-targeted `@media` queries** (width + height, + orientation for small screens),
   ordered largest → smallest, all sizes in `rem`, **gaps in plain `rem` (no `clamp()`)**, and
   **multi-value props written longhand** (`padding-top/right/bottom/left`, not `padding:` shorthand).
8. Leave **empty `@media` stubs** for known device sizes you'll tune later.
9. Keep inline styles only for one-off, non-responsive UI (modals/popups).
10. With a footer, wrap everything above it in a **`flex: 1` `hero`** so bottom-anchored assets rest
    on the footer's top edge, not the page bottom (§8.3). To extend the page downward, grow a real
    box (`padding-bottom` on the container) — not a margin inside the flex-filled hero (§8.3).
11. Give in-flow content that must beat the `z-index: 0` backdrops an **explicit positive
    `z-index` + `position: relative`** (§8.4).
12. A fixed shared bar: **`top: 0; left: 0`** on the bar, and reserve its height **once in the layout
    root** (`padding-top` on `<body>`), not per page (§8.5).
13. For assets that **straddle a section's top edge** (crossover): section `overflow: visible` + high
    `z-index`; each asset in an absolute flex layer pulled up with a negative `margin-top` (§8.6).
14. **Give each section its own file and seal it** (§9): section root = `position: relative`
    (absolute children resolve to the section) + `overflow: hidden` (clip bleed at the edge) +
    a positive `z-index` that **ascends in document order** (each section is its own stacking context,
    so its internal `z-index: 10000` can't leak onto a neighbor). Only relax `overflow` to `visible`
    for a deliberate crossover. Use `isolation: isolate` to trap a negative-z child without a z-index.

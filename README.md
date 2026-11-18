# Copper Calibration — Enthusiast Rebuild

A React single-page rebuild of [coppercalibration.com](https://coppercalibration.com/),
restyled with a motorsport / car-enthusiast visual language.

Copper Calibration is a BMW tuning and diagnostics shop in Fitchburg, Wisconsin. The
service information here is factual — pulled from their live site — while the design,
layout and copy are an original concept build.

> **Unaffiliated.** This is a fan concept redesign, not an official site and not
> commissioned by the business.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

Node 18+. No environment variables, no API keys, no backend — it's a static front end.

---

## The design

Shop-floor black under a low-contrast carbon-fibre twill, brushed-steel bezels, copper
accents (the name earns it) and redline red for the hot elements. Condensed display type
(Barlow Condensed) set against monospace data labels (JetBrains Mono) for a spec-sheet
feel. Fonts are self-hosted via `@fontsource`, so it renders offline.

Interactive pieces:

| Piece | What it does |
| --- | --- |
| **Tachometer** | Hand-built SVG gauge. Runs the key-on self-test sweep to redline on load, settles to idle, and revs on demand via the *Blip the throttle* button. |
| **Redline scroll bar** | Page scroll progress rendered as a copper→red sweep under the sticky nav. |
| **Chassis ticker** | Marquee of engine and chassis codes (N54, S55, B58, S58, G80…). Pauses on hover. |
| **Service bays** | Four numbered cards with hazard-chevron edges and ghosted bay numbers that light copper on hover. |
| **Scan terminal** | Animates a full-system module read (DME, EGS, DSC, CAS, FRM) when scrolled into view. A UI motif illustrating the diagnostic process — not vehicle data. |
| **Pit-board hours** | Each day drawn as a bar across the 24-hour clock, today highlighted, with a live open/closed status computed from the real shop hours. |

Reveal-on-scroll is one-shot via `IntersectionObserver`, and the whole thing collapses
cleanly to mobile. `prefers-reduced-motion` disables the animation throughout.

---

## Content decisions

The source site is deliberately thin on specifics — no pricing, no supported-platform
list, no tune stages. Rather than invent figures for a real business:

- Tuning is organised around what's actually offered — **in-person**, **remote** and
  **tune prep** — instead of fabricated Stage 1/2/3 tiers.
- The tachometer is decorative. No horsepower, torque or dyno claims appear anywhere.
- Booking buttons point at the shop's real Google Calendar links; social links point at
  the real accounts.

Every fact lives in [`src/data/shop.js`](src/data/shop.js) — services, hours, tooling,
certifications and links. Swapping in real pricing or a platform list is a one-file edit.

---

## Structure

```
src/
├── components/
│   ├── Nav.jsx           sticky header, scroll-progress redline bar
│   ├── Hero.jsx          headline, spec strip, chassis ticker
│   ├── Tachometer.jsx    interactive SVG gauge
│   ├── Tuning.jsx        in-person / remote / prep tabs + spec sheets
│   ├── Bays.jsx          four-card service grid
│   ├── Diagnostics.jsx   ISTA+ scan terminal + toolbox
│   ├── Garage.jsx        pit-board hours, live open/closed
│   ├── Booking.jsx       closing call to action
│   └── Footer.jsx
├── hooks/useReveal.js    scroll reveal + scroll progress
├── data/shop.js          all shop content in one place
└── index.css             design system
```

Built with Vite and React 19.

---

## Projects page

`projects.html` (linked under "Bring the car. Let's find the power.") lists past and current builds from the
`projects` array at the bottom of `src/data/shop.js`. It ships empty and shows a "follow along on Instagram / TikTok"
note until builds are added. Add an entry per car (format in the comment there) and put photos in `public/projects/`.

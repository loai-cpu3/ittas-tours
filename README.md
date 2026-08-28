# إيتاس للسياحة — فرع أسيوط | Ittas Tours

Implementation of the approved designs in `.stitch_html/` against the token system in `DESIGN.md` and the brief in `PRODUCT.md`.

RTL-first Arabic marketing and booking site: React 19 + TypeScript + Vite + Tailwind CSS.

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Typecheck + production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |

## Routes

| Path | Screen | Source design |
| --- | --- | --- |
| `/` | Homepage — hero, search widget, trust bar, package grid, group band | `homepage_desktop.html` + `homepage_mobile.html` (one responsive build) |
| `/package/:slug` | Programme details — itinerary, inclusions, booking panel | `vip_details.html` |
| `/family-planner` | Family & group configurator with live estimate | `family_planner.html` |

## Where things live

```
src/
  data/site.ts        Licence, branch, phones, nav — the trust surfaces read from here
  data/packages.ts    Package catalogue (prices, itineraries, inclusions, gallery)
  lib/contact.ts      tel: and wa.me deep links, EGP formatting
  lib/search.ts       Search modes, quick filters, package filtering
  lib/pricing.ts      Group quote maths (age rates, room factor, 5% group discount)
  components/layout/  Accreditation bar, header + drawer, footer, mobile contact bar
  components/home/    Hero, search widget, trust bar, package card/grid, group band
  components/package/ Itinerary timeline, booking panel
  components/planner/ Step shell, traveller counters
```

## Design system

Tokens from `DESIGN.md` are encoded in `tailwind.config.js`, so components use names rather than hex values:

- Colour: `navy-950/800/100`, `gold-700/600/500/300/100`, `teal-600`, `linen`, `cream`, `hairline`, `ink`, `whatsapp`, `alert`
- Type: `text-display`, `text-h1`, `text-h2`, `text-lead`, `text-body`, `text-caption`, `text-badge` (fluid `clamp()` scale); `font-display` (Alexandria/Cairo), `font-body` (IBM Plex Sans Arabic), `font-latin` (Plus Jakarta Sans)
- Elevation: `shadow-card`, `shadow-card-hover`, `shadow-sticky`, `shadow-modal`
- Radii: `rounded-sm` 6px (chips) · `rounded-md` 10px (inputs, buttons) · `rounded-xl` 16px (cards) · `rounded-2xl` 24px (hero containers)

Latin numerals inside Arabic text (prices, phone numbers) are wrapped in `.ltr-nums` so bidi never reorders them.

## Conversion model

There is no checkout. Every path ends in an assisted conversation, with context already written for the advisor:

- Package cards, booking panel and the planner all build a pre-filled `wa.me` message (name, room type, party size, estimated total).
- The mobile contact bar is fixed below 768px: WhatsApp | hotline, 50/50.
- The booking panel validates the name and an Egyptian mobile number before enabling the WhatsApp hand-off.

## Content that still needs the agency's sign-off

- **Itineraries for the economy and Ramadan programmes** are drafted from the facts shown in the designs and are flagged in the UI (`draftItinerary` in `src/data/packages.ts`). The VIP itinerary is transcribed verbatim from `vip_details.html`.
- **Room pricing for the economy and Ramadan programmes**, the deposit amounts, and the planner's age/room multipliers in `src/lib/pricing.ts` are placeholders; the designs only specified the VIP room table.
- **Photography** in `public/images/` came from the design files. Replace with the agency's own licensed photos before launch.
- `assiut@ittas-tours.com` is carried over from the design; confirm it is a live mailbox.

## Deployment note

Routing uses the History API (`BrowserRouter`). Any static host must rewrite unknown paths to `index.html`, otherwise `/family-planner` 404s on a hard refresh.

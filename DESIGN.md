# Design System: إيتاس للسياحة (Ittas Tours)

<!-- impeccable:design-schema 1 -->

## 1. Visual World & Thesis

- **Thesis**: The Noble Guide & Pilgrim Companion (*المرشد الموثوق وقافلة الهدى*). Refuses generic, sterile corporate travel templates and gaudy marketing clutter. Anchors directly in 48+ years of authentic Egyptian tourism heritage (Ministry of Tourism License No. 167 from 1976 - Category A) paired with serene, high-prestige spiritual illumination for Hajj & Umrah, and refreshing coastal energy for leisure.
- **Form & Culture**: Rooted in classic Egyptian hospitality ledgers, illuminated Mecca/Madinah travel manuscripts, and modern aviation precision.
- **Direction Contract**:
  - `THESIS`: Uncompromising institutional trust and spiritual dignity over generic stock tourism fluff.
  - `OWN-WORLD`: Midnight Nile Blue (`#081B2E`), Sacred Kiswah Gold (`#C89B38`), Warm Desert Linen (`#FBF9F4`), and Coastal Teal (`#0E7490`).
  - `STORY`: Visitor instantly confirms official 1976 Category (A) licensing, effortlessly explores transparent Umrah & holiday itineraries, and connects in one tap with an Assiut travel advisor via WhatsApp or phone.
  - `FIRST VIEWPORT`: Authoritative accreditation ribbon -> Hero search & package finder with glowing golden focus -> Featured seasonal Umrah departure carousel with live seat counters -> Direct WhatsApp quick-quote action.
  - `FINISH`: Unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

---

## 2. Color Tokens & Palette Strategy

**Strategy**: Committed Palette (Midnight Nile and Warm Linen ground the surfaces; Sacred Gold and Coastal Teal carry thematic significance).

### Primary Tokens
- `color-primary-950` (`#081B2E`): Deep Midnight Nile. Used for primary headers, authoritative bars, hero backgrounds, and dark footer canvas.
- `color-primary-800` (`#0F355C`): Maritime Blue. Used for interactive button states, navigation hover, and active segment borders.
- `color-primary-100` (`#EAF2F9`): Soft Aviation Wash. Background fill for feature highlights and info pills.

### Accent & Thematic Tokens
- `color-gold-600` (`#B38012`): Mecca Brass. High-contrast text accents, star ratings, and official seal borders.
- `color-gold-500` (`#C89B38`): Sacred Kiswah Gold. Featured package borders, primary action glow, and milestone markers.
- `color-gold-100` (`#FAF4E6`): Warm Ivory Glow. Background wash for religious tourism sections, creating spiritual warmth without glare.
- `color-teal-600` (`#0E7490`): Red Sea Teal. Badges and tags for domestic beach packages (Hurghada, Sharm El Sheikh, Dahab).

### Functional & Neutral Tokens
- `color-neutral-900` (`#0F172A`): Slate Ink. Primary high-contrast Arabic body text.
- `color-neutral-600` (`#475569`): Desert Ash. Secondary metadata, flight numbers, and duration subtitles.
- `color-neutral-100` (`#F8FAFC`): Crisp Off-White. Section alternations and interactive card surfaces.
- `color-surface` (`#FFFFFF`): Pure Canvas. Main card containers, floating modal sheets, and dropdowns.
- `color-whatsapp` (`#25D366`): Direct Connect Green. Sticky WhatsApp inquiry button and verified consultant badges.
- `color-alert` (`#DC2626`): Crimson Urgency. "متبقي 4 مقاعد فقط" (limited seats) and closing booking alerts.

---

## 3. Typography & Hierarchy (RTL-First)

### Font Family
- **Headings & Display**: `Alexandria, Cairo, sans-serif` (Bold 700 / SemiBold 600) — Modern, authoritative geometric Arabic display.
- **Body, Inputs & Data**: `IBM Plex Sans Arabic, Readex Pro, sans-serif` (Regular 400 / Medium 500) — Engineered for exceptional legibility across dense Arabic itineraries, flight tables, and pricing numerals.
- **Latin / Bilingual**: `Plus Jakarta Sans, sans-serif` — Proportional harmony with Arabic glyph geometry.

### Type Scale (Fluid 1.250 Major Third)
- **Display 1 (Hero Title)**: `36px - 48px` | Weight 700 | Line-height 1.25
- **Heading 1 (Section Title)**: `28px - 32px` | Weight 700 | Line-height 1.3
- **Heading 2 (Card Title)**: `20px - 22px` | Weight 600 | Line-height 1.35
- **Lead / Subtitle**: `17px - 19px` | Weight 500 | Line-height 1.5
- **Body Text**: `15px - 16px` | Weight 400 | Line-height 1.65
- **Caption / Meta**: `13px - 14px` | Weight 400 | Line-height 1.5
- **Badge / Chip**: `11px - 12px` | Weight 600 | Line-height 1.4

---

## 4. Spacing, Elevation & Corner Language

### 8pt Spacing Rhythm
- `space-1` = `4px` (micro chip padding)
- `space-2` = `8px` (icon gap, badge margin)
- `space-3` = `12px` (input padding, compact grid)
- `space-4` = `16px` (mobile container gutter)
- `space-6` = `24px` (card internal padding, desktop grid)
- `space-8` = `32px` (section inner separation)
- `space-12` = `48px` (section vertical rhythm)
- `space-16` = `64px` (hero & footer margins)

### Corner Language
- **Badges / Chips**: `6px` (`rounded-sm`)
- **Inputs & Buttons**: `10px` (`rounded-md`)
- **Package Cards & Booking Bar**: `16px` (`rounded-xl`)
- **Hero Containers & Banners**: `24px` (`rounded-2xl`)
- **Floating Contact Triggers**: `9999px` (`rounded-full`)

### Multi-Layered Elevation
- **Card Rest**: `0 2px 8px -2px rgba(8, 27, 46, 0.06), 0 1px 3px 0 rgba(8, 27, 46, 0.04)`
- **Card Hover / Active**: `0 14px 28px -4px rgba(8, 27, 46, 0.12), 0 4px 8px -2px rgba(8, 27, 46, 0.04)`
- **Sticky Contact Bar**: `0 -4px 20px 0 rgba(8, 27, 46, 0.08)`
- **Modal / Drawers**: `0 24px 48px -12px rgba(8, 27, 46, 0.25)`

---

## 5. Signature Components & Experience Architecture

### A. The Heritage & Accreditation Top Bar
- Fixed top banner featuring the Egyptian Ministry of Tourism License No. 167 (1976) Category (A), Assiut physical branch address (شارع الجمهورية - خلف بنك القاهرة), and direct hotline dialer.

### B. Unified Travel Search & Booking Widget
- 4 interactive modes:
  1. `🕋 عمرة وحج` (Umrah & Hajj flight & land programs)
  2. `🏖️ رحلات داخلية` (Red Sea resorts, Luxor/Aswan)
  3. `✈️ حجز طيران` (Domestic & International flights)
  4. `🛂 تأشيرات وفنادق` (Custom visa issuance & hotel booking)
- Quick-filter chips for active seasons: "عمرة المولد", "عمرة رجب", "عمرة رمضان", "الغردقة 4 أيام".

### C. The Pilgrim & Traveler Package Card
- **Visuals**: 16:9 verified high-resolution photograph with status badge ("طيران مباشر", "فنادق 5 نجوم", "متاح للحجز").
- **Key Indicators**:
  - Distance indicator (e.g. `150م من الحرم المكي الشريف`).
  - Flight badge (e.g. `مطار أسيوط ⟷ جدة مباشرة`).
  - Duration (e.g. `14 يوماً / 13 ليلة`).
  - Transparent price display in EGP (ج.م) with optional installment notation.
- **Conversion CTA**:
  - Primary: High-visibility WhatsApp button with pre-filled package context.
  - Secondary: Expandable full itinerary drawer.

### D. Interactive Day-by-Day Journey Timeline
- Vertical timeline with golden step nodes, departure flight time, hotel check-in, ziyarat religious visits, and guided tour details.

### E. Mobile-First Bottom Floating Contact Bar
- Fixed on mobile screens (<768px):
  - Split 50/50: **[ 💬 واتساب مباشر للحجز ]** (`#25D366`) + **[ 📞 اتصال فوري: 01002258319 ]** (`#081B2E`).

---

## 6. Strategic Design Decisions & Rationale

| Strategic Choice | User & Market Rationale |
| :--- | :--- |
| **Why Midnight Nile (`#081B2E`) & Sacred Gold (`#C89B38`)?** | Establishes immediate institutional authority (nearly 50 years of Category A licensing) while honoring the religious sanctity and gold embroidery of the holy sites in Makkah and Madinah. |
| **Why Warm Linen (`#FAF4E6`) over sterile white?** | Prevents cold corporate detachment; evokes traditional Middle Eastern hospitality and pilgrim travel parchment. |
| **Why dual Alexandria & IBM Plex Arabic fonts?** | Alexandria delivers memorable, prestigious headlines; IBM Plex ensures dense itinerary details, hotel distances, and flight numbers remain crystal clear on mobile screens. |
| **Why prominent WhatsApp & Phone Call integration?** | High-ticket travel decisions in Upper Egypt require human consultation and reassurance rather than automated e-commerce checkout. |
| **Why upfront Ministry of Tourism License No. 167?** | Directly addresses pilgrim anxiety around unlicensed travel brokers and builds total confidence before any booking conversation begins. |

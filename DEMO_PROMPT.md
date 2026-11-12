# Ecozynth Demo — Full Page Build (Wireframe + Working Functions)

Read `CLAUDE.md` first and follow all its rules. This file replaces any earlier version of DEMO_PROMPT.md.

## 1. Goal

Build every page of the Ecozynth website as a **working wireframe**:
- **All pages and all functions work** (navigation, filters, cart, checkout flow, forms, calculator, login, account, etc.).
- **Minimal design for now**: clean, neutral, readable layout. A proper visual design pass happens later, after the client approves the structure.
- **Lorem ipsum** for body text. Short UI labels (nav items, buttons, section titles, form labels, product names) should be realistic so the pages make sense to the client.
- **Excellent mobile responsiveness** on every page.
- **Mock data only.** Do NOT connect to Payload, the database or any external API in this phase.

## 2. Where to build

- Create a separate route group: `src/app/(demo)/` with its own root `layout.tsx`. All pages live under `/demo/...`.
- Do NOT modify the template's `(frontend)` or `(payload)` route groups, `payload.config.ts` or any collections.
- Shared components: `src/components/ecozynth/` (UI primitives in `src/components/ecozynth/ui/`).
- Brand assets: `public/brand/` (logo files, see section 3.1).
- Mock data: `src/demo/data/` (one file per type: products.ts, categories.ts, blog.ts, videos.ts, faqs.ts, certificates.ts, orders.ts, testimonials.ts, india-states.ts).
- Client state (cart, auth, toasts): `src/demo/state/`.
- Placeholder formulas and constants (calculator, shipping threshold, coupon): `src/demo/config.ts`, clearly commented as placeholder values.
- Add `robots: { index: false, follow: false }` in the demo layout metadata.
- Every page sets its own metadata title in the format `Page Name | Ecozynth`.

## 3. Brand: colour palette, fonts and logo (set up GLOBALLY in Phase 1)

### 3.1 Logo files (already in the project)
- Folder: `public/brand/`
  - `public/brand/logo.png` — main logo with transparent background (icon + "ECO ZYNTH energy division" wordmark). Use this everywhere on white or light backgrounds.
  - `public/brand/logo-on-white.jpg` — same logo on a solid white background. Use only as a fallback.
- Create ONE `Logo` component in `src/components/ecozynth/Logo.tsx` that uses `next/image`, keeps the original aspect ratio, has `alt="Ecozynth"`, links to `/demo`, and accepts a `size` prop (`sm` for mobile header ~32px tall, `md` for desktop header ~40px tall, `lg` for footer/login ~48px tall). Use this component everywhere; never reference the logo file path directly in pages.
- Use the logo in: header (desktop + mobile), mobile drawer, footer, login/register page, order confirmation page, and the not-found page.
- Check whether `logo.png` truly has a transparent background. If it has a visible grey/checkerboard background, tell me, and use it only on white surfaces until I provide a clean SVG.
- Favicon: for now set the demo layout icon to `public/brand/logo.png`. (A proper square favicon from the green leaf/bolt icon will come later from the client.)
- Do NOT redraw, recolour, crop or recreate the logo in code or SVG.

### 3.2 Colour palette (taken from the logo)
Define ALL colours ONCE as CSS variables in the demo global stylesheet and map them into the Tailwind theme, so every component uses token classes (`bg-brand-green`, `text-ink`, `border-line`, `bg-aqua-50`, etc.). Never hardcode hex values inside components. Changing a value in one place must restyle the whole demo.

**Brand**
| Token | Hex | Use |
|---|---|---|
| `brand-green` | `#7AC143` | Primary buttons, active states, links, highlights (logo leaf green) |
| `brand-green-dark` | `#3E8E3E` | Hover/pressed state of green, gradients with brand-green |
| `brand-green-light` | `#EEF7E6` | Soft green backgrounds, selected chips, success-ish highlights |
| `brand-slate` | `#5F6773` | Headings accent, secondary buttons, icons (logo wordmark grey) |
| `brand-slate-dark` | `#3F4650` | Footer background (if dark footer is used later), strong headings |

**Division accents (use lightly, only to tell Aqua and Solar apart)**
| Token | Hex | Use |
|---|---|---|
| `aqua` | `#0EA5B7` | Aqua badges, icons, small accents |
| `aqua-50` | `#E6F6F8` | Aqua section/card tint, Aqua placeholder images |
| `solar` | `#F5A623` | Solar badges, icons, small accents |
| `solar-50` | `#FEF5E7` | Solar section/card tint, Solar placeholder images |

**Neutrals**
| Token | Hex | Use |
|---|---|---|
| `ink` | `#18181B` | Main text |
| `muted` | `#71717A` | Secondary text, labels, captions |
| `line` | `#E4E4E7` | Borders, dividers |
| `surface` | `#FFFFFF` | Page and card background |
| `surface-alt` | `#F7F9F6` | Alternate section background (very light green-grey) |
| `surface-hover` | `#F4F4F5` | Hover rows, hover cards |

**Status**
| Token | Hex | Use |
|---|---|---|
| `success` | `#16A34A` | Success messages, "In stock", delivered |
| `warning` | `#F59E0B` | Low stock, pending, processing |
| `danger` | `#DC2626` | Errors, "Out of stock", failed |
| `info` | `#2563EB` | Info notes, shipped |

Rules:
- Green is the main brand colour. Aqua and Solar accents are only for small touches (badges, icons, tints), never for primary buttons.
- Text on `brand-green` buttons must be white and pass contrast; if `#7AC143` with white text fails WCAG AA for normal text, use `brand-green-dark` as the button background and `brand-green` for hover/highlights instead, and tell me.
- Discount/sale price text uses `danger`; MRP struck-through text uses `muted`.

### 3.3 Fonts
- Headings: **Poppins** (weights 500, 600, 700), matching the logo's geometric style.
- Body, forms, tables, buttons: **Inter** (weights 400, 500, 600).
- Load both with `next/font/google` in the demo layout and expose them as CSS variables/Tailwind font families (`font-heading`, `font-sans`). Fallback: `ui-sans-serif, system-ui, sans-serif`.

### 3.4 Wireframe style rules (keep it simple for now)
- This is a wireframe phase: clean, neutral, readable layouts using the palette above. The full visual design pass comes later.
- Images: no external images. Use one `Placeholder` component (fixed aspect ratio box with a centred lucide icon and optional label). Tint by division: `aqua-50` for Aqua, `solar-50` for Solar, `surface-alt` for neutral.
- Rounded corners 8px (cards 12px), 1px `line` borders, no heavy shadows, no animation libraries, simple hover states only.
- Reuse UI primitives that already exist in the template (for example shadcn/ui components) if suitable; otherwise create small ones in `src/components/ecozynth/ui/`. Do not add new dependencies without asking me first. If `react-hook-form`/`zod` are already installed, use them for forms; otherwise use plain React state with a small validation helper.
- Create a `/demo/style-guide` page showing the logo sizes, every colour token as a swatch with its name and hex, font samples (h1–h4, body, small), buttons (primary, secondary, outline, ghost, disabled, loading), badges (Aqua, Solar, status colours), form fields (normal, focus, error, disabled) and a sample product card. This lets the client approve the palette quickly.

## 4. Mobile responsiveness (applies to EVERY page)

- Mobile-first. Test at 360, 390, 768, 1024 and 1440 px widths.
- No horizontal scrolling at any width. Wide content (tables, spec lists) scrolls inside its own container or turns into stacked cards on mobile.
- Tap targets at least 44×44 px. Form inputs use font-size 16px or more (prevents iOS zoom).
- Use correct input types and attributes: `type="tel"` + `inputMode="numeric"` for phone/pincode/OTP, `type="email"`, `autoComplete` values (name, tel, email, street-address, postal-code).
- Grids: product grids 2 columns on mobile, 3 on tablet, 4 on desktop. Content grids collapse to 1 column on mobile.
- Mobile navigation: hamburger opening a slide-in drawer (focus trapped, closes on Escape, overlay click and route change).
- Filters on mobile: "Filters" button opening a bottom sheet with "Apply" and "Clear".
- Product page on mobile: sticky bottom bar with price + Add to cart.
- Checkout on mobile: order summary collapsible at the top ("Show order summary ₹X").
- Sticky header that stays compact on mobile.

## 5. Accessibility basics

Semantic HTML (header, nav, main, footer, one h1 per page), labels for every input, visible focus states, `aria-expanded` on accordions/menus/drawers, error messages linked to inputs with `aria-describedby`, buttons are `<button>`, links use Next `<Link>`.

## 6. Mock data (in `src/demo/data/`)

- **Products**: 12 Aqua + 8 Solar.
  - Aqua categories: Water Softeners, Tank Filters, Shower Filters, Tap Filters, Appliance Filters, Replacement Cartridges, Water Testers, Accessories.
  - Aqua fields: id, slug, name, division `'aqua'`, category, price, mrp, rating, reviewCount, stock, badge (optional: Bestseller / New / Combo), shortDescription, specs (stages, filterLife, connectionSize, warranty), variants (optional, e.g. finish: Chrome/Black), faqs, reviews (3–5).
  - Solar categories: Residential On-Grid Kits, Hybrid Kits (with battery), Commercial Kits, Inverters, Panels, Accessories.
  - Solar fields: same base fields + capacityKw, panelCount, panelWp, phase (1/3), pricePerWp, warrantyYears, inverterBrand, includesInstallation (boolean), requiresSurvey (true for kits).
  - Make 2–3 products out of stock to test that state.
- **Blog**: 6 posts (slug, title, category, date, readTime, excerpt, body sections).
- **Installation videos**: 8 (title, category, duration, product link).
- **FAQs**: 15, grouped into Orders & Shipping, Aqua Products, Solar, Warranty & Service, Payments.
- **Certificates**: 6 (name, issuer, year, type).
- **Orders** (for the account area): 3 mock orders with different statuses (Processing, Shipped, Delivered) and timelines.
- **Testimonials**: 6.
- **India states & union territories**: full list for dropdowns.

## 7. Global layout (all pages)

- **Announcement bar**: one line, dismissible (remember dismissal for the session).
- **Header**:
  - `Logo` component (size `sm` on mobile, `md` on desktop), linking to /demo.
  - Desktop nav: Home, Aqua (dropdown with Aqua categories), Solar (dropdown with Solar categories + Solar Calculator + Get a Quote), Support (dropdown: Installation Videos, Warranty Registration, Service Request, Track Order, FAQ), About, Contact.
  - Search: input on desktop, icon opening a full-width search bar on mobile. Submitting goes to `/demo/search?q=...`. Show up to 5 instant suggestions from mock products while typing.
  - Account icon (goes to /demo/account if logged in, else /demo/login).
  - Cart icon with live item count badge.
  - Mobile: hamburger drawer containing all nav links grouped, plus two big buttons "Shop Aqua" and "Shop Solar".
- **Breadcrumbs** on every page except Home.
- **Footer**: `Logo` (size `lg`) + short text; link columns: Shop, Solar, Support, Company, Policies (link EVERY page listed below); contact details (placeholder phone, WhatsApp, email, address); social icons; payment methods row (UPI, Visa, Mastercard, RuPay, COD as text pills); copyright. Columns collapse into accordions on mobile.
- **Floating WhatsApp button** bottom-right (links to `#`; shift it up on product pages so it doesn't cover the sticky bar).
- **Toast** system for feedback (added to cart, form submitted, copied link, etc.).

## 8. Shared client state

- **Cart** (React context, persisted to `localStorage`, safe for SSR/hydration): add, remove, update quantity (respect stock), clear, item count, subtotal, coupon, shipping, total.
  - Free shipping above ₹999 (placeholder in config); otherwise ₹79.
  - Coupon `ECO10` = 10% off Aqua items (placeholder). Invalid codes show an error.
  - Prices shown GST-inclusive with a "Inclusive of all taxes" note.
  - Solar kit items show a note: "Site survey required before installation".
- **Auth (mock)**: context persisted to `localStorage`. Phone OTP login (any valid 10-digit Indian mobile; OTP `123456`, shown as a hint on screen), or email + password (any valid email, password 6+ chars). Logout clears state.
- **Last order**: stored in `sessionStorage` for the confirmation page.
- All prices formatted with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`.

## 9. Pages and their functions

### Demo index
- `/demo/pages` — a simple list of every demo page grouped as in the site map, each linked. This is for client review. Include a link to `/demo/style-guide` at the top. Also link it from the footer as "All pages (demo)".

### Main pages

1. **Home** — `/demo`
   Sections: dual hero (Aqua panel + Solar panel, each with CTA); trust strip (4 items); Shop Aqua by category (8 tiles); Shop Solar by category (6 tiles); Bestsellers carousel with tabs All / Aqua / Solar (horizontal scroll-snap, arrows on desktop, swipe on mobile); Hard water problems (6 tiles + CTA to Water Test); Solar savings teaser (bill slider ₹1,000–₹20,000 showing system size and yearly savings from the calculator formula + CTA to full calculator); Why Ecozynth (4 items); Testimonials (6, carousel); Latest blog (3 cards); Newsletter (email input with validation + success toast).

2. **Aqua Shop** — `/demo/aqua`
   Category chips row; filters: category, price range (min/max), rating, in-stock only; sort: Featured, Price low→high, Price high→low, Top rated, Newest; active filter chips with "Clear all"; result count; product grid; "Load more" (12 per page); empty state with "Clear filters". Filters and sort sync to URL search params (`?category=&min=&max=&sort=`) so links are shareable and back button works. `/demo/aqua?category=shower-filters` must open with that filter applied.

3. **Solar Shop** — `/demo/solar`
   Same as Aqua Shop, with filters: category, capacity (kW buckets: up to 3, 3–5, 5–10, 10+), phase, price range, includes installation. Banner linking to Solar Calculator and Get a Quote.

4. **Product Details** — `/demo/product/[slug]`
   - Gallery: main placeholder + 4 thumbnails (click to switch; swipe on mobile).
   - Info: division badge, name, rating (click scrolls to reviews), price, MRP struck through, discount %, stock status, short description, key spec chips, variant selector (if any), quantity stepper (min 1, max stock).
   - Buttons: Add to cart (toast + badge update), Buy now (adds and goes to checkout). Disabled with "Out of stock" + "Notify me" (email input, success toast) when stock is 0.
   - Pincode delivery check: 6-digit validation; pincodes starting with 1–8 show "Delivery in 3–5 days"; others show "Not serviceable yet" (placeholder rule).
   - Solar products extra: "What's included" box, EMI estimate (show monthly amount for 12/24/36 months at a placeholder rate), buttons "Get a quote" (→ `/demo/solar-quote?product=slug`, prefilled) and "Book free site survey".
   - Tabs (accordion on mobile): Description, Specifications (table), Installation, FAQ (accordion).
   - Reviews: rating summary with 5→1 star breakdown bars, review list, "Write a review" form (rating, title, text; validation; success toast, not saved).
   - Related products (4, same division).
   - Mobile sticky bar with price + Add to cart.
   - Unknown slug → `notFound()`.

5. **Search Results** — `/demo/search?q=`
   Searches mock products (name, category, description) and blog posts. Tabs: Products (count) / Articles (count). Sort for products. Empty query shows popular searches; no results shows suggestions and links to both shops.

6. **Cart** — `/demo/cart`
   Line items (placeholder image, name, variant, unit price, quantity stepper, line total, remove with undo toast); free-shipping progress bar ("Add ₹X more for free shipping"); coupon input (apply/remove, error state); order summary (subtotal, discount, shipping, total, GST note); "Proceed to checkout" button; "Continue shopping" links; empty cart state with links to both shops. Mobile: summary below items with sticky checkout button.

7. **Checkout** — `/demo/checkout`
   Redirect to cart if empty. 3 steps with a step indicator (each step editable after completion):
   - Step 1 Contact & Address: mobile (10 digits starting 6–9), email, full name, address line 1 & 2, landmark (optional), pincode (6 digits), city, state (dropdown of all states/UTs), "Save address" checkbox, optional GSTIN for business invoice (validate format when filled). If logged in, offer saved addresses to pick.
   - Step 2 Delivery: delivery method (Standard free/₹79 per cart rule, Express +₹149 placeholder), estimated dates. Solar kits show "Installation scheduled after site survey".
   - Step 3 Payment: radio options UPI, Card, Net Banking, Cash on Delivery (COD hidden/disabled if cart contains solar kits or total > ₹20,000, with explanation). No real payment form; show a note "Secure payment via Razorpay (connected in final site)".
   - Order summary sidebar (desktop) / collapsible summary at top (mobile).
   - "Place order": validates everything, creates a mock order ID (e.g. `EZ` + 6 digits), saves to sessionStorage, clears cart, goes to confirmation.

8. **Order Confirmation** — `/demo/order-confirmation`
   Order ID, thank-you message, items summary, delivery address, payment method, estimated delivery, next steps (what happens next; for solar: survey call within 48 hours), buttons: Track order (→ `/demo/track-order?id=...`), Continue shopping. If no order in sessionStorage, show a friendly message with link to shop.

### Customer account

9. **Login / Register** — `/demo/login` (tabs: Login | Register) and `/demo/register` (opens Register tab)
   - Login with phone OTP: phone step → OTP step (6 boxes, auto-advance, paste support, resend timer 30s) → logged in.
   - Login with email + password; "Forgot password?" view (email → success message).
   - Register: name, phone, email, password, accept terms checkbox → logged in.
   - After login redirect to `?redirect=` param or `/demo/account`.

10. **My Account** — `/demo/account` with sub-pages:
   - `/demo/account` Overview (greeting, recent order, quick links)
   - `/demo/account/orders` order list (cards on mobile, table on desktop) → `/demo/account/orders/[id]` order detail with status timeline, items, address, invoice download button (toast "Available in final site"), "Need help?" → service request
   - `/demo/account/addresses` add / edit / delete / set default (modal form, same validation as checkout)
   - `/demo/account/warranties` list of registered warranties + "Register a product" → warranty page
   - `/demo/account/service-requests` list with status badges + "New request"
   - `/demo/account/profile` edit name/email/phone, logout button
   - Account navigation: sidebar on desktop, horizontal scrollable tabs on mobile.
   - All account pages redirect to `/demo/login?redirect=...` when not logged in.

11. **Track Order** — `/demo/track-order`
   Form: order ID + phone or email. Mock rules: IDs from mock orders show their real timeline; any other `EZ` + 6 digits ID shows "Processing"; anything else shows "Order not found". Supports `?id=` to prefill. Timeline: Ordered → Packed → Shipped → Out for delivery → Delivered, with dates, plus courier name and tracking number placeholder.

### Solar

12. **Solar Savings Calculator** — `/demo/solar-calculator`
   Inputs: monthly bill (₹) OR monthly units (toggle), state, connection type (1-phase/3-phase), available roof area (sq ft), property type (Home / Business).
   Outputs (update live): recommended system size (kW), number of panels, roof area needed, estimated system cost, estimated subsidy (Home only), net cost, monthly and yearly savings, payback period in years, 25-year savings. Show 2–3 recommended kits from mock data that match the size. Warn if roof area is too small.
   All formulas and constants in `src/demo/config.ts` with comments (placeholder values, e.g. ~120 units per kW per month, ~100 sq ft per kW, ₹/unit tariff, cost per watt). Show a visible note: "Illustrative estimate. Final figures after site survey."
   CTA "Get exact quote" → quote page prefilled with the calculated size and bill.

13. **Get a Quote / Book a Free Site Survey** — `/demo/solar-quote`
   Multi-step form with progress bar: (1) Property type & system interest (prefill from `?product=` or calculator params), (2) Location: pincode, city, state, (3) Monthly bill, roof type (RCC / Metal sheet / Tiled / Other), roof area, (4) Preferred survey date (no past dates, no Sundays) and time slot, (5) Contact: name, phone, email, consent checkbox. Back/Next with per-step validation. Success screen with mock reference number and what happens next.

14. **Solar Subsidy Information** — `/demo/solar-subsidy`
   Content page: overview, eligibility checklist, subsidy amount table by system size (placeholder numbers, clearly marked), step-by-step application process (numbered steps), documents required, FAQ accordion, CTA to calculator and quote. Note at the top: "Placeholder information, to be confirmed with Ecozynth."

### Aqua

15. **Free Water Test Request** — `/demo/water-test`
   Short explainer (what we test: hardness, TDS, pH, iron) + form: name, phone, pincode, city, water source (Borewell / Municipal / Tanker / Mixed), problems (checkboxes: hair fall, dry skin, white scaling, stains, bad taste/smell, appliance damage), preferred date and slot. Success with reference number.

16. **Which Filter Do I Need?** — `/demo/filter-guide`
   Step-by-step quiz (one question per screen, progress bar, back button): property type, water source, main problem, where you need it (whole house / bathroom / kitchen / appliances), budget range. Result screen recommends 1–3 mock products with reasons (simple rule-based mapping in a single file), Add to cart buttons, "Restart quiz", and "Not sure? Book a free water test" link.

### Support

17. **Installation Videos** — `/demo/installation-videos`
   Category filter chips, search box, grid of video cards (placeholder thumbnail, title, duration, product). Clicking opens a modal with a placeholder video area, description and "Buy this product" link. Modal closes on Escape/overlay; full-screen on mobile.

18. **Warranty Registration** — `/demo/warranty-registration`
   Form: product (searchable dropdown of mock products), serial number, purchase date (not in future), purchased from (Ecozynth website / Dealer / Marketplace), invoice upload (file input showing the selected file name, PDF/JPG/PNG up to 5 MB, client-side check only), name, phone, email, pincode. Success with mock warranty ID and coverage end date. Link to warranty policy.

19. **Service / AMC Request** — `/demo/service-request`
   Form: request type (Installation / Repair / AMC / Cartridge replacement / Solar maintenance), product, order ID or warranty ID (optional), issue description (min 20 chars, character counter), photo upload (file name only), preferred date & slot, address fields, contact. Success with ticket number. Also show AMC plan cards (3 placeholder plans with prices) above the form; "Choose plan" preselects AMC type.

20. **FAQ** — `/demo/faq`
   Search box filtering questions live; category tabs (scrollable on mobile); accordion list; "Still need help?" box linking to Contact and WhatsApp. Support `?category=` param.

21. **Contact Us** — `/demo/contact`
   Contact cards (call, WhatsApp, email, visit) with click-to-call/mailto links; business hours; contact form (name, phone, email, subject dropdown, message) with validation and success state; map placeholder; links to FAQ, Track Order and Service Request.

### Business

22. **Become a Dealer / Distributor** — `/demo/dealer`
   Benefits (4–6 cards), "How it works" steps, requirements list, testimonials from dealers (2 placeholders), application form: business name, contact person, phone, email, city, state, GSTIN (optional, validated), business type, years in business, product interest (Aqua / Solar / Both), message. Success with reference number.

23. **Bulk & Business Enquiry** — `/demo/bulk-enquiry`
   Segment cards (Housing societies, Hotels, Hospitals, Schools & campuses, Offices, Industries); clicking a card preselects it in the form. Form: organisation name, segment, requirement (Aqua / Solar / Both), approximate quantity or kW, location, timeline, contact details, message. Success state.

### About and content

24. **About Us** — `/demo/about`
   Story section, mission & vision, values (4), numbers/stats strip (placeholder counts), timeline (5 milestones), team (4 placeholder cards), certifications teaser (link to Certificates), CTA to both shops.

25. **Blog** — `/demo/blog`
   Featured post, category filter chips, search, post grid (1/2/3 columns by width), pagination (6 per page, URL `?page=`), empty state.

26. **Blog Article** — `/demo/blog/[slug]`
   Title, category, date, read time, hero placeholder, table of contents (sticky on desktop, collapsible on mobile, links scroll to headings), lorem body with h2/h3 sections, share buttons (WhatsApp, Facebook, X, Copy link with toast), product CTA box (2 related products), related posts (3). Unknown slug → `notFound()`.

27. **Certificates & Downloads** — `/demo/certificates`
   Grid of certificate cards (placeholder thumbnail, name, issuer, year) with View (modal with placeholder preview) and Download (toast "Available in final site"). Downloads section: Product catalogue, Aqua brochure, Solar brochure, Price list (same behaviour).

### Policies

28–32. **Policies** — `/demo/policies/[slug]` for `privacy-policy`, `terms-and-conditions`, `shipping-policy`, `refund-policy`, `warranty-policy`
   Shared layout: sidebar list of all 5 policies (dropdown select on mobile), title, "Last updated" date, lorem sections with headings, and an on-page contents list. Unknown slug → `notFound()`.

### Error page
- `not-found.tsx` inside the demo group: friendly message, search box, links to Home, Aqua, Solar.

## 10. Forms (shared behaviour)

- One reusable set of form components: TextField, Select, Textarea, Checkbox, RadioGroup, DatePicker (native date input is fine), FileInput, OTPInput, FormError, SubmitButton (loading state).
- Shared validators: Indian mobile (`^[6-9]\d{9}$`), pincode (`^[1-9]\d{5}$`), email, GSTIN (standard 15-character format), required, min length.
- Validate on blur and on submit; show inline errors; focus the first invalid field on submit.
- Simulate submission with a ~800 ms delay and loading state, then show a success screen with a mock reference number (prefix per form, e.g. `WT-` water test, `SQ-` solar quote, `SR-` service request, `WR-` warranty, `DL-` dealer, `BE-` bulk enquiry, `CT-` contact).
- Nothing is sent anywhere. Add a `// TODO: connect to Payload collection` comment at each submit handler naming the future collection.

## 11. Build order (pause after each phase so I can review, and commit after each)

1. **Foundation**: demo layout, global colour palette + Tailwind tokens, fonts, `Logo` component, `/demo/style-guide`, UI primitives, Placeholder, header (incl. mobile drawer, search suggestions), footer, breadcrumbs, toast, WhatsApp button, cart & auth contexts, all mock data, `/demo/pages` index, not-found page.
2. **Shopping**: Home, Aqua Shop, Solar Shop, Product Details, Search.
3. **Purchase flow**: Cart, Checkout, Order Confirmation.
4. **Account**: Login/Register, My Account (all sub-pages), Track Order.
5. **Solar**: Calculator, Quote, Subsidy.
6. **Aqua & Support**: Water Test, Filter Guide, Installation Videos, Warranty Registration, Service Request, FAQ, Contact.
7. **Business & Content**: Dealer, Bulk Enquiry, About, Blog, Blog Article, Certificates, Policies.
8. **QA pass**: check every page at 360 / 768 / 1440 px, click every link in header, footer and `/demo/pages` (no broken links), complete every form and flow once (add to cart → checkout → confirmation → track order; login → account; calculator → quote), fix issues, and give me a final checklist of all routes with their status.

Commit message format: `feat(demo): phase N – <short description>`.

## 12. Definition of done

- All 32 pages (plus account sub-pages, `/demo/pages` and not-found) exist and are reachable from navigation.
- Every function listed above works with mock data.
- No horizontal scroll, no layout breaks at 360 px, no console errors or hydration warnings.
- All colours come from the global tokens (no hardcoded hex values in components), and the logo is used only through the `Logo` component.
- `pnpm lint` and `pnpm exec tsc --noEmit` pass.
- No changes outside the demo route group, `src/components/ecozynth/` and `src/demo/` (except updating CLAUDE.md as below).
- Update the "Current phase" section in CLAUDE.md to: "Phase 1: wireframe demo of all pages under /demo with mock data (see DEMO_PROMPT.md). Next: visual design pass, then connect to Payload."

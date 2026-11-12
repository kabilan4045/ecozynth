# Ecozynth — Project Guide for Claude Code

## About the client
Ecozynth is an Indian brand selling two product lines:
- **Aqua**: water softeners, water filters (tank, shower, tap, whole-house, appliance), replacement cartridges, water testers, accessories. Low-ticket, D2C, add-to-cart purchases.
- **Solar**: residential on-grid kits, hybrid kits (with battery), commercial kits, inverters, panels, accessories. High-ticket, considered purchases with quotes, site surveys and installation.

Market: India. Currency INR, formatted with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`. Prices are GST-inclusive unless stated.

## Stack
- Next.js (App Router) + Payload CMS 3 in ONE app, created from the official Payload `ecommerce` template
- Pinned versions (do not change): `next` 16.4.1, `react` / `react-dom` 19.2.9, `payload` and all `@payloadcms/*` 3.93.0
- Database: Postgres on Supabase via `@payloadcms/db-postgres`
- Development currently uses a temporary local SQLite database. Production will use Supabase Postgres.
- Styling: Tailwind CSS + shadcn/ui, icons from `lucide-react`
- Package manager: **pnpm**
- Hosting: Vercel; DNS/CDN: Cloudflare
- Media storage: Cloudflare R2 (via Payload's S3-compatible storage adapter). Do not use Supabase Storage.
- Email: Resend (transactional emails: order confirmation, shipping updates, quote/lead notifications, password reset).
- Planned later (do not build until asked): Razorpay + COD checkout, Shiprocket shipping, R2 and Resend integration.

## Hard rules
- NEVER upgrade, downgrade or add versions of `next`, `react`, `react-dom`, `payload` or any `@payloadcms/*` package unless explicitly asked. Payload only supports specific Next.js versions.
- Do not edit the `(payload)` route group, `payload.config.ts` or existing collections unless the task asks for it.
- Server Components by default. Add `"use client"` only for interactive pieces.
- TypeScript strict, no `any`.
- Mobile-first. Every page must look right at 375px, 768px and 1280px.
- Use `next/image` for images. Do not load images from external URLs.
- Build reusable components that receive data through props, so they can later be fed real Payload data without redesign.
- Before finishing a task, run `pnpm lint` and `pnpm exec tsc --noEmit` and fix errors.
- Keep changes focused on the task. At the end, summarise which files changed.

## Brand
| Token | Hex | Use |
|---|---|---|
| `brand-green` | `#7AC143` | Primary buttons, highlights, links |
| `brand-green-dark` | `#3E8E3E` | Hover states, gradients with brand-green |
| `brand-slate` | `#5F6773` | Headings, wordmark grey |
| `brand-ink` | `#1F2933` | Body text |
| `brand-bg` | `#F7F9F6` | Soft section backgrounds |
| `aqua-accent` | `#0EA5B7` | Aqua division accents only (badges, tints, icons) |
| `solar-accent` | `#F5A623` | Solar division accents only (badges, tints, icons) |

- Fonts: **Poppins** (headings, via `next/font/google`, weights 500/600/700) and **Inter** (body).
- Logo files: `public/brand/logo.png` (transparent) and `public/brand/logo-on-white.jpg`.
- Look and feel: clean, modern, trustworthy. Plenty of white space, `rounded-2xl` cards, soft shadows, subtle green gradients. Green is the main brand colour; aqua/solar accents are used lightly to tell the two divisions apart.
- Add the brand tokens to the Tailwind theme so they are used as classes (`bg-brand-green`, `text-brand-slate`, etc.). Do not hardcode hex values inside components.

## Full site map (reference for later phases)
Home · Aqua shop · Solar shop · Product page · Cart · Checkout · Account (orders, warranty, service requests) · Order tracking · Solar calculator · Get a quote / site survey · Water test request · Installation videos · Become a dealer · Bulk / B2B enquiry · About · Contact · FAQ · Blog · Policies (privacy, terms, shipping, refund, warranty)

## Planned Payload collections (later phases)
Products (with `division: 'aqua' | 'solar'` and a flexible `specs` field), Categories, Orders, Customers, Coupons, Reviews, SolarLeads (status pipeline: new → contacted → survey booked → quoted → won/lost), WarrantyRegistrations, ServiceRequests, DealerApplications, WaterTestRequests, Posts, Banners.

## Folder conventions
- Brand components: `src/components/ecozynth/`
- Demo pages: `src/app/(demo)/...`, served at the site root (`/`, `/aqua`, `/contact`…). Shared with the client via the Vercel preview link.
- The Payload template's original storefront pages were moved out of routing to `src/_template-storefront/` (kept for reference only). `src/app/(app)/next/*` stays because the admin uses it for preview and seeding.
- Mock data: `src/demo/data/`; client state: `src/demo/state/`; placeholder numbers: `src/demo/config.ts`

## Current phase
Phase 1: wireframe demo of all pages at the site root with mock data (see DEMO_PROMPT.md; its /demo paths now live at /). Next: visual design pass, then connect to Payload.

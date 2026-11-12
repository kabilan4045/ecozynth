import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { Logo } from '@/components/ecozynth/Logo'
import { Placeholder } from '@/components/ecozynth/Placeholder'
import { ProductCard } from '@/components/ecozynth/ProductCard'
import { FieldStates, FormShowcase, InteractiveShowcase } from '@/components/ecozynth/styleguide/Showcases'
import { Swatch } from '@/components/ecozynth/styleguide/Swatch'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { Button } from '@/components/ecozynth/ui/Button'
import { Card, Container, PageHeader } from '@/components/ecozynth/ui/layout'
import { Price } from '@/components/ecozynth/ui/Price'
import { Rating } from '@/components/ecozynth/ui/Rating'
import { getProduct } from '@/demo/data/products'

export const metadata: Metadata = { title: 'Colour Palette & Style Guide' }

const colourGroups: { title: string; note?: string; tokens: { token: string; use: string }[] }[] = [
  {
    title: 'Brand',
    note: 'Primary buttons use brand-green-dark (darkened to #2F7A32 so white text passes WCAG AA). White on brand-green is only 2.2:1.',
    tokens: [
      { token: 'brand-green', use: 'Highlights, active states, hover' },
      { token: 'brand-green-dark', use: 'Primary buttons, links' },
      { token: 'brand-green-light', use: 'Soft green backgrounds, chips' },
      { token: 'brand-slate', use: 'Secondary buttons, icons' },
      { token: 'brand-slate-dark', use: 'Strong headings, dark bars' },
    ],
  },
  {
    title: 'Division accents',
    note: 'Small touches only (badges, icons, tints), never primary buttons.',
    tokens: [
      { token: 'aqua', use: 'Aqua badges and icons' },
      { token: 'aqua-50', use: 'Aqua tints and placeholders' },
      { token: 'solar', use: 'Solar badges and icons' },
      { token: 'solar-50', use: 'Solar tints and placeholders' },
    ],
  },
  {
    title: 'Neutrals',
    tokens: [
      { token: 'ink', use: 'Main text' },
      { token: 'muted', use: 'Secondary text, labels' },
      { token: 'line', use: 'Borders, dividers' },
      { token: 'surface', use: 'Page and card background' },
      { token: 'surface-alt', use: 'Alternate sections' },
      { token: 'surface-hover', use: 'Hover rows and cards' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { token: 'success', use: 'In stock, delivered' },
      { token: 'warning', use: 'Low stock, processing' },
      { token: 'danger', use: 'Errors, out of stock, sale price' },
      { token: 'info', use: 'Info notes, shipped' },
    ],
  },
]

const Block = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section aria-labelledby={id} className="border-t border-line py-10">
    <h2 className="mb-6 text-xl font-semibold" id={id}>
      {title}
    </h2>
    {children}
  </section>
)

export default function StyleGuidePage() {
  const aquaSample = getProduct('shower-pure-15')
  const solarSample = getProduct('home-on-grid-3kw-kit')
  const outOfStock = getProduct('tank-guard-2000')

  return (
    <>
      <Breadcrumbs items={[{ label: 'Colour palette' }]} />
      <Container className="pb-16">
        <PageHeader
          description="Colours, fonts and building blocks used across the demo. Approve the palette here before the visual design pass."
          title="Colour palette & style guide"
        />

        <Block id="logo" title="Logo">
          <div className="flex flex-wrap items-end gap-8">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div className="flex flex-col items-start gap-2" key={size}>
                <Logo link={false} size={size} />
                <span className="text-sm text-muted">
                  {size} · {size === 'sm' ? '32px (mobile header)' : size === 'md' ? '40px (desktop header)' : '48px (footer, login)'}
                </span>
              </div>
            ))}
          </div>
        </Block>

        <Block id="colours" title="Colours">
          <div className="space-y-8">
            {colourGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-base font-semibold">{group.title}</h3>
                {group.note ? <p className="mt-1 text-sm text-muted">{group.note}</p> : null}
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {group.tokens.map((t) => (
                    <Swatch key={t.token} token={t.token} use={t.use} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block id="type" title="Typography">
          <div className="space-y-4">
            <p className="text-sm text-muted">Headings: Poppins 500/600/700 · Body: Inter 400/500/600</p>
            <h1 className="text-3xl font-bold sm:text-4xl">H1 · Clean water, clean energy</h1>
            <h2 className="text-2xl font-semibold sm:text-3xl">H2 · Shop by category</h2>
            <h3 className="text-xl font-semibold">H3 · Why Ecozynth</h3>
            <h4 className="text-lg font-medium">H4 · Specifications</h4>
            <p className="max-w-2xl">
              Body · Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-muted">Small · Inclusive of all taxes. Free shipping above ₹999.</p>
          </div>
        </Block>

        <Block id="buttons" title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </Block>

        <Block id="badges" title="Badges, price and rating">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="aqua">Aqua</Badge>
            <Badge tone="solar">Solar</Badge>
            <Badge tone="green">Bestseller</Badge>
            <Badge tone="success">Delivered</Badge>
            <Badge tone="warning">Processing</Badge>
            <Badge tone="info">Shipped</Badge>
            <Badge tone="danger">Out of stock</Badge>
            <Badge tone="neutral">Neutral</Badge>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-8">
            <Price mrp={2499} price={1499} size="lg" />
            <Rating count={512} value={4.7} />
          </div>
          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
            <Placeholder icon="shower" label="Aqua placeholder" tone="aqua" />
            <Placeholder icon="panel" label="Solar placeholder" tone="solar" />
            <Placeholder label="Neutral placeholder" />
          </div>
        </Block>

        <Block id="fields" title="Form fields">
          <FieldStates />
          <Card className="mt-8 p-4 sm:p-6">
            <h3 className="mb-1 text-base font-semibold">Live form (all field types)</h3>
            <p className="mb-6 text-sm text-muted">
              Validates on blur and on submit, focuses the first invalid field, then simulates sending.
            </p>
            <FormShowcase />
          </Card>
        </Block>

        <Block id="cards" title="Product cards">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[aquaSample, solarSample, outOfStock].map((product) =>
              product ? <ProductCard key={product.id} product={product} /> : null,
            )}
          </div>
        </Block>

        <Block id="interactive" title="Overlays, accordion, stepper and toasts">
          <InteractiveShowcase />
        </Block>
      </Container>
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AddToCartButton } from '@/components/ecozynth/AddToCartButton'
import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { Placeholder } from '@/components/ecozynth/Placeholder'
import { StockStatus } from '@/components/ecozynth/ProductCard'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { Accordion } from '@/components/ecozynth/ui/Accordion'
import { DivisionBadge } from '@/components/ecozynth/ui/Badge'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card, Container } from '@/components/ecozynth/ui/layout'
import { Price } from '@/components/ecozynth/ui/Price'
import { Rating } from '@/components/ecozynth/ui/Rating'
import { getCategory } from '@/demo/data/categories'
import { getProduct, getProductsByDivision } from '@/demo/data/products'
import type { Product } from '@/demo/data/types'
import { formatDate } from '@/demo/format'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug)
  return { title: product?.name ?? 'Product' }
}

const specRows = (product: Product): [string, string][] =>
  product.division === 'aqua'
    ? [
        ['Stages', product.specs.stages],
        ['Filter life', product.specs.filterLife],
        ['Connection size', product.specs.connectionSize],
        ['Warranty', product.specs.warranty],
      ]
    : [
        ['Capacity', `${product.capacityKw} kW`],
        ['Panels', product.panelCount ? `${product.panelCount} × ${product.panelWp} Wp` : '—'],
        ['Phase', `${product.phase}-phase`],
        ['Inverter', product.inverterBrand],
        ['Warranty', `${product.warrantyYears} years`],
        ['Installation included', product.includesInstallation ? 'Yes' : 'No'],
      ]

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug)
  if (!product) notFound()

  const category = getCategory(product.category)
  const related = getProductsByDivision(product.division)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Breadcrumbs
        items={[
          { label: product.division === 'aqua' ? 'Aqua' : 'Solar', href: `/${product.division}` },
          { label: category?.name ?? '', href: `/${product.division}?category=${product.category}` },
          { label: product.name },
        ]}
      />
      <Container className="pb-28 lg:pb-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Gallery (placeholders) */}
          <div>
            <Placeholder icon={category?.icon} label="Main product image" tone={product.division} />
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <Placeholder icon={category?.icon} key={n} tone={product.division} />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <DivisionBadge division={product.division} />
              {product.badge ? <span className="text-sm font-medium text-brand-green-dark">{product.badge}</span> : null}
            </div>
            <h1 className="text-2xl font-semibold sm:text-3xl">{product.name}</h1>
            <a className="w-fit" href="#reviews">
              <Rating count={product.reviewCount} value={product.rating} />
            </a>
            <Price mrp={product.mrp} price={product.price} size="lg" />
            <p className="-mt-2 text-xs text-muted">Inclusive of all taxes</p>
            <StockStatus stock={product.stock} />
            <p className="text-muted">{product.shortDescription} Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex flex-wrap gap-3">
              <AddToCartButton product={product} size="lg" />
              {product.division === 'solar' ? (
                <ButtonLink href={`/solar-quote?product=${product.slug}`} size="lg" variant="outline">
                  Get a quote
                </ButtonLink>
              ) : null}
            </div>
            {product.division === 'solar' ? (
              <Card className="bg-solar-50 p-4">
                <h2 className="font-semibold">What’s included</h2>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted">
                  {product.whatsIncluded.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Details */}
        <Accordion
          className="mt-10"
          defaultOpen={['description']}
          items={[
            {
              id: 'description',
              title: 'Description',
              content: product.description.map((p, i) => (
                <p className="mt-2" key={i}>
                  {p}
                </p>
              )),
            },
            {
              id: 'specs',
              title: 'Specifications',
              content: (
                <table className="w-full text-sm">
                  <tbody>
                    {specRows(product).map(([k, v]) => (
                      <tr className="border-b border-line last:border-0" key={k}>
                        <th className="py-2 pr-4 text-left font-medium text-ink" scope="row">
                          {k}
                        </th>
                        <td className="py-2">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ),
            },
            { id: 'install', title: 'Installation', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
            {
              id: 'faq',
              title: 'FAQ',
              content: product.faqs.map((f) => (
                <div className="mt-2" key={f.question}>
                  <p className="font-medium text-ink">{f.question}</p>
                  <p>{f.answer}</p>
                </div>
              )),
            },
          ]}
        />

        {/* Reviews */}
        <section aria-labelledby="reviews" className="mt-10">
          <h2 className="mb-4 text-xl font-semibold" id="reviews">
            Reviews ({product.reviewCount})
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {product.reviews.map((review) => (
              <li key={review.id}>
                <Card className="h-full p-4">
                  <Rating showValue={false} value={review.rating} />
                  <p className="mt-2 font-medium">{review.title}</p>
                  <p className="mt-1 text-muted">{review.body}</p>
                  <p className="mt-2 text-xs text-muted">
                    {review.author}, {review.city} · {formatDate(review.date)}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Related products</h2>
          <ProductGrid products={related} />
        </section>
      </Container>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3 lg:hidden">
        <Price price={product.price} size="sm" />
        <AddToCartButton product={product} />
      </div>
    </>
  )
}

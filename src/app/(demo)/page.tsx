import type { Metadata } from 'next'
import Link from 'next/link'

import { TileGrid } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Placeholder } from '@/components/ecozynth/Placeholder'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { SolarCalculatorDemo } from '@/components/ecozynth/SolarCalculatorDemo'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card, Container, Section, SectionHeading } from '@/components/ecozynth/ui/layout'
import { Rating } from '@/components/ecozynth/ui/Rating'
import { blogPosts } from '@/demo/data/blog'
import { aquaCategories, solarCategories } from '@/demo/data/categories'
import { products } from '@/demo/data/products'
import { testimonials } from '@/demo/data/testimonials'
import { formatDate } from '@/demo/format'

export const metadata: Metadata = { title: 'Home' }

export default function HomePage() {
  const bestsellers = [...products].sort((a, b) => a.featuredRank - b.featuredRank).slice(0, 8)

  return (
    <>
      <h1 className="sr-only">Ecozynth: water and solar solutions</h1>

      {/* Dual hero */}
      <Section className="pt-6 sm:pt-8">
        <Container className="grid gap-4 md:grid-cols-2">
          {(['aqua', 'solar'] as const).map((division) => (
            <Card className="overflow-hidden" key={division}>
              <Placeholder
                aspect="wide"
                className="rounded-none"
                icon={division === 'aqua' ? 'droplet' : 'sun'}
                label={division === 'aqua' ? 'Aqua hero image' : 'Solar hero image'}
                tone={division}
              />
              <div className="p-5">
                <p className="text-sm font-medium text-muted">{division === 'aqua' ? 'Ecozynth Aqua' : 'Ecozynth Solar'}</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {division === 'aqua' ? 'Lorem ipsum soft water' : 'Lorem ipsum solar power'}
                </h2>
                <p className="mt-2 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink href={`/${division}`}>{division === 'aqua' ? 'Shop Aqua' : 'Shop Solar'}</ButtonLink>
                  <ButtonLink href={division === 'aqua' ? '/water-test' : '/solar-quote'} variant="outline">
                    {division === 'aqua' ? 'Free water test' : 'Free site survey'}
                  </ButtonLink>
                </div>
              </div>
            </Card>
          ))}
        </Container>
      </Section>

      {/* Trust strip */}
      <Container>
        <TileGrid
          columns={4}
          items={[
            { title: 'Free shipping', text: 'Lorem ipsum above ₹999', icon: 'truck' },
            { title: 'Genuine warranty', text: 'Lorem ipsum dolor sit', icon: 'shield' },
            { title: 'Expert installation', text: 'Lorem ipsum dolor sit', icon: 'wrench' },
            { title: 'Support 6 days a week', text: 'Lorem ipsum dolor sit', icon: 'headset' },
          ]}
        />
      </Container>

      <Section>
        <Container>
          <SectionHeading action={<Link className="text-brand-green-dark underline" href="/aqua">View all</Link>} title="Shop Aqua by category" />
          <TileGrid
            columns={4}
            items={aquaCategories.map((c) => ({ title: c.name, text: c.description, icon: c.icon, tone: 'aqua' as const, href: `/aqua?category=${c.slug}` }))}
          />
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading action={<Link className="text-brand-green-dark underline" href="/solar">View all</Link>} title="Shop Solar by category" />
          <TileGrid
            items={solarCategories.map((c) => ({ title: c.name, text: c.description, icon: c.icon, tone: 'solar' as const, href: `/solar?category=${c.slug}` }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="Bestsellers" />
          <ProductGrid products={bestsellers} />
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading
            action={<ButtonLink href="/water-test">Book a free water test</ButtonLink>}
            title="Hard water problems we solve"
          />
          <TileGrid
            items={['Hair fall', 'Dry skin', 'White scaling', 'Stained tiles', 'Bad taste', 'Appliance damage'].map((t) => ({
              title: t,
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              icon: 'droplet' as const,
              tone: 'aqua' as const,
            }))}
          />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">How much can solar save you?</h2>
            <p className="mt-2 text-muted">Lorem ipsum dolor sit amet. Move the slider to see an illustrative estimate.</p>
          </div>
          <SolarCalculatorDemo compact />
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading title="Why Ecozynth" />
          <TileGrid
            columns={4}
            items={[
              { title: 'Lorem ipsum quality', text: 'Dolor sit amet consectetur.', icon: 'badge' },
              { title: 'Lorem ipsum service', text: 'Dolor sit amet consectetur.', icon: 'headset' },
              { title: 'Lorem ipsum warranty', text: 'Dolor sit amet consectetur.', icon: 'shield' },
              { title: 'Lorem ipsum experts', text: 'Dolor sit amet consectetur.', icon: 'wrench' },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="What customers say" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.id}>
                <Card className="h-full p-4">
                  <Rating showValue={false} value={t.rating} />
                  <p className="mt-2">“{t.quote}”</p>
                  <p className="mt-3 text-sm text-muted">
                    {t.name}, {t.city}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section alt>
        <Container>
          <SectionHeading action={<Link className="text-brand-green-dark underline" href="/blog">All articles</Link>} title="From the blog" />
          <TileGrid
            items={blogPosts.slice(0, 3).map((p) => ({
              title: p.title,
              text: p.excerpt,
              meta: `${p.category} · ${formatDate(p.date)}`,
              href: `/blog/${p.slug}`,
              icon: 'file' as const,
            }))}
            withImage
          />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-2xl text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">Get tips and offers</h2>
          <p className="mt-2 text-muted">Lorem ipsum dolor sit amet. No spam, unsubscribe anytime.</p>
          <DummyForm
            className="mt-6 text-left"
            collection="newsletter-subscribers"
            fields={[{ name: 'email', label: 'Email address', type: 'email', required: true, full: true }]}
            submitLabel="Subscribe"
            successTitle="You're subscribed!"
          />
        </Container>
      </Section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LoremSection } from '@/components/ecozynth/blocks'
import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { cn } from '@/components/ecozynth/ui/cn'
import { Container } from '@/components/ecozynth/ui/layout'
import { policySlugs } from '@/demo/routes'

type Props = { params: Promise<{ slug: string }> }

const sections = ['Introduction', 'Information we collect', 'How we use it', 'Your rights', 'Contact us']
const sectionId = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, '-')

export function generateStaticParams() {
  return policySlugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  return { title: policySlugs.find((p) => p.slug === slug)?.label ?? 'Policy' }
}

export default async function PolicyPage({ params }: Props) {
  const slug = (await params).slug
  const policy = policySlugs.find((p) => p.slug === slug)
  if (!policy) notFound()

  return (
    <>
      <Breadcrumbs items={[{ label: 'Policies' }, { label: policy.label }]} />
      <Container className="pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <nav aria-label="Policies">
            <ul className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {policySlugs.map((p) => (
                <li className="shrink-0" key={p.slug}>
                  <Link
                    aria-current={p.slug === slug ? 'page' : undefined}
                    className={cn(
                      'flex min-h-11 items-center rounded-[var(--radius-ui)] px-3 text-sm whitespace-nowrap',
                      p.slug === slug ? 'bg-brand-green-light font-medium text-brand-green-dark' : 'border border-line hover:bg-surface-hover lg:border-0',
                    )}
                    href={`/policies/${p.slug}`}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="min-w-0">
            <h1 className="text-2xl font-semibold sm:text-3xl">{policy.label}</h1>
            <p className="mt-1 text-sm text-muted">Last updated: 1 Nov 2026 (placeholder)</p>
            <nav aria-label="On this page" className="mt-4 rounded-[var(--radius-card)] border border-line p-4">
              <p className="mb-2 text-sm font-semibold">Contents</p>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {sections.map((s) => (
                  <li key={s}>
                    <a className="text-brand-green-dark hover:underline" href={`#${sectionId(s)}`}>
                      {s}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {sections.map((s) => (
              <LoremSection id={sectionId(s)} key={s} paragraphs={2} title={s} />
            ))}
          </article>
        </div>
      </Container>
    </>
  )
}

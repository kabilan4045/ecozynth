import type { Metadata } from 'next'

import { BlockTitle, PageShell } from '@/components/ecozynth/blocks'
import { Accordion } from '@/components/ecozynth/ui/Accordion'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card } from '@/components/ecozynth/ui/layout'
import { faqCategories, faqs } from '@/demo/data/faqs'

export const metadata: Metadata = { title: 'FAQ' }

export default function FaqPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Support' }, { label: 'FAQ' }]}
      description="Lorem ipsum dolor sit amet. Answers to common questions."
      title="Frequently asked questions"
    >
      <nav aria-label="FAQ categories" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {faqCategories.map((c) => (
          <a
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-line px-4 text-sm whitespace-nowrap hover:bg-surface-hover"
            href={`#${c.toLowerCase().replace(/[^a-z]+/g, '-')}`}
            key={c}
          >
            {c}
          </a>
        ))}
      </nav>
      {faqCategories.map((c) => (
        <section key={c}>
          <BlockTitle id={c.toLowerCase().replace(/[^a-z]+/g, '-')}>{c}</BlockTitle>
          <Accordion
            items={faqs
              .filter((f) => f.category === c)
              .map((f) => ({ id: f.id, title: f.question, content: f.answer }))}
          />
        </section>
      ))}
      <Card className="mt-10 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Still need help?</h2>
          <p className="text-sm text-muted">Lorem ipsum dolor sit amet, our team is happy to help.</p>
        </div>
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </Card>
    </PageShell>
  )
}

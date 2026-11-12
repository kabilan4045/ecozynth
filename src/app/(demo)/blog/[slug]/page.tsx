import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockTitle, TileGrid } from '@/components/ecozynth/blocks'
import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { Placeholder } from '@/components/ecozynth/Placeholder'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { Card, Container } from '@/components/ecozynth/ui/layout'
import { blogPosts, getBlogPost } from '@/demo/data/blog'
import { getProduct } from '@/demo/data/products'
import type { Product } from '@/demo/data/types'
import { formatDate } from '@/demo/format'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getBlogPost((await params).slug)?.title ?? 'Article' }
}

export default async function BlogArticlePage({ params }: Props) {
  const post = getBlogPost((await params).slug)
  if (!post) notFound()

  const products = post.relatedProductSlugs.map(getProduct).filter((p): p is Product => Boolean(p))
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
      <Container className="pb-16">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm text-muted">
            {post.category} · {formatDate(post.date)} · {post.readTime}
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-4xl">{post.title}</h1>
          <Placeholder aspect="video" className="mt-6" icon="file" label="Article hero image" />

          <Card className="mt-6 p-4">
            <p className="mb-2 font-semibold">Contents</p>
            <ul className="space-y-1 text-sm">
              {post.sections.map((s) => (
                <li className={s.level === 3 ? 'pl-4' : ''} key={s.id}>
                  <a className="inline-flex min-h-9 items-center text-brand-green-dark hover:underline" href={`#${s.id}`}>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          {post.sections.map((s) => {
            const Heading = s.level === 2 ? 'h2' : 'h3'
            return (
              <section className="mt-8" key={s.id}>
                <Heading className={s.level === 2 ? 'text-xl font-semibold sm:text-2xl' : 'text-lg font-semibold'} id={s.id}>
                  {s.heading}
                </Heading>
                {s.paragraphs.map((p, i) => (
                  <p className="mt-3 text-muted" key={i}>
                    {p}
                  </p>
                ))}
              </section>
            )
          })}
        </article>

        <BlockTitle>Products in this article</BlockTitle>
        <ProductGrid products={products} />
        <BlockTitle>Related articles</BlockTitle>
        <TileGrid
          items={related.map((p) => ({ title: p.title, text: p.excerpt, meta: formatDate(p.date), href: `/blog/${p.slug}`, icon: 'file' as const }))}
          withImage
        />
      </Container>
    </>
  )
}

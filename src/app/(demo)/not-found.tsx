import { SearchBox } from '@/components/ecozynth/layout/SearchBox'
import { Logo } from '@/components/ecozynth/Logo'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Container } from '@/components/ecozynth/ui/layout'

/** Demo 404: shown for unknown /demo URLs and notFound() calls (unknown product, blog post, policy). */
export default function DemoNotFound() {
  return (
    <Container className="flex flex-col items-center py-16 text-center sm:py-24">
      <title>Page not found | Ecozynth</title>
      <Logo size="lg" />
      <p className="mt-8 text-sm font-medium text-muted">Error 404</p>
      <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">We couldn’t find that page</h1>
      <p className="mt-3 max-w-md text-muted">
        The link may be broken or the page may have moved. Try a search, or head back to the shop.
      </p>
      <SearchBox className="mt-6 w-full max-w-md" />
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Go to Home</ButtonLink>
        <ButtonLink href="/aqua" variant="outline">
          Shop Aqua
        </ButtonLink>
        <ButtonLink href="/solar" variant="outline">
          Shop Solar
        </ButtonLink>
      </div>
    </Container>
  )
}

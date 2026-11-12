import { notFound } from 'next/navigation'

/** Any /demo URL without its own page renders the demo not-found page. */
export default function MissingDemoPage() {
  notFound()
}

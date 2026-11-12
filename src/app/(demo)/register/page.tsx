import type { Metadata } from 'next'

import { AuthForms } from '@/components/ecozynth/AuthForms'
import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { Container } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Register' }

export default function RegisterPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Register' }]} />
      <Container className="pb-16">
        <h1 className="sr-only">Create an account</h1>
        <AuthForms initialTab="register" />
      </Container>
    </>
  )
}

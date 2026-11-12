import type { Metadata } from 'next'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { LogoutButton } from '@/components/ecozynth/AccountWidgets'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Profile' }

export default function ProfilePage() {
  return (
    <AccountShell current="/account/profile" title="Profile">
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="customers"
          fields={[
            { name: 'name', label: 'Full name', type: 'name', required: true, defaultValue: 'Demo Customer' },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true, defaultValue: '9876543210' },
            { name: 'email', label: 'Email', type: 'email', required: true, full: true, defaultValue: 'demo@ecozynth.example' },
          ]}
          submitLabel="Save changes"
          successText="Lorem ipsum: your profile was updated (demo only)."
          successTitle="Profile saved"
        />
      </Card>
      <div className="mt-6">
        <LogoutButton />
      </div>
    </AccountShell>
  )
}

import type { Metadata } from 'next'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'My Service Requests' }

const requests = [
  { id: 'SR-552019', type: 'Cartridge replacement', date: '12 Nov 2026', status: 'Open', tone: 'warning' as const },
  { id: 'SR-441870', type: 'Installation', date: '20 Oct 2026', status: 'Scheduled', tone: 'info' as const },
  { id: 'SR-310044', type: 'Repair', date: '02 Sep 2026', status: 'Closed', tone: 'success' as const },
]

export default function ServiceRequestsPage() {
  return (
    <AccountShell current="/account/service-requests" title="Service requests">
      <ul className="space-y-3">
        {requests.map((r) => (
          <li key={r.id}>
            <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{r.type}</p>
                <p className="text-sm text-muted">
                  {r.id} · Raised {r.date}
                </p>
              </div>
              <Badge tone={r.tone}>{r.status}</Badge>
            </Card>
          </li>
        ))}
      </ul>
      <ButtonLink className="mt-6" href="/service-request">
        New request
      </ButtonLink>
    </AccountShell>
  )
}

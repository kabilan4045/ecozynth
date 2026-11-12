'use client'

import { useRouter } from 'next/navigation'

import { logout, useAuth } from '@/demo/state/auth'
import { toast } from '@/demo/state/toast'

import { Button } from './ui/Button'

/** "Hello, name" greeting (dummy user, or a default name when logged out). */
export const AccountGreeting = () => {
  const user = useAuth()
  return <p className="text-lg">Hello, {user?.name ?? 'Demo Customer'} 👋</p>
}

export const LogoutButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        logout()
        toast.info('Logged out')
        router.push('/login')
      }}
      variant="outline"
    >
      Log out
    </Button>
  )
}

/** Toast-only button for actions that exist only in the final site. */
export const ComingSoonButton = ({ label, message = 'Available in final site' }: { label: string; message?: string }) => (
  <Button onClick={() => toast.info(message)} variant="outline">
    {label}
  </Button>
)

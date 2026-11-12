import Image from 'next/image'
import Link from 'next/link'

import { cn } from './ui/cn'

/**
 * The ONLY place the logo file is referenced.
 *
 * Uses `logo-trimmed.png`: the same pixels as `logo.png` with only the empty
 * transparent margin removed (the original artwork fills ~27% of its 500×500
 * canvas, which would make the wordmark unreadable at header size).
 * Swap the file here when the client supplies an SVG.
 */
const LOGO = { src: '/brand/logo-trimmed.png', width: 339, height: 134 }

const heights = { sm: 'h-8', md: 'h-10', lg: 'h-12' } as const

type LogoProps = {
  /** sm ≈ 32px (mobile header), md ≈ 40px (desktop header), lg ≈ 48px (footer, login). */
  size?: keyof typeof heights
  className?: string
  /** Set false to render without the link (e.g. inside another link). */
  link?: boolean
  priority?: boolean
  /** e.g. close the mobile menu when the logo is tapped */
  onClick?: () => void
}

export const Logo = ({ size = 'md', className, link = true, priority = false, onClick }: LogoProps) => {
  const image = (
    <Image
      alt="Ecozynth"
      className={cn('w-auto', heights[size])}
      height={LOGO.height}
      priority={priority}
      src={LOGO.src}
      width={LOGO.width}
    />
  )

  if (!link) return <span className={cn('inline-flex', className)}>{image}</span>

  return (
    <Link aria-label="Ecozynth home" className={cn('inline-flex shrink-0', className)} href="/" onClick={onClick}>
      {image}
    </Link>
  )
}

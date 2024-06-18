'use client'

import { cn } from '@/utils/cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  const isCurrentPath = pathname === href

  return (
    <Link
      href={href}
      className={cn('list-link', isCurrentPath && 'active')}
      prefetch
    >
      {children}
    </Link>
  )
}

export default NavLink

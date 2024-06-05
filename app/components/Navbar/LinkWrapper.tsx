'use client'

import { usePathname } from 'next/navigation'

const LinkWrapper = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  const isCurrentPath = pathname === href

  return <li className={`${isCurrentPath && 'active'}`}>{children}</li>
}

export default LinkWrapper

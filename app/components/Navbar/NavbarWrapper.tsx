'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scroll, setScroll] = useState(false)

  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== '/') {
        window.scrollY > 10 ? setScroll(true) : setScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return (
    <header
      className={`${scroll ? 'scroll' : ''} ${!isHome ? 'nav-background' : ''}`}
    >
      {children}
    </header>
  )
}

export default NavbarWrapper

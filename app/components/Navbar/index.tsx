import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import NavbarWrapper from './NavbarWrapper'
import LinkWrapper from './LinkWrapper'

const index = () => {
  return (
    <NavbarWrapper>
      <nav className="navbar">
        <Link className="logo" href={'/'}>
          <Image src="/logo.svg" width="1" height="1" alt="logo" priority />
        </Link>

        <ul className="social-links" role="list">
          <NavLink href="https://www.linkedin.com/in/scottduller/">
            <FaLinkedin className="icon" />
          </NavLink>
          <NavLink href="https://github.com/scottduller">
            <FaGithub className="icon" />
          </NavLink>
        </ul>

        <ul className="nav-links" role="list">
          <NavLink href="/about">About Me</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          {/* <NavLink href="/contact">Contact</NavLink> */}
        </ul>
      </nav>
    </NavbarWrapper>
  )
}

const NavLink = ({
  href,
  isExternal = false,
  children,
}: {
  href: string
  isExternal?: boolean
  children: React.ReactNode
}) => (
  <LinkWrapper href={href}>
    {isExternal ? (
      <Link
        href={href}
        className="list-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ) : (
      <Link className="list-link" href={href} prefetch>
        {children}
      </Link>
    )}
  </LinkWrapper>
)

export default index

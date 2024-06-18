import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import NavbarWrapper from './NavbarWrapper'
import NavLink from './NavLink'

const index = () => {
  return (
    <NavbarWrapper>
      <nav className="navbar">
        <Link href={'/'}>
          <Image
            className="logo pointer"
            src="/logo.svg"
            width="100"
            height="100"
            alt="logo"
            priority
          />
        </Link>

        <ul className="links" role="list">
          <li>
            <NavLink href="/about">About Me</NavLink>
          </li>
          <li>
            <NavLink href="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink href="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </NavbarWrapper>
  )
}

export default index

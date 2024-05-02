import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

const index = () => {
  return (
    <header>
      <nav className="navbar">
        <Link className="logo" href="/">
          <Image src="/logo.svg" width="1" height="1" alt="logo" priority />
        </Link>

        <ul className="social-links" role="list">
          <ListLink href="https://www.linkedin.com/in/scottduller/">
            <FaLinkedin className="icon" />
          </ListLink>
          <ListLink href="https://github.com/scottduller">
            <FaGithub className="icon" />
          </ListLink>
        </ul>

        <ul className="nav-links" role="list">
          <ListLink href="/about">About Me</ListLink>
          <ListLink href="/projects">Projects</ListLink>
          <ListLink href="/contact">Contact</ListLink>
        </ul>
      </nav>
    </header>
  )
}

const ListLink = ({
  href,
  isExternal = false,
  children,
}: {
  href: string
  isExternal?: boolean
  children: React.ReactNode
}) => (
  <li>
    {isExternal ? (
      <a
        href={href}
        className="list-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : (
      <Link className="list-link" href={href}>
        {children}
      </Link>
    )}
  </li>
)

export default index

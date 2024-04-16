import Image from 'next/image'
import React from 'react'

import { FaGithub, FaLinkedin } from 'react-icons/fa'

const index = () => {
  return (
    <header className="navbar">
      <Image src="/logo.svg" width={64} height={64} alt="logo" priority />
      <div className="links">
        <nav>
          <ul role="list">
            <li>Home</li>
            <li>About Me</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="social-links">
          <FaLinkedin size={48} />
          <FaGithub size={48} />
        </div>
      </div>
    </header>
  )
}

export default index

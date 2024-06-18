import Link from 'next/link'

import { FiGithub, FiLinkedin } from 'react-icons/fi'

const Socials = () => {
  return (
    <aside>
      <div className="socials">
        <Link
          href="https://www.linkedin.com/in/scottduller/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiLinkedin focusable strokeWidth={1} />

          <div className="pointer" />
        </Link>
        <Link
          href="https://github.com/scottduller"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub pointerEvents={0} strokeWidth={1} />
          <div className="pointer" />
        </Link>
      </div>
    </aside>
  )
}

export default Socials

import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navigation/Navbar'

import './styles/globals.css'
import Socials from '@/components/Navigation/Socials'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Navbar />
        <Socials />
        <Cursor />
      </body>
    </html>
  )
}

export default RootLayout

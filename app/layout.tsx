import Cursor from '@/components/Cursor'
import Navbar from '@/components/Navigation/Navbar'

import './styles/globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
        </main>
        <Cursor />
      </body>
    </html>
  )
}

export default RootLayout

import Cursor from './components/Cursor'
import Navbar from '@components/Navbar'

import './styles/globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Navbar />
        <Cursor />
      </body>
    </html>
  )
}

export default RootLayout

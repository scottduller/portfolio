import Cursor from './components/Cursor'
import Navbar from '@components/Navbar'

import './styles/globals.css'
import MetaballsScene from './components/MetaballsScene'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Cursor />
        <main>
          <div className="container">{children}</div>
          <MetaballsScene />
        </main>
      </body>
    </html>
  )
}

export default RootLayout

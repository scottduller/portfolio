import Cursor from './components/Cursor'
import './styles/globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <>
          {children}
          <Cursor />
        </>
      </body>
    </html>
  )
}

export default RootLayout

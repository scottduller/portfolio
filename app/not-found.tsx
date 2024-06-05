import Link from 'next/link'

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3em',
        width: '100%',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </div>
  )
}

export default NotFound

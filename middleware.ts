import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  // Check Edge Config to see if the maintenance page should be shown
  const isInMaintenanceMode = await get('isInMaintenanceMode')

  const isProduction =
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV === 'production'

  // If in maintenance mode, point the url pathname to the maintenance page
  if (isProduction && isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`

    // Rewrite to the url
    return NextResponse.rewrite(req.nextUrl)
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Basic auth for /admin per requirement
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'Ly321*^$*'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin')) {
    const auth = req.headers.get('authorization') || ''
    const [scheme, encoded] = auth.split(' ')
    if (scheme !== 'Basic' || !encoded) return unauthorized()
    // atob 在 Edge Runtime 可用
    const decoded = atob(encoded)
    const sep = decoded.indexOf(':')
    const user = sep >= 0 ? decoded.slice(0, sep) : ''
    const pass = sep >= 0 ? decoded.slice(sep + 1) : ''
    if (user !== ADMIN_USER || pass !== ADMIN_PASS) return unauthorized()
  }
  return NextResponse.next()
}

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}

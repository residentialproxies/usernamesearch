import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

function jsonUnauthorized() {
  return new Response(JSON.stringify({ error: 'Authentication required' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  })
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (token) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/')) {
    return jsonUnauthorized()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  loginUrl.searchParams.set('callbackUrl', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/check', '/api/me'],
}


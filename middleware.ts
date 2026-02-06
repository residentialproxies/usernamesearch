import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Maximum request body size (1MB)
const MAX_BODY_SIZE = 1048576

function jsonUnauthorized() {
  return new Response(JSON.stringify({ error: 'Authentication required' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  })
}

function jsonPayloadTooLarge() {
  return new Response(JSON.stringify({ error: 'Payload too large' }), {
    status: 413,
    headers: { 'content-type': 'application/json' },
  })
}

export async function middleware(request: NextRequest) {
  // Check request body size for POST/PUT requests
  if (request.method === 'POST' || request.method === 'PUT') {
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
      return jsonPayloadTooLarge()
    }
  }

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


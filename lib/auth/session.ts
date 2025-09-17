/**
 * Session management for user authentication
 * Using JWT tokens stored in httpOnly cookies
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

const alg = 'HS256'

export interface UserSession {
  id: string
  email: string
  name?: string
  apiKey?: string
  credits?: number
  plan: 'free' | 'pro' | 'enterprise'
}

/**
 * Create a JWT token for the user session
 */
export async function createToken(user: UserSession): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as UserSession
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * Set session cookie
 */
export async function setSession(user: UserSession) {
  const token = await createToken(user)
  
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

/**
 * Get current session from cookies
 */
export async function getSession(): Promise<UserSession | null> {
  const token = cookies().get('session')?.value
  
  if (!token) {
    return null
  }
  
  return await verifyToken(token)
}

/**
 * Clear session cookie
 */
export async function clearSession() {
  cookies().set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

/**
 * Middleware to protect API routes
 */
export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, session: UserSession) => Promise<NextResponse>
) {
  const session = await getSession()
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  return handler(request, session)
}

/**
 * Check if user has Pro plan
 */
export async function requireProPlan(): Promise<UserSession | null> {
  const session = await getSession()
  
  if (!session || session.plan !== 'pro') {
    return null
  }
  
  return session
}
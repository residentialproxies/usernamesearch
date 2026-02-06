import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { createAuthOptions } from '@/lib/auth/auth-options'
import { getD1Database } from '@/lib/server/d1'

async function getDbOptional() {
  try {
    return await getD1Database()
  } catch (err) {
    console.warn('[auth] D1 not available, running without DB:', err)
    return undefined
  }
}

export async function GET(request: NextRequest) {
  const handler = NextAuth(createAuthOptions({ db: await getDbOptional() }))
  return handler(request)
}

export async function POST(request: NextRequest) {
  const handler = NextAuth(createAuthOptions({ db: await getDbOptional() }))
  return handler(request)
}

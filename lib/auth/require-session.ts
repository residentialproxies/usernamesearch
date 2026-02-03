import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'

/**
 * Helper to gate API routes behind Auth.js session.
 */
export async function requireSession() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return { ok: true as const, session }
}

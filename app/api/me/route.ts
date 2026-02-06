import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/auth-options'
import { getD1Database } from '@/lib/server/d1'
import { getUtcYmd } from '@/lib/server/time'
import { getDailyUsageCount } from '@/lib/server/usage'
import { getUserByEmail, getUserById, upsertUser } from '@/lib/server/users'

const FREE_DAILY_LIMIT = 10
export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const db = await getD1Database()

  const userId = session.user.id
  const email = session.user.email

  if (!userId && !email) {
    return NextResponse.json({ error: 'User identity missing in session' }, { status: 500 })
  }

  const existing =
    (userId ? await getUserById(db, userId) : null) ||
    (email ? await getUserByEmail(db, email) : null)

  const ensuredUser =
    existing ||
    (email
      ? await upsertUser(db, {
          id: userId || `google:${email}`,
          email,
          name: session.user.name ?? null,
          pictureUrl: session.user.image ?? null,
        })
      : null)

  const plan = (ensuredUser?.plan || session.user.plan || 'free') as 'free' | 'pro' | 'enterprise'

  const ymd = getUtcYmd()
  const todayUsed = userId ? await getDailyUsageCount(db, userId, ymd) : 0
  const todayLimit = plan === 'free' ? FREE_DAILY_LIMIT : null

  return NextResponse.json({
    user: {
      id: ensuredUser?.id ?? userId ?? null,
      email: ensuredUser?.email ?? email ?? null,
      name: session.user.name ?? null,
      image: session.user.image ?? null,
      plan,
    },
    usage: {
      ymd,
      todayUsed,
      todayLimit,
    },
  })
}

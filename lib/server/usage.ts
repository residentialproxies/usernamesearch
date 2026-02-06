import 'server-only'

import type { D1Database } from '@/lib/server/d1'
import { getNextUtcMidnight } from '@/lib/server/time'

export async function getDailyUsageCount(db: D1Database, userId: string, ymd: string): Promise<number> {
  const row = await db
    .prepare('SELECT count FROM user_daily_usage WHERE user_id = ? AND ymd = ? LIMIT 1')
    .bind(userId, ymd)
    .first<{ count: number }>()

  return row?.count ?? 0
}

export async function consumeDailyQuota(db: D1Database, userId: string, ymd: string, limit: number): Promise<{
  allowed: boolean
  used: number
  remaining: number
  resetAt: string
}> {
  const resetAt = getNextUtcMidnight().toISOString()

  const row = await db
    .prepare(
      [
        'INSERT INTO user_daily_usage (user_id, ymd, count, updated_at)',
        'VALUES (?, ?, 1, unixepoch())',
        'ON CONFLICT(user_id, ymd) DO UPDATE SET',
        '  count = count + 1,',
        '  updated_at = unixepoch()',
        'WHERE count < ?',
        'RETURNING count',
      ].join('\n')
    )
    .bind(userId, ymd, limit)
    .first<{ count: number }>()

  if (!row) {
    return { allowed: false, used: limit, remaining: 0, resetAt }
  }

  const used = row.count
  return { allowed: true, used, remaining: Math.max(0, limit - used), resetAt }
}


import 'server-only'

import type { D1Database } from '@/lib/server/d1'

export async function hasSuccessfulPayment(db: D1Database, email: string): Promise<boolean> {
  const row = await db
    .prepare(
      [
        'SELECT 1 as ok',
        'FROM payments',
        'WHERE email = ?',
        "  AND status IN ('finished', 'confirmed')",
        'LIMIT 1',
      ].join('\n')
    )
    .bind(email)
    .first<{ ok: number }>()

  return Boolean(row?.ok)
}


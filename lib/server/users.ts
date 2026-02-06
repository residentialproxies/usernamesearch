import 'server-only'

import type { D1Database } from '@/lib/server/d1'

export type UserPlan = 'free' | 'pro' | 'enterprise'

export interface DbUser {
  id: string
  email: string
  name: string | null
  picture_url: string | null
  plan: UserPlan
  created_at: number
  updated_at: number
  last_login_at: number | null
}

export async function upsertUser(
  db: D1Database,
  user: {
    id: string
    email: string
    name?: string | null
    pictureUrl?: string | null
  }
): Promise<DbUser> {
  const row = await db
    .prepare(
      [
        'INSERT INTO users (id, email, name, picture_url, created_at, updated_at, last_login_at)',
        'VALUES (?, ?, ?, ?, unixepoch(), unixepoch(), unixepoch())',
        'ON CONFLICT(id) DO UPDATE SET',
        '  email = excluded.email,',
        '  name = excluded.name,',
        '  picture_url = excluded.picture_url,',
        "  updated_at = unixepoch(),",
        "  last_login_at = unixepoch()",
        'RETURNING id, email, name, picture_url, plan, created_at, updated_at, last_login_at',
      ].join('\n')
    )
    .bind(user.id, user.email, user.name ?? null, user.pictureUrl ?? null)
    .first<DbUser>()

  if (!row) {
    throw new Error('Failed to upsert user')
  }

  return row
}

export async function getUserById(db: D1Database, userId: string): Promise<Pick<DbUser, 'id' | 'email' | 'plan'> | null> {
  return db
    .prepare('SELECT id, email, plan FROM users WHERE id = ? LIMIT 1')
    .bind(userId)
    .first<Pick<DbUser, 'id' | 'email' | 'plan'>>()
}

export async function getUserByEmail(db: D1Database, email: string): Promise<Pick<DbUser, 'id' | 'email' | 'plan'> | null> {
  return db
    .prepare('SELECT id, email, plan FROM users WHERE email = ? LIMIT 1')
    .bind(email)
    .first<Pick<DbUser, 'id' | 'email' | 'plan'>>()
}

export async function setUserPlanByEmail(
  db: D1Database,
  email: string,
  plan: UserPlan
): Promise<{ id: string; plan: UserPlan } | null> {
  return db
    .prepare(
      [
        'UPDATE users',
        'SET plan = ?, updated_at = unixepoch()',
        'WHERE email = ?',
        'RETURNING id, plan',
      ].join('\n')
    )
    .bind(plan, email)
    .first<{ id: string; plan: UserPlan }>()
}


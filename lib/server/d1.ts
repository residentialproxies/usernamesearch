import 'server-only'

import { getCloudflareContext } from '@opennextjs/cloudflare'

export interface D1Result<T> {
  results: T[]
  success: boolean
  error?: string
  meta?: unknown
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement
  first<T = unknown>(colName?: string): Promise<T | null>
  all<T = unknown>(): Promise<{ results: T[] }>
  run<T = unknown>(): Promise<D1Result<T>>
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>
  exec?(query: string): Promise<unknown>
}

export async function getD1Database(): Promise<D1Database> {
  try {
    const { env } = await getCloudflareContext({ async: true })
    const db = (env as { DB?: unknown } | undefined)?.DB
    if (!db) {
      throw new Error(
        'D1 binding "DB" is missing. Configure `d1_databases` in `wrangler.jsonc` and redeploy.'
      )
    }
    return db as D1Database
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`Unable to access Cloudflare bindings. ${message}`)
  }
}

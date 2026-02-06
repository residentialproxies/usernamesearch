'server-only'

import type { D1Database } from '@/lib/server/d1'

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Check rate limit using D1 database
 * @param db D1 database instance
 * @param identifier Unique identifier (IP, email, user ID)
 * @param limit Maximum requests allowed in window
 * @param windowMs Time window in milliseconds
 */
export async function checkRateLimit(
  db: D1Database,
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now()
  const windowStart = now - windowMs

  try {
    // Clean old entries and count in single transaction
    await db
      .prepare('DELETE FROM rate_limits WHERE timestamp < ?')
      .bind(windowStart)
      .run()

    const countResult = await db
      .prepare(
        'SELECT COUNT(*) as count FROM rate_limits WHERE identifier = ? AND timestamp > ?'
      )
      .bind(identifier, windowStart)
      .first<{ count: number }>()

    const currentCount = countResult?.count || 0

    if (currentCount >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: windowStart + windowMs,
      }
    }

    // Record this request
    await db
      .prepare('INSERT INTO rate_limits (identifier, timestamp) VALUES (?, ?)')
      .bind(identifier, now)
      .run()

    return {
      allowed: true,
      remaining: limit - currentCount - 1,
      resetAt: windowStart + windowMs,
    }
  } catch (error) {
    // If rate limiting fails, allow the request but log the error
    console.error('Rate limit check failed:', error)
    return {
      allowed: true,
      remaining: limit,
      resetAt: now + windowMs,
    }
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

// Rate limit configurations
export const RATE_LIMITS = {
  CONTACT: { limit: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  PAYMENT_CREATE: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  GENERATE: { limit: 20, windowMs: 60 * 1000 }, // 20 per minute
  TURNSTILE: { limit: 10, windowMs: 60 * 1000 }, // 10 per minute
} as const

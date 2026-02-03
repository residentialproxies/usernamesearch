export interface GoogleApiErrorPayload {
  error?: {
    code?: number
    message?: string
    status?: string
    errors?: Array<{
      message?: string
      domain?: string
      reason?: string
    }>
  }
}

export function parseGoogleApiKeys(raw: string | undefined): string[] {
  if (!raw) return []
  const seen = new Set<string>()
  return raw
    .split(/[\s,]+/g)
    .map((k) => k.trim())
    .filter(Boolean)
    .filter((k) => {
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
}

export function buildGoogleUsernameQuery(username: string): string {
  const trimmed = username.trim()
  if (!trimmed) return ''
  return `"${trimmed}" OR "@${trimmed}"`
}

export function clampGoogleNum(num: number, fallback = 5): number {
  const value = Number.isFinite(num) ? num : fallback
  return Math.max(1, Math.min(Math.trunc(value), 10))
}

function hashStringToUint32(input: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export function getRotatedKeyOrder(keys: string[], seed: string) {
  if (keys.length === 0) return []
  if (keys.length === 1) return [{ key: keys[0], index: 0 }]
  const startIndex = hashStringToUint32(seed) % keys.length
  return Array.from({ length: keys.length }, (_, offset) => {
    const index = (startIndex + offset) % keys.length
    return { key: keys[index], index }
  })
}

function extractReasons(payload: unknown): string[] {
  if (!payload || typeof payload !== 'object') return []
  const error = (payload as GoogleApiErrorPayload).error
  const reasons = error?.errors
    ?.map((e) => e?.reason)
    .filter((r): r is string => typeof r === 'string' && r.length > 0)
  return reasons ?? []
}

export function isRetryableGoogleError(status: number, payload: unknown): boolean {
  if ([401, 403, 429].includes(status)) return true
  const reasons = extractReasons(payload)
  const retryableReasons = new Set<string>([
    'dailyLimitExceeded',
    'userRateLimitExceeded',
    'rateLimitExceeded',
    'quotaExceeded',
    'keyInvalid',
    'ipRefererBlocked',
  ])
  return reasons.some((r) => retryableReasons.has(r))
}

export function formatGoogleErrorMessage(status: number, payload: unknown): string {
  if (!payload || typeof payload !== 'object') {
    return `Google Search API error (${status})`
  }

  const error = (payload as GoogleApiErrorPayload).error
  const message = typeof error?.message === 'string' ? error.message : null
  const reasons = extractReasons(payload)
  const reasonSuffix = reasons.length > 0 ? ` [${reasons.join(', ')}]` : ''

  return message ? `${message}${reasonSuffix}` : `Google Search API error (${status})${reasonSuffix}`
}

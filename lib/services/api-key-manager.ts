/**
 * API Key Manager (D1)
 * 管理 API 密钥的创建、验证和使用次数追踪
 */

import 'server-only'

import { API_KEY_CONFIG, API_KEY_STATUS, ERROR_MESSAGES } from '@/lib/config'
import { getD1Database } from '@/lib/server/d1'

export interface ApiKeyData {
  key: string
  createdAt: number
  email: string
  credits: number
  usedCredits: number
  paymentId?: string | null
  status: 'active' | 'expired' | 'suspended'
}

function randomHex(bytesLength: number): string {
  const bytes = new Uint8Array(bytesLength)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * 生成新的 API 密钥
 */
export function generateApiKey(): string {
  const prefix = API_KEY_CONFIG.PREFIX
  const randomBytes = randomHex(API_KEY_CONFIG.RANDOM_BYTES_LENGTH)
  return `${prefix}_${randomBytes}`
}

/**
 * 创建新的 API 密钥（付款成功后调用）
 */
export async function createApiKey(
  email: string,
  credits: number = API_KEY_CONFIG.DEFAULT_CREDITS,
  paymentId?: string
): Promise<string> {
  const db = await getD1Database()
  const key = generateApiKey()

  const result = await db
    .prepare(
      [
        'INSERT INTO api_keys (key, owner_email, credits, used_credits, status, payment_id, created_at, updated_at)',
        'VALUES (?, ?, ?, 0, ?, ?, unixepoch(), unixepoch())',
      ].join('\n')
    )
    .bind(key, email, credits, API_KEY_STATUS.ACTIVE, paymentId ?? null)
    .run()

  if (!result.success) {
    throw new Error(result.error || 'Failed to create API key')
  }

  return key
}

/**
 * 验证 API 密钥
 */
export async function validateApiKey(apiKey: string): Promise<{
  valid: boolean
  reason?: string
  data?: ApiKeyData
}> {
  if (!apiKey || !apiKey.startsWith(`${API_KEY_CONFIG.PREFIX}_`)) {
    return { valid: false, reason: ERROR_MESSAGES.API_KEY_INVALID_FORMAT }
  }

  const db = await getD1Database()

  const row = await db
    .prepare(
      [
        'SELECT',
        '  key,',
        '  owner_email as email,',
        '  credits,',
        '  used_credits as usedCredits,',
        '  payment_id as paymentId,',
        '  status,',
        '  created_at as createdAt',
        'FROM api_keys',
        'WHERE key = ?',
        'LIMIT 1',
      ].join('\n')
    )
    .bind(apiKey)
    .first<ApiKeyData>()

  if (!row) {
    return { valid: false, reason: ERROR_MESSAGES.API_KEY_NOT_FOUND }
  }

  if (row.status !== API_KEY_STATUS.ACTIVE) {
    return { valid: false, reason: ERROR_MESSAGES.API_KEY_SUSPENDED(row.status) }
  }

  if (row.usedCredits >= row.credits) {
    return { valid: false, reason: ERROR_MESSAGES.API_KEY_EXHAUSTED }
  }

  return { valid: true, data: row }
}

/**
 * 记录 API 使用（原子自增）
 */
export async function recordApiUsage(apiKey: string): Promise<{
  success: boolean
  remainingCredits?: number
  error?: string
}> {
  const db = await getD1Database()

  const row = await db
    .prepare(
      [
        'UPDATE api_keys',
        'SET',
        '  used_credits = used_credits + 1,',
        `  status = CASE WHEN used_credits + 1 >= credits THEN '${API_KEY_STATUS.EXPIRED}' ELSE status END,`,
        '  updated_at = unixepoch()',
        'WHERE',
        '  key = ?',
        `  AND status = '${API_KEY_STATUS.ACTIVE}'`,
        '  AND used_credits < credits',
        'RETURNING credits, used_credits as usedCredits',
      ].join('\n')
    )
    .bind(apiKey)
    .first<{ credits: number; usedCredits: number }>()

  if (!row) {
    const validation = await validateApiKey(apiKey)
    return { success: false, error: validation.reason || ERROR_MESSAGES.API_KEY_NOT_FOUND }
  }

  return {
    success: true,
    remainingCredits: Math.max(0, row.credits - row.usedCredits),
  }
}

/**
 * 获取 API 密钥统计信息
 */
export async function getApiKeyStats(apiKey: string): Promise<{
  found: boolean
  stats?: {
    email: string
    totalCredits: number
    usedCredits: number
    remainingCredits: number
    createdAt: number
    status: string
  }
}> {
  const db = await getD1Database()

  const row = await db
    .prepare(
      [
        'SELECT',
        '  owner_email as email,',
        '  credits as totalCredits,',
        '  used_credits as usedCredits,',
        '  created_at as createdAt,',
        '  status',
        'FROM api_keys',
        'WHERE key = ?',
        'LIMIT 1',
      ].join('\n')
    )
    .bind(apiKey)
    .first<{
      email: string
      totalCredits: number
      usedCredits: number
      createdAt: number
      status: string
    }>()

  if (!row) return { found: false }

  return {
    found: true,
    stats: {
      ...row,
      remainingCredits: Math.max(0, row.totalCredits - row.usedCredits),
    },
  }
}

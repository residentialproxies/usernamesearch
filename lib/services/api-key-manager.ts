/**
 * API Key Manager
 * 管理 API 密钥的创建、验证和使用次数追踪
 */

import crypto from 'crypto'

// 在生产环境中，这些应该存储在数据库中
// 这里使用内存存储作为示例
const API_KEYS_STORE = new Map<string, ApiKeyData>()
const USAGE_STORE = new Map<string, number>()

interface ApiKeyData {
  key: string
  createdAt: Date
  email: string
  credits: number
  usedCredits: number
  paymentId?: string
  status: 'active' | 'expired' | 'suspended'
}

/**
 * 生成新的 API 密钥
 */
export function generateApiKey(): string {
  const prefix = 'usc' // usernamesearch
  const randomBytes = crypto.randomBytes(24).toString('hex')
  return `${prefix}_${randomBytes}`
}

/**
 * 创建新的 API 密钥（付款成功后调用）
 */
export async function createApiKey(
  email: string, 
  credits: number = 500,
  paymentId?: string
): Promise<string> {
  const key = generateApiKey()
  
  const apiKeyData: ApiKeyData = {
    key,
    createdAt: new Date(),
    email,
    credits,
    usedCredits: 0,
    paymentId,
    status: 'active'
  }
  
  // 存储 API 密钥数据
  API_KEYS_STORE.set(key, apiKeyData)
  USAGE_STORE.set(key, 0)
  
  // 在生产环境中，这里应该保存到数据库
  // await saveToDatabase(apiKeyData)
  
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
  // 检查密钥格式
  if (!apiKey || !apiKey.startsWith('usc_')) {
    return { valid: false, reason: 'Invalid API key format' }
  }
  
  // 获取密钥数据
  const keyData = API_KEYS_STORE.get(apiKey)
  
  if (!keyData) {
    return { valid: false, reason: 'API key not found' }
  }
  
  // 检查状态
  if (keyData.status !== 'active') {
    return { valid: false, reason: `API key is ${keyData.status}` }
  }
  
  // 检查使用次数
  if (keyData.usedCredits >= keyData.credits) {
    return { valid: false, reason: 'API key credits exhausted' }
  }
  
  return { valid: true, data: keyData }
}

/**
 * 记录 API 使用
 */
export async function recordApiUsage(apiKey: string): Promise<{
  success: boolean
  remainingCredits?: number
  error?: string
}> {
  const validation = await validateApiKey(apiKey)
  
  if (!validation.valid) {
    return { success: false, error: validation.reason }
  }
  
  const keyData = validation.data!
  
  // 增加使用次数
  keyData.usedCredits += 1
  USAGE_STORE.set(apiKey, keyData.usedCredits)
  
  // 检查是否用完
  if (keyData.usedCredits >= keyData.credits) {
    keyData.status = 'expired'
  }
  
  // 更新存储
  API_KEYS_STORE.set(apiKey, keyData)
  
  return {
    success: true,
    remainingCredits: keyData.credits - keyData.usedCredits
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
    createdAt: Date
    status: string
  }
}> {
  const keyData = API_KEYS_STORE.get(apiKey)
  
  if (!keyData) {
    return { found: false }
  }
  
  return {
    found: true,
    stats: {
      email: keyData.email,
      totalCredits: keyData.credits,
      usedCredits: keyData.usedCredits,
      remainingCredits: keyData.credits - keyData.usedCredits,
      createdAt: keyData.createdAt,
      status: keyData.status
    }
  }
}

/**
 * 免费层级速率限制
 * 使用 IP 地址限制免费用户每天 10 次查询
 */
const FREE_USAGE_STORE = new Map<string, { count: number; resetAt: Date }>()
const FREE_DAILY_LIMIT = 10

export async function checkFreeUsageLimit(ipAddress: string): Promise<{
  allowed: boolean
  remaining: number
  resetAt?: Date
}> {
  const now = new Date()
  const usage = FREE_USAGE_STORE.get(ipAddress)
  
  // 如果没有记录或已过期，创建新记录
  if (!usage || usage.resetAt < now) {
    const resetAt = new Date(now)
    resetAt.setDate(resetAt.getDate() + 1) // 24小时后重置
    resetAt.setHours(0, 0, 0, 0) // 设置为第二天凌晨
    
    FREE_USAGE_STORE.set(ipAddress, {
      count: 0,
      resetAt
    })
    
    return { allowed: true, remaining: FREE_DAILY_LIMIT }
  }
  
  // 检查是否超过限制
  if (usage.count >= FREE_DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: usage.resetAt
    }
  }
  
  return {
    allowed: true,
    remaining: FREE_DAILY_LIMIT - usage.count,
    resetAt: usage.resetAt
  }
}

/**
 * 记录免费使用
 */
export async function recordFreeUsage(ipAddress: string): Promise<void> {
  const usage = FREE_USAGE_STORE.get(ipAddress)
  
  if (usage) {
    usage.count += 1
    FREE_USAGE_STORE.set(ipAddress, usage)
  }
}

/**
 * 清理过期的免费使用记录（应该定期运行）
 */
export function cleanupExpiredFreeUsage(): void {
  const now = new Date()
  
  for (const [ip, usage] of FREE_USAGE_STORE.entries()) {
    if (usage.resetAt < now) {
      FREE_USAGE_STORE.delete(ip)
    }
  }
}

// 每小时清理一次过期记录
setInterval(cleanupExpiredFreeUsage, 60 * 60 * 1000)

/**
 * 示例：创建测试 API 密钥
 */
export function createTestApiKey(): string {
  const testKey = createApiKey('test@example.com', 100, 'test_payment')
  console.log('Test API key created:', testKey)
  return testKey as unknown as string
}
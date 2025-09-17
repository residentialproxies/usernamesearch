/**
 * User management system
 * In production, this should be replaced with a proper database (PostgreSQL/MongoDB)
 */

import crypto from 'crypto'

export interface User {
  id: string
  email: string
  password: string // hashed
  name?: string
  apiKey?: string
  credits: number
  usedCredits: number
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  updatedAt: Date
}

// In-memory storage (replace with database in production)
const USERS_STORE = new Map<string, User>()
const EMAIL_TO_ID = new Map<string, string>()

/**
 * Hash password using crypto (in production use bcrypt)
 */
export function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + (process.env.PASSWORD_SALT || 'default-salt'))
    .digest('hex')
}

/**
 * Verify password
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

/**
 * Create a new user
 */
export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<User | null> {
  // Check if user already exists
  if (EMAIL_TO_ID.has(email)) {
    return null
  }
  
  const userId = crypto.randomUUID()
  const hashedPassword = hashPassword(password)
  
  const user: User = {
    id: userId,
    email,
    password: hashedPassword,
    name,
    credits: 10, // Free tier: 10 searches per day
    usedCredits: 0,
    plan: 'free',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  
  USERS_STORE.set(userId, user)
  EMAIL_TO_ID.set(email, userId)
  
  return user
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const userId = EMAIL_TO_ID.get(email)
  if (!userId) {
    return null
  }
  
  return USERS_STORE.get(userId) || null
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  return USERS_STORE.get(id) || null
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  const user = USERS_STORE.get(id)
  if (!user) {
    return null
  }
  
  const updatedUser = {
    ...user,
    ...updates,
    id: user.id, // Prevent ID change
    email: user.email, // Prevent email change
    updatedAt: new Date(),
  }
  
  USERS_STORE.set(id, updatedUser)
  return updatedUser
}

/**
 * Upgrade user to Pro
 */
export async function upgradeUserToPro(
  userId: string,
  apiKey: string,
  credits: number = 500
): Promise<User | null> {
  return updateUser(userId, {
    plan: 'pro',
    apiKey,
    credits,
    usedCredits: 0,
  })
}

/**
 * Use credits
 */
export async function useCredits(userId: string, amount: number = 1): Promise<{
  success: boolean
  remainingCredits?: number
  error?: string
}> {
  const user = await findUserById(userId)
  
  if (!user) {
    return { success: false, error: 'User not found' }
  }
  
  if (user.usedCredits + amount > user.credits) {
    return { 
      success: false, 
      error: 'Insufficient credits',
      remainingCredits: user.credits - user.usedCredits
    }
  }
  
  await updateUser(userId, {
    usedCredits: user.usedCredits + amount
  })
  
  return {
    success: true,
    remainingCredits: user.credits - (user.usedCredits + amount)
  }
}

/**
 * Reset daily free credits (should be called by a cron job)
 */
export async function resetDailyCredits() {
  const entries = Array.from(USERS_STORE.entries())
  for (const [id, user] of entries) {
    if (user.plan === 'free') {
      await updateUser(id, {
        credits: 10,
        usedCredits: 0,
      })
    }
  }
}

/**
 * Create demo users for testing
 */
export async function createDemoUsers() {
  // Create a free user
  await createUser('demo@example.com', 'password123', 'Demo User')
  
  // Create a pro user
  const proUser = await createUser('pro@example.com', 'password123', 'Pro User')
  if (proUser) {
    await upgradeUserToPro(proUser.id, 'usc_demo_api_key_123', 500)
  }
}

// Initialize demo users in development
if (process.env.NODE_ENV === 'development') {
  createDemoUsers()
}
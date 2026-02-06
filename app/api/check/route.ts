import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/auth-options'
import { getD1Database } from '@/lib/server/d1'
import { getUtcYmd } from '@/lib/server/time'
import { consumeDailyQuota } from '@/lib/server/usage'
import { getUserByEmail, getUserById, upsertUser } from '@/lib/server/users'
import { checkUsernameViaAPI, getTotalSitesCount } from '@/lib/services/whatsmynameapp-api'
import { sortResultsByRanking } from '@/lib/services/similarweb-rankings'

const FREE_DAILY_LIMIT = 10
export const dynamic = 'force-dynamic'

/**
 * POST /api/check
 * 检查用户名在520+平台的可用性
 * 使用 WhatsMyName.io API
 */
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json()
    const { username, rescan = false } = body
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }
    
    // 验证用户名格式
    if (username.length < 2 || username.length > 50) {
      return NextResponse.json(
        { error: 'Username must be between 2 and 50 characters' },
        { status: 400 }
      )
    }

    if (plan === 'free') {
      const ymd = getUtcYmd()
      const quota = await consumeDailyQuota(db, ensuredUser?.id ?? userId ?? 'unknown', ymd, FREE_DAILY_LIMIT)
      if (!quota.allowed) {
        return NextResponse.json(
          {
            error: 'Daily limit reached',
            ymd,
            limit: FREE_DAILY_LIMIT,
            remaining: 0,
            resetAt: quota.resetAt,
          },
          { status: 429 }
        )
      }
    }
    
    // 调用 WhatsMyName API（支持520+平台）
    const apiResponse = await checkUsernameViaAPI(username, rescan)
    
    // 按流量排名排序结果
    const sortedResults = sortResultsByRanking(apiResponse.result)
    
    // 统计信息
    const stats = {
      totalChecked: sortedResults.length,
      totalAvailable: sortedResults.filter(r => !r.isExist).length,
      totalTaken: sortedResults.filter(r => r.isExist).length,
      totalSites: getTotalSitesCount(), // 显示支持的总站点数（520+）
    }
    
    // 按分类分组结果
    const categorizedResults: Record<string, typeof sortedResults> = {}
    for (const result of sortedResults) {
      const category = result.category || 'Other'
      if (!categorizedResults[category]) {
        categorizedResults[category] = []
      }
      categorizedResults[category].push(result)
    }
    
    return NextResponse.json({
      username,
      results: sortedResults,
      categorizedResults,
      stats,
      timestamp: apiResponse.createdAt,
      apiError: apiResponse.error || null,
    })
    
  } catch (error) {
    console.error('Username check error:', error)
    
    // 如果 API 调用失败，返回友好的错误信息
    return NextResponse.json(
      { 
        error: 'Failed to check username availability. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'

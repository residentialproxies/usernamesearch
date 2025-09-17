import { NextRequest, NextResponse } from 'next/server'
import { 
  checkUsernameViaAPI, 
  getTotalSitesCount
} from '@/lib/services/whatsmyname-api'
import { sortResultsByRanking } from '@/lib/services/similarweb-rankings'
import { validateApiKey, recordApiUsage } from '@/lib/services/api-key-manager'

/**
 * POST /api/check-pro
 * Pro 版本的用户名检查 API（需要 API 密钥）
 * 支持批量检查和更多功能
 */
export async function POST(request: NextRequest) {
  try {
    // 获取 API 密钥
    const apiKey = request.headers.get('x-api-key') || 
                   request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required. Get one at https://usernamesearch.io/pricing' },
        { status: 401 }
      )
    }
    
    // 验证 API 密钥
    const validation = await validateApiKey(apiKey)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const { 
      username, 
      usernames, // 支持批量检查
      rescan = false,
      includeUnavailable = true, // 是否包含不可用的结果
      categories // 只检查特定分类
    } = body
    
    // 确定要检查的用户名列表
    const usernamesToCheck = usernames || (username ? [username] : [])
    
    if (usernamesToCheck.length === 0) {
      return NextResponse.json(
        { error: 'At least one username is required' },
        { status: 400 }
      )
    }
    
    if (usernamesToCheck.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 usernames per request' },
        { status: 400 }
      )
    }
    
    // 记录 API 使用（每个用户名算一次）
    const results = []
    let totalUsage = 0
    
    for (const user of usernamesToCheck) {
      // 记录使用
      const usage = await recordApiUsage(apiKey)
      if (!usage.success) {
        return NextResponse.json(
          { 
            error: usage.error,
            resultsReturned: results.length,
            message: `Processed ${results.length} usernames before hitting limit`
          },
          { status: 403 }
        )
      }
      
      totalUsage++
      
      // 调用 WhatsMyName API
      const apiResponse = await checkUsernameViaAPI(user, rescan)
      
      // 按流量排名排序结果
      let sortedResults = sortResultsByRanking(apiResponse.result)
      
      // 过滤分类（如果指定）
      if (categories && categories.length > 0) {
        sortedResults = sortedResults.filter(r => 
          categories.includes(r.category || 'Other')
        )
      }
      
      // 过滤不可用的结果（如果需要）
      if (!includeUnavailable) {
        sortedResults = sortedResults.filter(r => !r.isExist)
      }
      
      results.push({
        username: user,
        results: sortedResults,
        stats: {
          totalChecked: sortedResults.length,
          totalAvailable: sortedResults.filter(r => !r.isExist).length,
          totalTaken: sortedResults.filter(r => r.isExist).length,
        },
        timestamp: apiResponse.createdAt
      })
    }
    
    // 获取剩余额度
    const keyStats = await validation.data
    const remainingCredits = keyStats ? keyStats.credits - keyStats.usedCredits - totalUsage : 0
    
    return NextResponse.json({
      success: true,
      results,
      usage: {
        requestCount: totalUsage,
        remainingCredits,
        totalCredits: keyStats?.credits || 0
      },
      totalSitesSupported: getTotalSitesCount(),
      message: 'Pro API - Full access to 520+ platforms'
    })
    
  } catch (error) {
    console.error('Pro API check error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to check username availability',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/check-pro
 * 获取 API 密钥信息
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key') || 
                   request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 401 }
      )
    }
    
    // 验证并获取 API 密钥信息
    const validation = await validateApiKey(apiKey)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 403 }
      )
    }
    
    const keyData = validation.data!
    
    return NextResponse.json({
      valid: true,
      credits: {
        total: keyData.credits,
        used: keyData.usedCredits,
        remaining: keyData.credits - keyData.usedCredits
      },
      status: keyData.status,
      createdAt: keyData.createdAt,
      email: keyData.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // 隐藏部分邮箱
      endpoints: {
        check: 'POST /api/check-pro',
        bulkCheck: 'POST /api/check-pro (with usernames array)',
        stats: 'GET /api/check-pro',
        sites: 'GET /api/check?info=sites'
      }
    })
    
  } catch (error) {
    console.error('API key info error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve API key information' },
      { status: 500 }
    )
  }
}
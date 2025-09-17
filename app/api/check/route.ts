import { NextRequest, NextResponse } from 'next/server'
import { 
  checkUsernameViaAPI, 
  getAllSupportedSites, 
  getTotalSitesCount,
  getSitesByCategory,
  getAllCategories 
} from '@/lib/services/whatsmyname-api'
import { sortResultsByRanking } from '@/lib/services/similarweb-rankings'

/**
 * POST /api/check
 * 检查用户名在520+平台的可用性
 * 使用 WhatsMyName.io API
 */
export async function POST(request: NextRequest) {
  try {
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

/**
 * GET /api/check
 * 获取支持的站点信息
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')
    
    if (info === 'sites') {
      // 返回所有支持的站点列表
      const sites = getAllSupportedSites()
      return NextResponse.json({
        sites,
        total: sites.length
      })
    }
    
    if (info === 'categories') {
      // 返回按分类分组的站点
      const categories = getSitesByCategory()
      const categoryStats = Object.entries(categories).map(([category, sites]) => ({
        category,
        count: sites.length,
        sites: sites.slice(0, 10) // 每个分类只返回前10个示例
      }))
      
      return NextResponse.json({
        categories: categoryStats,
        totalCategories: categoryStats.length,
        totalSites: getTotalSitesCount()
      })
    }
    
    // 默认返回统计信息
    return NextResponse.json({
      message: 'Username Search API - Powered by WhatsMyName.io',
      totalSupportedSites: getTotalSitesCount(),
      categories: getAllCategories(),
      endpoints: {
        check: 'POST /api/check',
        sites: 'GET /api/check?info=sites',
        categories: 'GET /api/check?info=categories',
        generate: 'POST /api/generate'
      }
    })
    
  } catch (error) {
    console.error('API info error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve information' },
      { status: 500 }
    )
  }
}
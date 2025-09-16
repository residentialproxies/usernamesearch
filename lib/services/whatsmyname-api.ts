/**
 * WhatsMyName API Service
 * 调用 whatsmyname.io API 检查用户名在1500+平台的可用性
 */

import siteData from '@/lib/data/sites.json'

const API_BASE_URL = 'https://api.whatsmyname.io'

export interface CheckResult {
  url: string
  source: string
  isExist: boolean
  category?: string
  ranking?: number
}

interface ApiResponse {
  error: string
  result: CheckResult[]
  createdAt: string
}

interface SiteInfo {
  category: string
  errorMsg: string
  errorType: string
  url: string
  urlMain: string
  username_claimed: string
  username_unclaimed: string
}

/**
 * 调用 WhatsMyName API 检查用户名
 * 支持1500+平台的实时检查
 */
export async function checkUsernameViaAPI(
  username: string,
  rescan: boolean = false
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/discoverprofile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: username,
        type: 'name',
        rescan,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    
    // 处理API返回的数据格式
    const results = data.result || data.resultArr || []
    
    // 为每个结果添加分类信息
    const enrichedResults = results.map((item: any) => ({
      ...item,
      category: getCategoryForSite(item.source),
    }))

    return {
      error: data.error || '',
      result: enrichedResults,
      createdAt: data.createdAt || new Date().toISOString(),
    }
  } catch (error) {
    console.error('WhatsMyName API error:', error)
    throw error
  }
}

/**
 * 获取站点的分类
 */
export function getCategoryForSite(siteName: string): string {
  const sites = siteData as unknown as Record<string, SiteInfo>
  
  if (sites[siteName]) {
    return sites[siteName].category
  }
  
  return 'Other'
}

/**
 * 获取所有支持的站点列表
 */
export function getAllSupportedSites(): string[] {
  const sites = siteData as unknown as Record<string, SiteInfo>
  return Object.keys(sites)
}

/**
 * 获取站点总数
 */
export function getTotalSitesCount(): number {
  return getAllSupportedSites().length
}

/**
 * 按分类获取站点
 */
export function getSitesByCategory(): Record<string, string[]> {
  const sites = siteData as unknown as Record<string, SiteInfo>
  const categories: Record<string, string[]> = {}
  
  for (const [siteName, siteInfo] of Object.entries(sites)) {
    const category = siteInfo.category || 'Other'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(siteName)
  }
  
  return categories
}

/**
 * 获取站点信息
 */
export function getSiteInfo(siteName: string): SiteInfo | null {
  const sites = siteData as unknown as Record<string, SiteInfo>
  return sites[siteName] || null
}

/**
 * 获取所有分类
 */
export function getAllCategories(): string[] {
  const sites = siteData as unknown as Record<string, SiteInfo>
  const categories = new Set<string>()
  
  for (const siteInfo of Object.values(sites)) {
    if (siteInfo.category) {
      categories.add(siteInfo.category)
    }
  }
  
  return Array.from(categories).sort()
}
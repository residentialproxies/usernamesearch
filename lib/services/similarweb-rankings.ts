/**
 * SimilarWeb Rankings Service
 * 获取网站流量排名数据，用于对搜索结果进行排序
 */

interface SimilarWebData {
  domain: string
  globalRank: number
  categoryRank: number
  monthlyVisits: number
  category: string
}

// 预定义的热门网站排名（基于 SimilarWeb 数据）
// 实际应用中应该通过 API 获取，这里先硬编码常用网站的排名
const PREDEFINED_RANKINGS: Record<string, SimilarWebData> = {
  'instagram.com': {
    domain: 'instagram.com',
    globalRank: 4,
    categoryRank: 1,
    monthlyVisits: 4800000000,
    category: 'Social Networks'
  },
  'facebook.com': {
    domain: 'facebook.com',
    globalRank: 3,
    categoryRank: 2,
    monthlyVisits: 16000000000,
    category: 'Social Networks'
  },
  'twitter.com': {
    domain: 'twitter.com',
    globalRank: 5,
    categoryRank: 3,
    monthlyVisits: 6600000000,
    category: 'Social Networks'
  },
  'x.com': {
    domain: 'x.com',
    globalRank: 5,
    categoryRank: 3,
    monthlyVisits: 6600000000,
    category: 'Social Networks'
  },
  'tiktok.com': {
    domain: 'tiktok.com',
    globalRank: 6,
    categoryRank: 4,
    monthlyVisits: 3200000000,
    category: 'Social Networks'
  },
  'linkedin.com': {
    domain: 'linkedin.com',
    globalRank: 15,
    categoryRank: 5,
    monthlyVisits: 1800000000,
    category: 'Professional'
  },
  'youtube.com': {
    domain: 'youtube.com',
    globalRank: 2,
    categoryRank: 1,
    monthlyVisits: 33000000000,
    category: 'Video'
  },
  'reddit.com': {
    domain: 'reddit.com',
    globalRank: 18,
    categoryRank: 6,
    monthlyVisits: 1700000000,
    category: 'Social Networks'
  },
  'pinterest.com': {
    domain: 'pinterest.com',
    globalRank: 32,
    categoryRank: 7,
    monthlyVisits: 900000000,
    category: 'Social Networks'
  },
  'snapchat.com': {
    domain: 'snapchat.com',
    globalRank: 122,
    categoryRank: 10,
    monthlyVisits: 320000000,
    category: 'Social Networks'
  },
  'github.com': {
    domain: 'github.com',
    globalRank: 98,
    categoryRank: 1,
    monthlyVisits: 430000000,
    category: 'Technology'
  },
  'stackoverflow.com': {
    domain: 'stackoverflow.com',
    globalRank: 127,
    categoryRank: 2,
    monthlyVisits: 270000000,
    category: 'Technology'
  },
  'medium.com': {
    domain: 'medium.com',
    globalRank: 192,
    categoryRank: 1,
    monthlyVisits: 200000000,
    category: 'Publishing'
  },
  'twitch.tv': {
    domain: 'twitch.tv',
    globalRank: 35,
    categoryRank: 1,
    monthlyVisits: 1100000000,
    category: 'Gaming'
  },
  'discord.com': {
    domain: 'discord.com',
    globalRank: 45,
    categoryRank: 2,
    monthlyVisits: 650000000,
    category: 'Gaming'
  },
  'telegram.org': {
    domain: 'telegram.org',
    globalRank: 88,
    categoryRank: 8,
    monthlyVisits: 500000000,
    category: 'Social Networks'
  },
  'whatsapp.com': {
    domain: 'whatsapp.com',
    globalRank: 48,
    categoryRank: 9,
    monthlyVisits: 600000000,
    category: 'Social Networks'
  },
  'spotify.com': {
    domain: 'spotify.com',
    globalRank: 72,
    categoryRank: 1,
    monthlyVisits: 480000000,
    category: 'Music'
  },
  'soundcloud.com': {
    domain: 'soundcloud.com',
    globalRank: 312,
    categoryRank: 2,
    monthlyVisits: 120000000,
    category: 'Music'
  },
  'behance.net': {
    domain: 'behance.net',
    globalRank: 425,
    categoryRank: 1,
    monthlyVisits: 85000000,
    category: 'Design'
  },
  'dribbble.com': {
    domain: 'dribbble.com',
    globalRank: 2150,
    categoryRank: 2,
    monthlyVisits: 15000000,
    category: 'Design'
  },
  'deviantart.com': {
    domain: 'deviantart.com',
    globalRank: 650,
    categoryRank: 3,
    monthlyVisits: 45000000,
    category: 'Design'
  },
  'flickr.com': {
    domain: 'flickr.com',
    globalRank: 892,
    categoryRank: 1,
    monthlyVisits: 35000000,
    category: 'Photography'
  },
  'vimeo.com': {
    domain: 'vimeo.com',
    globalRank: 456,
    categoryRank: 2,
    monthlyVisits: 75000000,
    category: 'Video'
  },
  'steam.com': {
    domain: 'steam.com',
    globalRank: 125,
    categoryRank: 3,
    monthlyVisits: 280000000,
    category: 'Gaming'
  },
  'gitlab.com': {
    domain: 'gitlab.com',
    globalRank: 1250,
    categoryRank: 3,
    monthlyVisits: 25000000,
    category: 'Technology'
  },
  'bitbucket.org': {
    domain: 'bitbucket.org',
    globalRank: 3200,
    categoryRank: 4,
    monthlyVisits: 8000000,
    category: 'Technology'
  },
  'producthunt.com': {
    domain: 'producthunt.com',
    globalRank: 4500,
    categoryRank: 1,
    monthlyVisits: 5000000,
    category: 'Business'
  },
  'angellist.com': {
    domain: 'angellist.com',
    globalRank: 5200,
    categoryRank: 2,
    monthlyVisits: 4000000,
    category: 'Business'
  },
  'crunchbase.com': {
    domain: 'crunchbase.com',
    globalRank: 3800,
    categoryRank: 3,
    monthlyVisits: 6500000,
    category: 'Business'
  },
  'patreon.com': {
    domain: 'patreon.com',
    globalRank: 420,
    categoryRank: 1,
    monthlyVisits: 85000000,
    category: 'Creator Economy'
  },
  'onlyfans.com': {
    domain: 'onlyfans.com',
    globalRank: 65,
    categoryRank: 2,
    monthlyVisits: 520000000,
    category: 'Creator Economy'
  },
  'ko-fi.com': {
    domain: 'ko-fi.com',
    globalRank: 8500,
    categoryRank: 3,
    monthlyVisits: 2500000,
    category: 'Creator Economy'
  },
  'tumblr.com': {
    domain: 'tumblr.com',
    globalRank: 182,
    categoryRank: 11,
    monthlyVisits: 220000000,
    category: 'Social Networks'
  },
  'wordpress.com': {
    domain: 'wordpress.com',
    globalRank: 152,
    categoryRank: 2,
    monthlyVisits: 250000000,
    category: 'Publishing'
  },
  'blogger.com': {
    domain: 'blogger.com',
    globalRank: 225,
    categoryRank: 3,
    monthlyVisits: 180000000,
    category: 'Publishing'
  }
}

// 类别默认排名
const DEFAULT_CATEGORY_RANKS: Record<string, number> = {
  'Social Networks': 100,
  'Technology': 200,
  'Gaming': 300,
  'Video': 150,
  'Music': 400,
  'Design': 500,
  'Photography': 600,
  'Business': 700,
  'Creator Economy': 800,
  'Publishing': 900,
  'Professional': 250,
  'Education': 1000,
  'Entertainment': 1100,
  'News': 1200,
  'Shopping': 1300,
  'Travel': 1400,
  'Food': 1500,
  'Health': 1600,
  'Finance': 1700,
  'Sports': 1800,
  'Other': 9999
}

/**
 * 获取网站的排名数据
 */
export function getRankingForDomain(domain: string): number {
  // 清理域名（去除 www. 等前缀）
  const cleanDomain = domain.toLowerCase().replace(/^www\./, '')
  
  // 查找预定义排名
  if (PREDEFINED_RANKINGS[cleanDomain]) {
    return PREDEFINED_RANKINGS[cleanDomain].globalRank
  }
  
  // 如果没有找到，返回一个高数值（低优先级）
  return 99999
}

/**
 * 获取网站的详细排名数据
 */
export function getDetailedRanking(domain: string): SimilarWebData | null {
  const cleanDomain = domain.toLowerCase().replace(/^www\./, '')
  return PREDEFINED_RANKINGS[cleanDomain] || null
}

/**
 * 根据类别获取默认排名
 */
export function getCategoryDefaultRank(category: string): number {
  return DEFAULT_CATEGORY_RANKS[category] || DEFAULT_CATEGORY_RANKS['Other']
}

/**
 * 对结果按排名排序
 */
export function sortResultsByRanking<T extends { source: string; category?: string }>(
  results: T[]
): T[] {
  return results.sort((a, b) => {
    // 首先尝试获取域名排名
    const aRank = getRankingForDomain(extractDomain(a.source))
    const bRank = getRankingForDomain(extractDomain(b.source))
    
    // 如果都有具体排名，使用具体排名
    if (aRank < 99999 && bRank < 99999) {
      return aRank - bRank
    }
    
    // 如果只有一个有具体排名，优先显示有排名的
    if (aRank < 99999) return -1
    if (bRank < 99999) return 1
    
    // 都没有具体排名，使用类别默认排名
    const aCategoryRank = getCategoryDefaultRank(a.category || 'Other')
    const bCategoryRank = getCategoryDefaultRank(b.category || 'Other')
    
    return aCategoryRank - bCategoryRank
  })
}

/**
 * 从站点名称提取域名
 */
function extractDomain(siteName: string): string {
  // 简单处理，实际应该更复杂
  return siteName.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9.-]/g, '') + '.com'
}

/**
 * 批量获取网站排名（用于未来API调用）
 */
export async function fetchBulkRankings(domains: string[]): Promise<Record<string, number>> {
  // 这里应该调用 SimilarWeb API
  // 现在返回预定义的数据
  const rankings: Record<string, number> = {}
  
  for (const domain of domains) {
    rankings[domain] = getRankingForDomain(domain)
  }
  
  return rankings
}

/**
 * 获取热门网站列表
 */
export function getTopSites(limit: number = 100): string[] {
  return Object.entries(PREDEFINED_RANKINGS)
    .sort((a, b) => a[1].globalRank - b[1].globalRank)
    .slice(0, limit)
    .map(([domain]) => domain)
}
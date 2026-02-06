/**
 * WhatsMyName Data Service
 * Loads and processes site data from WhatsMyName JSON file
 */

import { getRankingForDomain, getDetailedRanking } from './similarweb-rankings'
import rawWhatsMyNameData from '@/data/whatsmyname-data.json'

export interface WhatsMyNameSite {
  name: string
  url: string
  urlMain: string
  category: string
  errorType?: string
  errorMsg?: string
  username_claimed?: string
  username_unclaimed?: string
  regexCheck?: string
}

export interface ProcessedSite {
  id: string
  name: string
  domain: string
  url: string
  urlTemplate: string
  category: string
  rank: number
  monthlyVisits?: number
  globalRank?: number
  favicon?: string
}

/**
 * Load raw WhatsMyName data from JSON file
 */
export function loadWhatsMyNameData(): Record<string, WhatsMyNameSite> {
  try {
    return rawWhatsMyNameData as unknown as Record<string, WhatsMyNameSite>
  } catch (error) {
    console.error('Error loading WhatsMyName data:', error)
    // Return fallback data if file not found - matches complete data format
    return {
      "Instagram": {
        "name": "Instagram",
        "url": "https://www.instagram.com/{}",
        "urlMain": "https://www.instagram.com",
        "category": "Social Networks",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "Twitter": {
        "name": "Twitter",
        "url": "https://twitter.com/{}",
        "urlMain": "https://twitter.com", 
        "category": "Social Networks",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "GitHub": {
        "name": "GitHub",
        "url": "https://github.com/{}",
        "urlMain": "https://github.com",
        "category": "Technology",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "TikTok": {
        "name": "TikTok",
        "url": "https://www.tiktok.com/@{}",
        "urlMain": "https://www.tiktok.com",
        "category": "Social Networks",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "YouTube": {
        "name": "YouTube",
        "url": "https://www.youtube.com/user/{}",
        "urlMain": "https://www.youtube.com",
        "category": "Video",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "LinkedIn": {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/in/{}",
        "urlMain": "https://www.linkedin.com", 
        "category": "Professional",
        "errorType": "status_code",
        "errorMsg": ""
      },
      "Facebook": {
        "name": "Facebook",
        "url": "https://www.facebook.com/{}",
        "urlMain": "https://www.facebook.com",
        "category": "Social Networks",
        "errorType": "status_code", 
        "errorMsg": ""
      }
    }
  }
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/**
 * Get favicon URL for a domain
 */
function getFaviconUrl(domain: string): string {
  // Use Google's favicon service as fallback
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

/**
 * Process and rank all sites from WhatsMyName data
 */
export function processWhatsMyNameSites(): ProcessedSite[] {
  const rawData = loadWhatsMyNameData()
  const processedSites: ProcessedSite[] = []

  for (const [siteName, siteData] of Object.entries(rawData)) {
    const domain = extractDomain(siteData.urlMain || siteData.url)
    const ranking = getDetailedRanking(domain)
    
    processedSites.push({
      id: siteName.toLowerCase().replace(/\s+/g, '-'),
      name: siteName,
      domain: domain,
      url: siteData.urlMain || siteData.url.replace('{}', ''),
      urlTemplate: siteData.url,
      category: siteData.category || 'Other',
      rank: ranking?.globalRank || getRankingForDomain(domain),
      monthlyVisits: ranking?.monthlyVisits,
      globalRank: ranking?.globalRank,
      favicon: getFaviconUrl(domain)
    })
  }

  // Sort by rank (lower is better)
  return processedSites.sort((a, b) => a.rank - b.rank)
}

/**
 * Get paginated sites
 */
export function getPaginatedSites(
  page: number = 1,
  pageSize: number = 20,
  category?: string,
  searchQuery?: string
): {
  sites: ProcessedSite[]
  totalSites: number
  totalPages: number
  currentPage: number
} {
  let sites = processWhatsMyNameSites()

  // Filter by category if provided
  if (category && category !== 'all') {
    sites = sites.filter(site => 
      site.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Filter by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    sites = sites.filter(site => 
      site.name.toLowerCase().includes(query) ||
      site.domain.toLowerCase().includes(query) ||
      site.category.toLowerCase().includes(query)
    )
  }

  const totalSites = sites.length
  const totalPages = Math.ceil(totalSites / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return {
    sites: sites.slice(startIndex, endIndex),
    totalSites,
    totalPages,
    currentPage: page
  }
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const sites = processWhatsMyNameSites()
  const categories = new Set<string>()
  
  sites.forEach(site => {
    if (site.category) {
      categories.add(site.category)
    }
  })

  return Array.from(categories).sort()
}

/**
 * Get site statistics
 */
export function getSiteStatistics() {
  const sites = processWhatsMyNameSites()
  const categories = getAllCategories()
  
  const categoryCount: Record<string, number> = {}
  categories.forEach(cat => {
    categoryCount[cat] = sites.filter(s => s.category === cat).length
  })

  const topSites = sites
    .filter(s => s.globalRank && s.globalRank < 1000)
    .length

  return {
    totalSites: sites.length,
    totalCategories: categories.length,
    categoryCount,
    topSites,
    verifiedSites: sites.filter(s => s.globalRank).length
  }
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Get rank badge color based on rank
 */
export function getRankBadgeColor(rank: number): string {
  if (rank <= 100) return 'bg-green-500'
  if (rank <= 500) return 'bg-blue-500'
  if (rank <= 1000) return 'bg-yellow-500'
  if (rank <= 5000) return 'bg-orange-500'
  return 'bg-gray-500'
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Social Networks': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    'Technology': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    'Gaming': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    'Music': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
    'Video': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    'Business': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    'Education': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
    'Entertainment': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    'Professional': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    'Design': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
    'Photography': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
    'Publishing': 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400'
  }
  
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
}

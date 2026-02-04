/**
 * WhatsMyNameApp API Service
 * Uses the v1 search endpoint at api.whatsmynameapp.org with API key.
 */

import siteData from '@/lib/data/sites.json'
import {
  getWhatsmynameApiKey,
  API_ENDPOINTS,
  API_CONFIG,
  TIMEOUTS,
  SITE_CATEGORIES,
} from '@/lib/config'

export interface CheckResult {
  url: string
  source: string
  isExist: boolean
  category?: string
  ranking?: number
}

interface ApiResponse {
  error?: string
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
 * Call WhatsMyNameApp API (supports ~1400 sites per key quota).
 */
export async function checkUsernameViaAPI(
  username: string,
  rescan: boolean = false
): Promise<ApiResponse> {
  const url = `${API_ENDPOINTS.WHATSMYNAME}?username=${encodeURIComponent(username)}${rescan ? '&rescan=true' : ''}`

  const response = await fetch(url, {
    headers: {
      [API_CONFIG.WHATSMYNAME.API_KEY_HEADER]: getWhatsmynameApiKey(),
      Accept: API_CONFIG.WHATSMYNAME.ACCEPT_HEADER,
    },
    // A hard timeout prevents hanging requests
    signal: AbortSignal.timeout(TIMEOUTS.API_REQUEST),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`WhatsMyNameApp error ${response.status}: ${text}`)
  }

  // The API returns NDJSON; accumulate then parse lines.
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  const rows: any[] = []

  if (!reader) {
    throw new Error('Response not readable')
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (line.trim()) {
        try {
          rows.push(JSON.parse(line))
        } catch (err) {
          console.warn('Failed to parse NDJSON line', line)
        }
      }
    }
  }

  // Push last buffered line
  if (buffer.trim()) {
    try {
      rows.push(JSON.parse(buffer))
    } catch (err) {
      console.warn('Failed to parse final NDJSON line', buffer)
    }
  }

  const enrichedResults = rows
    .filter((item: any) => item?.source) // skip meta lines like { total: n }
    .map((item: any) => ({
      ...item,
      category: getCategoryForSite(item.source),
    }))

  return {
    error: undefined,
    result: enrichedResults,
    createdAt: new Date().toISOString(),
  }
}

export function getCategoryForSite(siteName: string): string {
  const sites = siteData as unknown as Record<string, SiteInfo>
  if (sites[siteName]) return sites[siteName].category
  return SITE_CATEGORIES.DEFAULT
}

export function getAllSupportedSites(): string[] {
  const sites = siteData as unknown as Record<string, SiteInfo>
  return Object.keys(sites)
}

export function getTotalSitesCount(): number {
  return getAllSupportedSites().length
}

export function getSitesByCategory(): Record<string, string[]> {
  const sites = siteData as unknown as Record<string, SiteInfo>
  const categories: Record<string, string[]> = {}

  for (const [siteName, siteInfo] of Object.entries(sites)) {
    const category = siteInfo.category || 'Other'
    if (!categories[category]) categories[category] = []
    categories[category].push(siteName)
  }

  return categories
}

export function getSiteInfo(siteName: string): SiteInfo | null {
  const sites = siteData as unknown as Record<string, SiteInfo>
  return sites[siteName] || null
}

export function getAllCategories(): string[] {
  const sites = siteData as unknown as Record<string, SiteInfo>
  const categories = new Set<string>()
  for (const siteInfo of Object.values(sites)) {
    if (siteInfo.category) categories.add(siteInfo.category)
  }
  return Array.from(categories).sort()
}

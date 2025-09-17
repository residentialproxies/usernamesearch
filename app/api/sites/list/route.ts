import { NextRequest, NextResponse } from 'next/server'
import sitesData from '@/lib/data/sites.json'

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_REQUESTS = 10 // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function getClientId(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwardedFor?.split(',')[0] || realIp || 'unknown'
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now()
  const clientData = requestCounts.get(clientId)

  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    return false
  }

  clientData.count++
  return true
}

// Obfuscate site data to prevent easy scraping
function obfuscateSite(site: any, index: number) {
  return {
    n: site.name || site, // name
    u: site.url || `https://platform${index}.com`, // url
    c: site.category || 'Social', // category
    r: index + 1000, // rank
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientId(request)
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Verify session token
    const sessionToken = request.headers.get('X-Session-Token')
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session token required' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { offset = 0, limit = 20, fingerprint } = body

    // Basic bot detection
    if (!fingerprint || !Array.isArray(fingerprint) || fingerprint.length < 3) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    // Get sites data
    const sitesArray = Object.entries(sitesData).map(([name, site]) => ({
      name,
      ...site
    }))

    // Apply pagination
    const start = Math.max(0, offset)
    const end = Math.min(sitesArray.length, start + Math.min(limit, 50)) // Max 50 per request

    // Obfuscate and return limited data
    const obfuscatedSites = sitesArray
      .slice(start, end)
      .map((site, index) => obfuscateSite(site, start + index))

    // Add random delay to prevent rapid scraping
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))

    return NextResponse.json({
      sites: obfuscatedSites,
      total: 1500, // Always show full count for SEO
      offset: start,
      limit: end - start,
    })

  } catch (error) {
    console.error('Sites list error:', error)
    return NextResponse.json(
      { error: 'Failed to load sites' },
      { status: 500 }
    )
  }
}

// Block GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
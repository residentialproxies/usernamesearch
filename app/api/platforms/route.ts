import { NextRequest, NextResponse } from 'next/server'
import sitesData from '@/lib/data/sites.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tier = searchParams.get('tier')
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  // Convert object to array
  let platforms = Object.entries(sitesData).map(([name, site], index) => ({
    name,
    ...site,
    originalIndex: index
  }))

  // Filter by tier
  if (tier === 'free') {
    platforms = platforms.slice(0, 100) // First 100 are free
  } else if (tier === 'pro') {
    platforms = platforms.slice(100) // Rest are pro
  }

  // Filter by category
  if (category) {
    platforms = platforms.filter(p => 
      p.category?.toLowerCase() === category.toLowerCase()
    )
  }

  // Search filter
  if (search) {
    const searchLower = search.toLowerCase()
    platforms = platforms.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.url.toLowerCase().includes(searchLower)
    )
  }

  // Add tier information
  const platformsWithTier = platforms.map((platform) => ({
    ...platform,
    tier: platform.originalIndex < 100 ? 'free' : 'pro',
    rank: platform.originalIndex + 1000
  }))

  // Get all unique categories from the original data
  const allPlatforms = Object.entries(sitesData).map(([name, site]) => ({
    ...site,
    name
  }))
  
  return NextResponse.json({
    success: true,
    platforms: platformsWithTier,
    total: platformsWithTier.length,
    categories: Array.from(new Set(allPlatforms.map(p => p.category).filter(Boolean)))
  })
}
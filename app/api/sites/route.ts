import { NextRequest, NextResponse } from 'next/server'
import { 
  getPaginatedSites, 
  getAllCategories, 
  getSiteStatistics 
} from '@/lib/services/whatsmyname-data'

/**
 * GET /api/sites
 * Get paginated list of supported sites
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const info = searchParams.get('info')
    
    // Return statistics if requested
    if (info === 'stats') {
      const stats = getSiteStatistics()
      return NextResponse.json(stats)
    }
    
    // Return categories if requested
    if (info === 'categories') {
      const categories = getAllCategories()
      return NextResponse.json({ categories })
    }
    
    // Get paginated sites
    const result = getPaginatedSites(page, pageSize, category, search)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    )
  }
}
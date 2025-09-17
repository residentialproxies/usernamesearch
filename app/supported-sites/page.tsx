'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  TrendingUp,
  Award,
  Loader2,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Site {
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

interface PaginationData {
  sites: Site[]
  totalSites: number
  totalPages: number
  currentPage: number
}

// Category colors mapping
const getCategoryColor = (category: string) => {
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

// Rank badge component
const RankBadge = ({ rank }: { rank: number }) => {
  if (rank > 10000) return null
  
  let color = 'bg-gray-500'
  let icon = null
  
  if (rank <= 100) {
    color = 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    icon = <Award className="h-3 w-3" />
  } else if (rank <= 500) {
    color = 'bg-gradient-to-r from-blue-400 to-blue-600'
    icon = <TrendingUp className="h-3 w-3" />
  } else if (rank <= 1000) {
    color = 'bg-gradient-to-r from-green-400 to-green-600'
  } else if (rank <= 5000) {
    color = 'bg-gradient-to-r from-purple-400 to-purple-600'
  }
  
  return (
    <Badge className={`${color} text-white border-0 text-xs flex items-center gap-1`}>
      {icon}
      #{rank.toLocaleString()}
    </Badge>
  )
}

function SupportedSitesContent() {
  const [data, setData] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState<string[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [stats, setStats] = useState<any>(null)
  
  const pageSize = 20

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
    fetchStats()
  }, [])

  // Initialize current page from URL
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '1')
    setCurrentPage(pageFromUrl)
  }, [searchParams])

  // Fetch sites when filters change
  useEffect(() => {
    fetchSites()
  }, [currentPage, selectedCategory, searchQuery])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/sites?info=categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/sites?info=stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchSites = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
      })
      
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }
      
      if (searchQuery) {
        params.append('search', searchQuery)
      }

      const response = await fetch(`/api/sites?${params}`)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching sites:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/supported-sites?${params.toString()}`)
    setCurrentPage(newPage)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    updatePage(1)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    updatePage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    updatePage(1)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex p-4 bg-primary/10 rounded-full mb-6"
        >
          <Globe className="h-12 w-12 text-primary" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All Supported Sites
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
          Browse through our comprehensive database of {stats?.totalSites || '520+'} supported platforms. 
          Check username availability across the most popular sites on the internet, ranked by global traffic.
        </p>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">
                  {stats.totalSites.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Sites</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {stats.totalCategories}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.topSites}
                </div>
                <div className="text-sm text-muted-foreground">Top 1000 Sites</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.verifiedSites}
                </div>
                <div className="text-sm text-muted-foreground">Ranked Sites</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sites by name, domain, or category..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary">
                  Search: {searchQuery}
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary">
                  Category: {selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : data && data.sites.length > 0 ? (
        <>
          {/* Results Info */}
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1}-{Math.min(currentPage * pageSize, data.totalSites)} of {data.totalSites} sites
          </div>

          {/* Sites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              {data.sites.map((site, index) => (
                <motion.div
                  key={`${site.id}-${currentPage}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {site.favicon && (
                            <img 
                              src={site.favicon}
                              alt={site.name}
                              className="w-8 h-8 rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{site.name}</h3>
                            <p className="text-xs text-muted-foreground truncate">
                              {site.domain}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          asChild
                        >
                          <a 
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${site.name}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <Badge className={getCategoryColor(site.category)} variant="secondary">
                          {site.category}
                        </Badge>
                        {site.globalRank && <RankBadge rank={site.globalRank} />}
                      </div>
                      
                      {site.monthlyVisits && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          {(site.monthlyVisits / 1000000).toFixed(1)}M monthly visits
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                  let pageNum: number
                  
                  if (data.totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= data.totalPages - 2) {
                    pageNum = data.totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => updatePage(pageNum)}
                      className="w-8"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                
                {data.totalPages > 5 && currentPage < data.totalPages - 2 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updatePage(data.totalPages)}
                      className="w-8"
                    >
                      {data.totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => updatePage(Math.min(data.totalPages, currentPage + 1))}
                disabled={currentPage === data.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sites found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Footer Info */}
      <div className="mt-12 p-6 bg-primary/5 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-3">Want to check username availability?</h2>
        <p className="text-muted-foreground mb-4">
          Use our username checker to instantly search across all these platforms
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Check Username
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/pricing">
              View Pro Features
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function SupportedSitesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    }>
      <SupportedSitesContent />
    </Suspense>
  )
}
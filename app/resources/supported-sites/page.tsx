'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, ExternalLink, Check, X } from 'lucide-react'
import sitesData from '@/lib/data/sites.json'

interface Site {
  name: string
  url: string
  category: string
  tier: 'free' | 'pro'
  rank?: number
}

export default function SupportedSitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [filteredSites, setFilteredSites] = useState<Site[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTier, setSelectedTier] = useState<'all' | 'free' | 'pro'>('all')
  
  // Get categories from sites data
  const categories = ['all', ...Array.from(new Set(sitesData.map((site: any) => site.category))).sort()]
  
  useEffect(() => {
    // Transform and sort sites data
    const transformedSites = sitesData.map((site: any, index: number) => ({
      name: site.name,
      url: site.url,
      category: site.category || 'Other',
      tier: index < 100 ? 'free' : 'pro', // First 100 sites are free
      rank: site.rank || 999999,
    }))
    
    // Sort by rank (traffic)
    transformedSites.sort((a, b) => a.rank - b.rank)
    setSites(transformedSites)
    setFilteredSites(transformedSites)
  }, [])
  
  useEffect(() => {
    let filtered = sites
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(site => 
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.url.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(site => site.category === selectedCategory)
    }
    
    // Filter by tier
    if (selectedTier !== 'all') {
      filtered = filtered.filter(site => site.tier === selectedTier)
    }
    
    setFilteredSites(filtered)
  }, [searchQuery, selectedCategory, selectedTier, sites])
  
  const stats = {
    total: sites.length,
    free: sites.filter(s => s.tier === 'free').length,
    pro: sites.filter(s => s.tier === 'pro').length,
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All {stats.total}+ Supported Sites
        </h1>
        <p className="text-lg text-muted-foreground">
          We check your username across over 1500+ platforms. Our Free plan covers the essentials, 
          while Pro unlocks the full list for ultimate coverage.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Platforms</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-500">{stats.free}</div>
            <div className="text-sm text-muted-foreground">Free Tier Sites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-500">{stats.pro}</div>
            <div className="text-sm text-muted-foreground">Pro Tier Sites</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for a site (e.g., Instagram, Steam...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {/* Tier Filter */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedTier === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedTier('all')}
                  >
                    All Sites ({stats.total})
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedTier === 'free' ? 'default' : 'outline'}
                    onClick={() => setSelectedTier('free')}
                  >
                    Free Tier ({stats.free})
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedTier === 'pro' ? 'default' : 'outline'}
                    onClick={() => setSelectedTier('pro')}
                  >
                    Pro Tier ({stats.pro})
                  </Button>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                {categories.map(category => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sites Table/Grid */}
      {filteredSites.length > 0 ? (
        <div className="grid gap-4">
          {/* Group sites by category */}
          {Array.from(new Set(filteredSites.map(s => s.category))).sort().map(category => {
            const categorySites = filteredSites.filter(s => s.category === category)
            if (categorySites.length === 0) return null
            
            return (
              <div key={category} className="space-y-2">
                <h3 className="text-lg font-semibold sticky top-48 bg-background py-2">
                  {category} ({categorySites.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categorySites.map((site, index) => (
                    <Card key={`${site.name}-${index}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{site.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">
                              {site.url}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={site.tier === 'free' ? 'default' : 'secondary'}>
                              {site.tier}
                            </Badge>
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-semibold text-muted-foreground">No sites found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
      
      {/* CTA Section */}
      <Card className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want to check all {stats.total}+ platforms?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Upgrade to Pro for complete coverage, API access, bulk checking, 
            and priority support. Only $10 for 500 API requests.
          </p>
          <Button size="lg" asChild>
            <a href="/pricing">View Pricing Plans</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
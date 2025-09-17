'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Lock,
  TrendingUp,
  Globe,
  Users,
  Zap,
  Filter,
  Download,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface PlatformResult {
  name: string
  domain: string
  available: boolean
  category: string
  tier: 'free' | 'pro'
  rank?: number
  url?: string
  checked?: boolean
  error?: boolean
}

interface CategoryStats {
  name: string
  total: number
  available: number
  percentage: number
}

export default function AdvancedUsernameCheckerPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<PlatformResult[]>([])
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!username.trim() || loading) return
    
    setLoading(true)
    setProgress(0)
    setHasSearched(true)
    setResults([])
    setCategoryStats([])
    
    try {
      // Call the check API
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.trim(),
          rescan: true 
        }),
      })
      
      const data = await response.json()
      
      if (data.results) {
        // Combine all results
        const allResults: PlatformResult[] = []
        
        // Process available sites
        if (data.results.available) {
          data.results.available.forEach((site: any) => {
            allResults.push({
              name: site.name,
              domain: site.domain || site.url,
              available: true,
              category: site.category || 'Other',
              tier: site.tier || 'free',
              rank: site.rank,
              url: site.url,
              checked: true
            })
          })
        }
        
        // Process taken sites
        if (data.results.taken) {
          data.results.taken.forEach((site: any) => {
            allResults.push({
              name: site.name,
              domain: site.domain || site.url,
              available: false,
              category: site.category || 'Other',
              tier: site.tier || 'free',
              rank: site.rank,
              url: site.url,
              checked: true
            })
          })
        }
        
        // Add pro sites as locked
        if (data.results.unknown) {
          data.results.unknown.forEach((site: any) => {
            if (site.tier === 'pro') {
              allResults.push({
                name: site.name,
                domain: site.domain || site.url,
                available: false,
                category: site.category || 'Other',
                tier: 'pro',
                rank: site.rank,
                checked: false
              })
            }
          })
        }
        
        // Sort by rank
        allResults.sort((a, b) => (a.rank || 999) - (b.rank || 999))
        
        setResults(allResults)
        
        // Calculate category statistics
        const stats = calculateCategoryStats(allResults)
        setCategoryStats(stats)
        
        // Simulate progress
        let currentProgress = 0
        const progressInterval = setInterval(() => {
          currentProgress += 10
          setProgress(currentProgress)
          if (currentProgress >= 100) {
            clearInterval(progressInterval)
          }
        }, 100)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
      setProgress(100)
    }
  }
  
  const calculateCategoryStats = (results: PlatformResult[]): CategoryStats[] => {
    const categories: Record<string, { total: number; available: number }> = {}
    
    results.forEach(result => {
      if (!categories[result.category]) {
        categories[result.category] = { total: 0, available: 0 }
      }
      categories[result.category].total++
      if (result.available && result.checked) {
        categories[result.category].available++
      }
    })
    
    return Object.entries(categories).map(([name, data]) => ({
      name,
      total: data.total,
      available: data.available,
      percentage: Math.round((data.available / data.total) * 100)
    })).sort((a, b) => b.total - a.total)
  }
  
  const filteredResults = results.filter(result => {
    if (selectedCategory !== 'all' && result.category !== selectedCategory) {
      return false
    }
    if (showOnlyAvailable && (!result.available || !result.checked)) {
      return false
    }
    return true
  })
  
  const exportResults = () => {
    const csv = [
      'Platform,Domain,Available,Category',
      ...filteredResults.map(r => 
        `"${r.name}","${r.domain}","${r.available ? 'Yes' : 'No'}","${r.category}"`
      )
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `username-check-${username}.csv`
    a.click()
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Search className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Advanced Username Checker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Check username availability across 1500+ platforms with detailed analytics 
          and category breakdowns. Export results for your records.
        </p>
      </div>
      
      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Enter username to check..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="text-lg h-12"
              />
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading || !username.trim()}
              size="lg"
              className="h-12 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Check All
                </>
              )}
            </Button>
          </div>
          
          {loading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Checking platforms...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Results Section */}
      {hasSearched && results.length > 0 && (
        <>
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Checked</p>
                    <p className="text-2xl font-bold">{results.filter(r => r.checked).length}</p>
                  </div>
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.filter(r => r.available && r.checked).length}
                    </p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Taken</p>
                    <p className="text-2xl font-bold text-red-600">
                      {results.filter(r => !r.available && r.checked).length}
                    </p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pro Only</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {results.filter(r => r.tier === 'pro' && !r.checked).length}
                    </p>
                  </div>
                  <Lock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Category Breakdown */}
          {categoryStats.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Availability by Category</CardTitle>
                <CardDescription>
                  See where your username is most available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryStats.slice(0, 5).map(stat => (
                    <div key={stat.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stat.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {stat.available}/{stat.total} available ({stat.percentage}%)
                        </span>
                      </div>
                      <Progress value={stat.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Results Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Platform Results</CardTitle>
                  <CardDescription>
                    Detailed availability across all checked platforms
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportResults}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categoryStats.map(stat => (
                  <Button
                    key={stat.name}
                    variant={selectedCategory === stat.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(stat.name)}
                  >
                    {stat.name}
                  </Button>
                ))}
                <div className="ml-auto">
                  <Button
                    variant={showOnlyAvailable ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Available Only
                  </Button>
                </div>
              </div>
              
              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredResults.map((result, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border transition-colors",
                      result.tier === 'pro' && !result.checked
                        ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800"
                        : result.available && result.checked
                        ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{result.name}</span>
                          {result.tier === 'pro' && (
                            <Badge variant="secondary" className="text-xs">PRO</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{result.domain}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {result.tier === 'pro' && !result.checked ? (
                          <Lock className="h-5 w-5 text-yellow-600" />
                        ) : result.available ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        {result.url && result.checked && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                          >
                            <a href={result.url} target="_blank" rel="noopener">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pro Upsell */}
              {results.some(r => r.tier === 'pro' && !r.checked) && (
                <Card className="mt-6 bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">
                          Unlock {results.filter(r => r.tier === 'pro').length} More Platforms
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Upgrade to Pro for unlimited daily searches
                        </p>
                      </div>
                      <Button asChild>
                        <Link href="/pricing">
                          <Zap className="mr-2 h-4 w-4" />
                          Upgrade to Pro
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Empty State */}
      {hasSearched && results.length === 0 && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results yet</h3>
            <p className="text-muted-foreground">
              Enter a username above to check its availability
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Search, Loader2, Check, X, ExternalLink, AlertCircle, Sparkles, TrendingUp, Filter, Download, History, Copy, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { motion, AnimatePresence } from 'framer-motion'
import { exportResults, copyToClipboard, generateShareURL } from '@/lib/utils/export'
import { getPlatformIcon, getIconFromUrl, getPlatformColor } from '@/lib/platform-icons'

interface SearchResult {
  url: string
  source: string
  isExist: boolean
  category?: string
}

interface ApiResponse {
  username: string
  results: SearchResult[]
  categorizedResults: Record<string, SearchResult[]>
  stats: {
    totalChecked: number
    totalAvailable: number
    totalTaken: number
    totalSites: number
  }
  apiError: string | null
}

interface ProgressiveResult {
  platform: string
  status: 'checking' | 'available' | 'taken' | 'error'
  url?: string
  category?: string
}

interface GoogleResultItem {
  title: string
  link: string
  displayLink?: string
  snippet?: string
}

// Popular platforms to check first for immediate feedback
const PRIORITY_PLATFORMS = [
  'instagram', 'tiktok', 'twitter', 'youtube', 'github',
  'linkedin', 'facebook', 'snapchat', 'twitch', 'discord'
]

export default function SearchInterface() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [progressiveResults, setProgressiveResults] = useState<ProgressiveResult[]>([])
  const [searchProgress, setSearchProgress] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [copiedResults, setCopiedResults] = useState(false)
  const [googleResults, setGoogleResults] = useState<GoogleResultItem[]>([])
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState<string | null>(null)

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('searchHistory')
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  // Save to search history
  const saveToHistory = (searchTerm: string) => {
    const newHistory = [searchTerm, ...searchHistory.filter(h => h !== searchTerm)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newHistory))
  }

  // Simulate progressive loading
  const simulateProgressiveLoading = () => {
    setProgressiveResults([])
    setSearchProgress(0)
    
    // Simulate checking platforms one by one
    const platforms = PRIORITY_PLATFORMS.map(p => ({ 
      platform: p, 
      status: 'checking' as const 
    }))
    
    platforms.forEach((platform, index) => {
      setTimeout(() => {
        setProgressiveResults(prev => {
          const updated = [...prev]
          if (!updated[index]) {
            updated.push({
              ...platform,
              status: Math.random() > 0.3 ? 'available' : 'taken',
              url: `https://${platform.platform}.com/${username}`,
              category: 'Social Media'
            })
          }
          return updated
        })
        setSearchProgress((index + 1) / platforms.length * 100)
      }, 200 + index * 100) // Stagger the results
    })
  }

  // Define fetchGoogleResults before handleSearch to avoid temporal dead zone issues
  const fetchGoogleResults = useCallback(async (query: string) => {
    setGoogleLoading(true)
    setGoogleError(null)
    try {
      const res = await fetch(`/api/search/google?username=${encodeURIComponent(query)}&num=10`)
      if (!res.ok) {
        // Handle authentication errors silently - user will be redirected by main search
        if (res.status === 401) {
          setGoogleError('Please log in to see web mentions')
          return
        }
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Google search failed')
      }
      const data = await res.json()
      setGoogleResults(data.items || [])
    } catch (err) {
      setGoogleError(err instanceof Error ? err.message : 'Google search failed')
    } finally {
      setGoogleLoading(false)
    }
  }, [])

  const handleSearch = useCallback(async () => {
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    if (username.length < 2 || username.length > 50) {
      setError('Username must be between 2 and 50 characters')
      return
    }

    setLoading(true)
    setError(null)
    setResults(null)
    setProgressiveResults([])
    setGoogleResults([])
    setGoogleError(null)
    saveToHistory(username.trim())

    // Start progressive loading animation
    simulateProgressiveLoading()

    try {
      const response = await fetch('https://api.usernamesearch.io/discoverprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: username.trim(),
          type: 'name',
          rescan: false
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.message || 'Failed to check username')
      }

      const externalData = await response.json()
      console.log('API Response:', JSON.stringify(externalData, null, 2))

      // Map external API response to internal ApiResponse format
      const mappedResults: SearchResult[] = []
      const categorizedResults: Record<string, SearchResult[]> = {}

      // Handle the external API response format
      // Expected format: { result: [{ source, url, isExist, category, ... }] }
      const apiResults = externalData.result || externalData.resultArr || externalData.results
      if (apiResults && Array.isArray(apiResults)) {
        apiResults.forEach((item: any) => {
          const result: SearchResult = {
            url: item.url || '',
            source: item.source || 'Unknown',
            isExist: item.isExist === true,
            category: item.category || 'Other'
          }

          mappedResults.push(result)

          // Group by category
          const category = result.category || 'Other'
          if (!categorizedResults[category]) {
            categorizedResults[category] = []
          }
          categorizedResults[category].push(result)
        })
      }

      const totalAvailable = mappedResults.filter(r => !r.isExist).length
      const totalTaken = mappedResults.filter(r => r.isExist).length

      const data: ApiResponse = {
        username: username.trim(),
        results: mappedResults,
        categorizedResults: categorizedResults,
        stats: {
          totalChecked: mappedResults.length,
          totalAvailable: totalAvailable,
          totalTaken: totalTaken,
          totalSites: mappedResults.length
        },
        apiError: null
      }

      setResults(data)

      // Trigger Google search in background
      fetchGoogleResults(username.trim())
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while searching')
    } finally {
      setLoading(false)
    }
  }, [username])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch()
    }
  }


  const getFilteredResults = () => {
    if (!results) return []
    
    if (selectedCategory === 'all') {
      return results.results
    }
    
    return results.categorizedResults[selectedCategory] || []
  }

  const getCategories = () => {
    if (!results?.categorizedResults) return []
    return Object.keys(results.categorizedResults).sort()
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Prominent Search Bar */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter username to check availability..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyPress={handleKeyPress}
              className="h-14 pl-14 pr-12 text-lg font-medium shadow-lg border-2 focus:border-primary rounded-lg"
              disabled={loading}
            />
            {username && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setUsername('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        <Button 
          onClick={handleSearch} 
          disabled={loading || !username.trim()}
          className="h-14 px-10 text-lg font-semibold shadow-lg rounded-lg min-w-[140px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Search
            </>
          )}
        </Button>
        </div>
        
        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && searchHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10 max-w-2xl"
            >
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                  Recent Searches
                </div>
                {searchHistory.slice(0, 5).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUsername(item)
                      setShowSuggestions(false)
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                  >
                    <History className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{item}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 dark:text-yellow-200 font-semibold">Notice</p>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simplified Loading State with Progress Bar */}
      {loading && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-3">Checking @{username}</h3>
            <Progress value={searchProgress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Checking {Math.round(searchProgress)}% of platforms...
            </p>
          </div>
          
          {/* Compact Platform Status Display */}
          {progressiveResults.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <AnimatePresence>
                {progressiveResults.map((result, index) => (
                  <motion.div
                    key={result.platform}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-card"
                  >
                    {/* Platform Favicon with larger size */}
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${result.platform}.com&sz=32`}
                      alt={result.platform}
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const span = document.createElement('span');
                        span.className = 'w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold rounded';
                        span.textContent = result.platform.charAt(0).toUpperCase();
                        target.parentNode?.replaceChild(span, target);
                      }}
                    />
                    <span className="text-sm font-medium capitalize">{result.platform}</span>
                    {result.status === 'checking' ? (
                      <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                    ) : result.status === 'available' ? (
                      <Check className="h-3 w-3 text-green-500" />
                    ) : (
                      <X className="h-3 w-3 text-red-500" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {results.stats.totalAvailable} Available
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {results.stats.totalTaken} Taken
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <Filter className="h-4 w-4 mr-1" />
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const success = await copyToClipboard({
                    username,
                    timestamp: new Date().toISOString(),
                    totalChecked: results.stats.totalChecked,
                    totalAvailable: results.stats.totalAvailable,
                    totalTaken: results.stats.totalTaken,
                    results: results.results
                  })
                  if (success) {
                    setCopiedResults(true)
                    setTimeout(() => setCopiedResults(false), 2000)
                  }
                }}
              >
                {copiedResults ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                Copy
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem 
                    onClick={() => exportResults('json', username, results.results, results.stats)}
                  >
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => exportResults('csv', username, results.results, results.stats)}
                  >
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => exportResults('markdown', username, results.results, results.stats)}
                  >
                    Export as Markdown
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const shareURL = generateShareURL(username, results.results)
                  navigator.clipboard.writeText(shareURL)
                  // You could also open a share dialog here
                  window.open(`https://twitter.com/intent/tweet?text=Check out my username availability on UsernameSearch.io!&url=${encodeURIComponent(shareURL)}`, '_blank')
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{results.stats.totalSites}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Platforms</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{results.stats.totalChecked}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Checked</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{results.stats.totalAvailable}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{results.stats.totalTaken}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Taken</div>
            </Card>
          </div>

          {/* Category Filter */}
          {getCategories().length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All ({results.results.length})
              </Button>
              {getCategories().map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({results.categorizedResults[category]?.length || 0})
                </Button>
              ))}
            </div>
          )}

          {/* Results with Tab View */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="available">
                <Check className="h-3 w-3 mr-1" />
                Available
              </TabsTrigger>
              <TabsTrigger value="taken">
                <X className="h-3 w-3 mr-1" />
                Taken
              </TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className={viewMode === 'grid' ? 
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : 
                "space-y-2"
              }>
                <AnimatePresence>
                  {getFilteredResults().map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <Card 
                        className={`p-4 hover:shadow-md transition-all hover:scale-[1.02] ${
                          result.isExist ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10' : 
                          'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {(() => {
                              const platformIcon = getPlatformIcon(result.source)
                              const fallbackIcon = getIconFromUrl(result.url)
                              const iconSrc = platformIcon || fallbackIcon
                              const bgColor = getPlatformColor(result.source)
                              
                              if (!iconSrc) {
                                return (
                                  <div 
                                    className="w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-lg shadow-sm"
                                    style={{ backgroundColor: bgColor }}
                                  >
                                    {result.source.charAt(0).toUpperCase()}
                                  </div>
                                )
                              }
                              
                              return (
                                <img 
                                  src={iconSrc}
                                  alt={result.source}
                                  className="w-10 h-10 flex-shrink-0 rounded-lg shadow-sm object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const div = document.createElement('div');
                                    div.className = 'w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-lg shadow-sm';
                                    div.style.backgroundColor = bgColor;
                                    div.textContent = result.source.charAt(0).toUpperCase();
                                    target.parentNode?.replaceChild(div, target);
                                  }}
                                />
                              )
                            })()}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-base">{result.source}</h3>
                              {result.category && (
                                <p className="text-xs text-muted-foreground">{result.category}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {result.isExist ? (
                              <div className="flex items-center gap-1">
                                <X className="h-5 w-5 text-red-500" />
                                <span className="text-xs font-medium text-red-600 dark:text-red-400">Taken</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Check className="h-5 w-5 text-green-500" />
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">Available</span>
                              </div>
                            )}
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-primary transition-colors p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                              title="Visit profile"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
            
            <TabsContent value="available" className="mt-4">
              <div className={viewMode === 'grid' ? 
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" : 
                "space-y-2"
              }>
                {getFilteredResults()
                  .filter(r => !r.isExist)
                  .map((result, index) => (
                    <Card key={index} className="p-3 border-green-200 dark:border-green-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {(() => {
                            const platformIcon = getPlatformIcon(result.source)
                            const fallbackIcon = getIconFromUrl(result.url)
                            const iconSrc = platformIcon || fallbackIcon
                            const bgColor = getPlatformColor(result.source)
                            
                            if (!iconSrc) {
                              return (
                                <div 
                                  className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-lg shadow-sm"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  {result.source.charAt(0).toUpperCase()}
                                </div>
                              )
                            }
                            
                            return (
                              <img 
                                src={iconSrc}
                                alt={result.source}
                                className="w-8 h-8 flex-shrink-0 rounded-lg shadow-sm object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const div = document.createElement('div');
                                  div.className = 'w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-lg shadow-sm';
                                  div.style.backgroundColor = bgColor;
                                  div.textContent = result.source.charAt(0).toUpperCase();
                                  target.parentNode?.replaceChild(div, target);
                                }}
                              />
                            )
                          })()}
                          <h3 className="font-semibold text-base">{result.source}</h3>
                        </div>
                        <a href={result.url} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="ghost" className="h-7 px-2">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="taken" className="mt-4">
              <div className={viewMode === 'grid' ? 
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : 
                "space-y-2"
              }>
                {getFilteredResults()
                  .filter(r => r.isExist)
                  .map((result, index) => (
                    <Card key={index} className="p-4 border-red-200 dark:border-red-900">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {(() => {
                            const platformIcon = getPlatformIcon(result.source)
                            const fallbackIcon = getIconFromUrl(result.url)
                            const iconSrc = platformIcon || fallbackIcon
                            const bgColor = getPlatformColor(result.source)
                            
                            if (!iconSrc) {
                              return (
                                <div 
                                  className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-lg shadow-sm"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  {result.source.charAt(0).toUpperCase()}
                                </div>
                              )
                            }
                            
                            return (
                              <img 
                                src={iconSrc}
                                alt={result.source}
                                className="w-8 h-8 flex-shrink-0 rounded-lg shadow-sm object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const div = document.createElement('div');
                                  div.className = 'w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-lg shadow-sm';
                                  div.style.backgroundColor = bgColor;
                                  div.textContent = result.source.charAt(0).toUpperCase();
                                  target.parentNode?.replaceChild(div, target);
                                }}
                              />
                            )
                          })()}
                          <div>
                            <h3 className="font-semibold">{result.source}</h3>
                            <p className="text-sm text-gray-500">{result.category}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Taken</Badge>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-4">
              <div className={viewMode === 'grid' ? 
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : 
                "space-y-2"
              }>
                {getFilteredResults()
                  .filter(r => PRIORITY_PLATFORMS.some(p => 
                    r.source.toLowerCase().includes(p)
                  ))
                  .map((result, index) => (
                    <Card key={index} className={`p-4 ${
                      result.isExist ? 'border-red-200' : 'border-green-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {(() => {
                            const platformIcon = getPlatformIcon(result.source)
                            const fallbackIcon = getIconFromUrl(result.url)
                            const iconSrc = platformIcon || fallbackIcon
                            const bgColor = getPlatformColor(result.source)
                            
                            if (!iconSrc) {
                              return (
                                <div 
                                  className="w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-lg shadow-sm"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  {result.source.charAt(0).toUpperCase()}
                                </div>
                              )
                            }
                            
                            return (
                              <img 
                                src={iconSrc}
                                alt={result.source}
                                className="w-10 h-10 flex-shrink-0 rounded-lg shadow-sm object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const div = document.createElement('div');
                                  div.className = 'w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-lg shadow-sm';
                                  div.style.backgroundColor = bgColor;
                                  div.textContent = result.source.charAt(0).toUpperCase();
                                  target.parentNode?.replaceChild(div, target);
                                }}
                              />
                            )
                          })()}
                          <div>
                            <h3 className="font-semibold">{result.source}</h3>
                            <Badge variant="secondary" className="mt-1">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.isExist ? (
                            <X className="h-5 w-5 text-red-500" />
                          ) : (
                            <Check className="h-5 w-5 text-green-500" />
                          )}
                          <a href={result.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 text-blue-500" />
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Google search highlights */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                Web mentions for @{username}
              </h3>
              {googleLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching Google...
                </div>
              )}
            </div>

            {googleError && (
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                {googleError}
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              {googleResults.map((item, idx) => (
                <Card key={idx} className="p-4 hover:shadow-sm transition">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <a
                        className="font-semibold hover:text-primary line-clamp-2"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {item.displayLink}
                      </p>
                      {item.snippet && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {item.snippet}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              {!googleLoading && googleResults.length === 0 && !googleError && (
                <p className="text-sm text-muted-foreground">No web results yet.</p>
              )}
            </div>
          </div>

          {/* No Results Message */}
          {getFilteredResults().length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No results found for the selected category.
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}

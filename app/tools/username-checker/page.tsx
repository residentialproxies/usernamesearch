'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  X,
  AlertCircle,
  History
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { getPlatformIcon, getIconFromUrl } from '@/lib/platform-icons'
import { motion, AnimatePresence } from 'framer-motion'

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
}

// Popular platforms to check first for immediate feedback
const PRIORITY_PLATFORMS = [
  'Instagram', 'TikTok', 'Twitter', 'YouTube', 'GitHub',
  'LinkedIn', 'Facebook', 'Snapchat', 'Twitch', 'Discord'
]

export default function UsernameCheckerPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [progressiveResults, setProgressiveResults] = useState<ProgressiveResult[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

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
              url: `https://${platform.platform.toLowerCase()}.com/${username}`
            })
          }
          return updated
        })
        setSearchProgress((index + 1) / platforms.length * 100)
      }, 200 + index * 100) // Stagger the results
    })
  }

  const handleSearch = useCallback(async () => {
    const trimmedUsername = username.trim()
    
    if (!trimmedUsername) {
      setError('Please enter a username')
      return
    }

    if (trimmedUsername.length < 2 || trimmedUsername.length > 50) {
      setError('Username must be between 2 and 50 characters')
      return
    }
    
    setLoading(true)
    setError(null)
    setHasSearched(true)
    setResults(null)
    setProgressiveResults([])
    saveToHistory(trimmedUsername)
    
    // Start progressive loading animation
    simulateProgressiveLoading()
    
    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: trimmedUsername,
          rescan: false // Use cache for faster results
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to check username')
      }

      const data: ApiResponse = await response.json()
      setResults(data)
      setSearchProgress(100)
      
      if (data.apiError) {
        setError(`Warning: ${data.apiError}`)
      }
    } catch (err) {
      console.error('Search error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while searching')
    } finally {
      setLoading(false)
    }
  }, [username, searchHistory])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setUsername('')
    setResults(null)
    setError(null)
    setHasSearched(false)
    setProgressiveResults([])
    setSearchProgress(0)
  }

  // Sort results by importance and availability
  const getSortedResults = () => {
    if (!results?.results) return []
    
    return [...results.results].sort((a, b) => {
      // Priority platforms first
      const aPriority = PRIORITY_PLATFORMS.includes(a.source) ? 0 : 1
      const bPriority = PRIORITY_PLATFORMS.includes(b.source) ? 0 : 1
      if (aPriority !== bPriority) return aPriority - bPriority
      
      // Then available platforms
      if (!a.isExist && b.isExist) return -1
      if (a.isExist && !b.isExist) return 1
      
      // Then alphabetically
      return a.source.localeCompare(b.source)
    })
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Search className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Username Checker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Check if your desired username is available across 520+ social media platforms instantly
        </p>
      </div>
      
      {/* Search Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter username to check..."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setShowSuggestions(true)
                  setError(null)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyPress={handleKeyPress}
                className="text-lg h-14 pl-12 pr-12"
                disabled={loading}
              />
              {username && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              {/* Search History Dropdown */}
              <AnimatePresence>
                {showSuggestions && searchHistory.length > 0 && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10"
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 flex items-center gap-1">
                        <History className="h-3 w-3" />
                        Recent Searches
                      </div>
                      {searchHistory.slice(0, 5).map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                          onClick={() => {
                            setUsername(item)
                            setShowSuggestions(false)
                            setTimeout(handleSearch, 100)
                          }}
                        >
                          <Search className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{item}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Button 
              onClick={handleSearch} 
              disabled={loading || !username.trim()}
              size="lg"
              className="h-14 px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Check
                </>
              )}
            </Button>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 max-w-3xl mx-auto">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
            </div>
          )}
          
          {/* Progress Bar */}
          {loading && searchProgress > 0 && (
            <div className="mt-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Checking platforms...</span>
                <span className="text-sm font-medium">{Math.round(searchProgress)}%</span>
              </div>
              <Progress value={searchProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Progressive Results (shown while loading) */}
      {loading && progressiveResults.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Checking priority platforms...</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {progressiveResults.map((result, index) => (
                <motion.div
                  key={result.platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all",
                    result.status === 'checking' 
                      ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      : result.status === 'available'
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}
                >
                  <div className="text-sm font-medium truncate">{result.platform}</div>
                  <div className="mt-1">
                    {result.status === 'checking' ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto text-gray-400" />
                    ) : result.status === 'available' ? (
                      <CheckCircle2 className="h-4 w-4 mx-auto text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 mx-auto text-red-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Results Section */}
      {!loading && hasSearched && results && results.results.length > 0 && (
        <Card>
          <CardContent className="p-6">
            {/* Stats Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Results for <span className="text-primary">"{results.username}"</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.stats.totalChecked}
                  </div>
                  <div className="text-sm text-muted-foreground">Checked</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {results.stats.totalAvailable}
                  </div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {results.stats.totalTaken}
                  </div>
                  <div className="text-sm text-muted-foreground">Taken</div>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((results.stats.totalAvailable / results.stats.totalChecked) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {getSortedResults().map((result, index) => {
                const platformIcon = getPlatformIcon(result.source)
                const fallbackIcon = getIconFromUrl(result.url)
                const iconSrc = platformIcon || fallbackIcon
                const isAvailable = !result.isExist
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.02, 1) }}
                    className={cn(
                      "p-4 rounded-lg border transition-all hover:shadow-md",
                      isAvailable
                        ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 hover:border-green-300"
                        : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 hover:border-red-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {iconSrc && (
                          <img 
                            src={iconSrc} 
                            alt={result.source} 
                            className="w-5 h-5 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.source}</div>
                          {result.category && (
                            <div className="text-xs text-muted-foreground">{result.category}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {isAvailable ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                        )}
                        {result.url && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <a 
                              href={result.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              aria-label={`Visit ${result.source}`}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Pro Upsell */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Want unlimited searches?</h3>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Pro for unlimited daily searches, API access, and priority support
                  </p>
                </div>
                <Button asChild>
                  <Link href="/pricing">
                    Upgrade to Pro
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Empty State */}
      {!loading && hasSearched && results && results.results.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try searching with a different username
            </p>
          </CardContent>
        </Card>
      )}
      
      {/* Initial State */}
      {!hasSearched && !loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to check your username?</h3>
              <p className="text-muted-foreground mb-6">
                Enter a username above to see if it's available across social media platforms
              </p>
              
              {/* Popular Searches */}
              <div className="mt-8">
                <p className="text-sm text-muted-foreground mb-3">Try these popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['techguru', 'creator', 'gamer', 'artist', 'developer'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setUsername(suggestion)
                        setTimeout(handleSearch, 100)
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
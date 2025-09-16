'use client'

import React, { useState, useCallback } from 'react'
import { Search, Loader2, Check, X, ExternalLink, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

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

export default function SearchInterface() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(),
          rescan: false // 使用缓存结果以提高速度
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to check username')
      }

      const data: ApiResponse = await response.json()
      setResults(data)

      if (data.apiError) {
        setError(`Warning: ${data.apiError}`)
      }
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
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Enter username to check across 1500+ platforms..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-3 text-lg"
            disabled={loading}
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={loading || !username.trim()}
          size="lg"
          className="px-8"
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

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Checking username availability across 1500+ platforms...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            This may take a few moments
          </p>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6">
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

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredResults().map((result, index) => (
              <Card 
                key={index} 
                className={`p-4 ${result.isExist ? 'border-red-200 dark:border-red-900' : 'border-green-200 dark:border-green-900'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{result.source}</h3>
                    {result.category && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {result.category}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {result.isExist ? (
                      <div className="flex items-center text-red-500">
                        <X className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Taken</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <Check className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Available</span>
                      </div>
                    )}
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                      title="Visit profile page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {getFilteredResults().length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No results found for the selected category.
              </p>
            </div>
          )}

          {/* Pro Upsell */}
          {results.stats.totalChecked < results.stats.totalSites && (
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Want to check all {results.stats.totalSites}+ platforms?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Upgrade to Pro for complete coverage, API access, and bulk checking
                </p>
                <Button asChild>
                  <a href="/pricing">View Pricing Plans</a>
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
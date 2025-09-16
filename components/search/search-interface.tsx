'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Search, Check, X, Clock, ExternalLink, AlertCircle } from 'lucide-react'
// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

interface PlatformResult {
  platform: string
  username: string
  available: boolean
  url: string
  category: string
  status: 'checking' | 'available' | 'taken' | 'error'
  responseTime?: number
}

interface SearchResult {
  username: string
  results: PlatformResult[]
  totalChecked: number
  available: number
  taken: number
  errors: number
}

const platformCategories = {
  'Social Media': ['Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'Snapchat', 'Pinterest', 'YouTube'],
  'Development': ['GitHub', 'GitLab', 'Stack Overflow', 'CodePen', 'npm', 'Docker Hub', 'PyPI'],
  'Design': ['Dribbble', 'Behance', 'Figma Community', 'DeviantArt', 'Unsplash', 'Adobe Portfolio'],
  'Gaming': ['Steam', 'Twitch', 'Discord', 'Xbox Live', 'PlayStation Network', 'Epic Games'],
  'Professional': ['AngelList', 'Crunchbase', 'Medium', 'Substack', 'Patreon', 'Ko-fi'],
  'Domains': ['.com', '.net', '.org', '.io', '.co', '.app', '.dev', '.me'],
}

export default function SearchInterface() {
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(platformCategories))
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchUsername: string) => {
      if (searchUsername.length < 2) return

      setIsSearching(true)
      
      // Simulate API call
      const mockResults: PlatformResult[] = []
      
      selectedCategories.forEach(category => {
        platformCategories[category as keyof typeof platformCategories].forEach(platform => {
          const available = Math.random() > 0.3 // 70% chance of being available
          const responseTime = Math.floor(Math.random() * 2000) + 100
          
          mockResults.push({
            platform,
            username: searchUsername,
            available,
            url: `https://${platform.toLowerCase().replace(' ', '')}.com/${searchUsername}`,
            category,
            status: available ? 'available' : 'taken',
            responseTime,
          })
        })
      })

      // Simulate gradual loading
      setSearchResult({
        username: searchUsername,
        results: [],
        totalChecked: 0,
        available: 0,
        taken: 0,
        errors: 0,
      })

      for (let i = 0; i < mockResults.length; i++) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100 + 50))
        
        setSearchResult(prev => {
          if (!prev) return null
          
          const newResults = [...prev.results, mockResults[i]]
          const available = newResults.filter(r => r.available).length
          const taken = newResults.filter(r => !r.available && r.status === 'taken').length
          const errors = newResults.filter(r => r.status === 'error').length
          
          return {
            ...prev,
            results: newResults,
            totalChecked: newResults.length,
            available,
            taken,
            errors,
          }
        })
      }

      setIsSearching(false)
    }, 500),
    [selectedCategories]
  )

  // Handle username input change
  useEffect(() => {
    if (username.trim()) {
      debouncedSearch(username.trim())
    } else {
      setSearchResult(null)
      setIsSearching(false)
    }
  }, [username, debouncedSearch])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getStatusIcon = (result: PlatformResult) => {
    switch (result.status) {
      case 'checking':
        return <Clock className="h-4 w-4 text-gray-400 animate-spin" />
      case 'available':
        return <Check className="h-4 w-4 text-green-500" />
      case 'taken':
        return <X className="h-4 w-4 text-red-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const getStatusColor = (result: PlatformResult) => {
    switch (result.status) {
      case 'available':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
      case 'taken':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
      case 'error':
        return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950'
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter username to check availability..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg h-12"
              autoFocus
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-4"
          >
            Filters
          </Button>
        </div>
        
        {/* Real-time validation */}
        {username && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {username.length < 3 && (
              <span className="text-orange-600">Username should be at least 3 characters long</span>
            )}
            {username.length >= 3 && !/^[a-zA-Z0-9_.-]+$/.test(username) && (
              <span className="text-red-600">Username contains invalid characters</span>
            )}
            {username.length >= 3 && /^[a-zA-Z0-9_.-]+$/.test(username) && (
              <span className="text-green-600">Valid username format</span>
            )}
          </div>
        )}
      </div>

      {/* Category Filters */}
      {showFilters && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Select categories to check:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(platformCategories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
              >
                {category} ({platformCategories[category as keyof typeof platformCategories].length})
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Search Progress */}
      {isSearching && searchResult && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Checking availability for "{searchResult.username}"...
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {searchResult.totalChecked} / {selectedCategories.reduce((acc, cat) => acc + platformCategories[cat as keyof typeof platformCategories].length, 0)} checked
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(searchResult.totalChecked / selectedCategories.reduce((acc, cat) => acc + platformCategories[cat as keyof typeof platformCategories].length, 0)) * 100}%` 
              }}
            />
          </div>
        </Card>
      )}

      {/* Search Results Summary */}
      {searchResult && searchResult.totalChecked > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchResult.totalChecked}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Checked</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {searchResult.available}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Available</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {searchResult.taken}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Taken</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {searchResult.errors}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Errors</div>
          </Card>
        </div>
      )}

      {/* Results by Category */}
      {searchResult && searchResult.results.length > 0 && (
        <div className="space-y-6">
          {Object.keys(platformCategories).map((category) => {
            const categoryResults = searchResult.results.filter(r => r.category === category)
            if (categoryResults.length === 0) return null

            return (
              <Card key={category} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                  {category}
                  <span className="text-sm font-normal text-gray-600 dark:text-gray-300">
                    {categoryResults.filter(r => r.available).length} / {categoryResults.length} available
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryResults.map((result) => (
                    <div
                      key={result.platform}
                      className={`p-3 rounded-lg border transition-all ${getStatusColor(result)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result)}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {result.platform}
                          </span>
                        </div>
                        {result.status === 'available' && (
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {result.status === 'available' && 'Available'}
                        {result.status === 'taken' && 'Already taken'}
                        {result.status === 'error' && 'Check failed'}
                        {result.status === 'checking' && 'Checking...'}
                        {result.responseTime && (
                          <span className="ml-2">({result.responseTime}ms)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!username && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start Your Username Search
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Enter a username above to check its availability across hundreds of platforms 
            and social media sites instantly.
          </p>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, ExternalLink, ChevronDown, Shield } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Site {
  n: string  // name (obfuscated key)
  u: string  // url (obfuscated key)
  c: string  // category (obfuscated key)
  r?: number // rank (obfuscated key)
}

// Anti-scraping: Randomize class names on each render
const getRandomClass = () => `_${Math.random().toString(36).substr(2, 9)}`

// Anti-scraping: Obfuscate text with CSS
const ObfuscatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false)
  const chars = text.split('')
  
  return (
    <span 
      className={`${className} select-none`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {chars.map((char, i) => (
        <span 
          key={i} 
          style={{ 
            opacity: isVisible ? 1 : 0.7,
            transition: 'opacity 0.2s',
          }}
          data-char={btoa(char)} // Base64 encode characters
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default function SupportedSitesPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [visibleSites, setVisibleSites] = useState<Site[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTier, setSelectedTier] = useState<'all'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showCount, setShowCount] = useState(20)
  const [sessionViews, setSessionViews] = useState(0)
  const [isVerified, setIsVerified] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const mouseMovements = useRef<number[]>([])
  const lastActivityRef = useRef<number>(Date.now())
  
  // Track mouse movements for bot detection
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseMovements.current.push(e.clientX + e.clientY)
      if (mouseMovements.current.length > 10) {
        mouseMovements.current.shift()
      }
      lastActivityRef.current = Date.now()
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Session-based view limiting
  useEffect(() => {
    const views = parseInt(sessionStorage.getItem('site-views') || '0')
    setSessionViews(views)
    if (views > 100) {
      setIsVerified(false)
    }
  }, [])
  
  // Load sites with anti-scraping measures
  useEffect(() => {
    const loadSites = async () => {
      setIsLoading(true)
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))
      
      // Check for bot-like behavior
      if (mouseMovements.current.length < 3) {
        setIsVerified(false)
        setIsLoading(false)
        return
      }
      
      try {
        // In production, this would be an API call with server-side protection
        const response = await fetch('/api/sites/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Session-Token': btoa(Date.now().toString()), // Session verification
          },
          body: JSON.stringify({
            offset: 0,
            limit: 20,
            fingerprint: mouseMovements.current.slice(-5), // Bot detection
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to load sites')
        }
        
        const data = await response.json()
        
        // Transform obfuscated data
        const transformedSites: Site[] = data.sites || []
        setSites(transformedSites)
        setVisibleSites(transformedSites.slice(0, showCount))
        setIsVerified(true)
        
        // Update session views
        const newViews = sessionViews + 1
        setSessionViews(newViews)
        sessionStorage.setItem('site-views', newViews.toString())
      } catch (error) {
        // Fallback to limited static data
        const limitedSites: Site[] = Array.from({ length: 20 }, (_, i) => ({
          n: `Platform ${i + 1}`,
          u: `https://example${i + 1}.com`,
          c: ['Social', 'Gaming', 'Tech', 'Media'][i % 4],
          r: i + 1000,
        }))
        setSites(limitedSites)
        setVisibleSites(limitedSites)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadSites()
  }, [sessionViews, showCount])
  
  // Lazy loading with intersection observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleSites.length < sites.length) {
          // Check for rapid scrolling (bot behavior)
          const timeSinceLastActivity = Date.now() - lastActivityRef.current
          if (timeSinceLastActivity < 100) {
            setIsVerified(false)
            return
          }
          
          setShowCount(prev => Math.min(prev + 10, sites.length))
        }
      },
      { threshold: 0.1 }
    )
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }
    
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [visibleSites, sites])
  
  // Filter sites
  useEffect(() => {
    let filtered = sites
    
    if (searchQuery) {
      filtered = filtered.filter(site => 
        site.n.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(site => site.c === selectedCategory)
    }
    
    
    setVisibleSites(filtered.slice(0, showCount))
  }, [searchQuery, selectedCategory, selectedTier, sites, showCount])
  
  const categories = ['all', ...Array.from(new Set(sites.map(s => s.c))).sort()]
  
  const stats = {
    total: 1500, // Always show full number
    visible: visibleSites.length,
  }
  
  // Require verification for full access
  if (!isVerified && sessionViews > 3) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Verification Required</h2>
              <p className="text-muted-foreground mb-6">
                To protect our data and ensure quality service, please verify you're human.
              </p>
              <Alert className="mb-6">
                <AlertDescription>
                  You've viewed {sessionViews} pages this session. Sign in for full access to browse all platforms.
                </AlertDescription>
              </Alert>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a href="/login">Sign In</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/">Go to Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All {stats.total}+ Supported Sites
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse all platforms we support for username availability checking.
        </p>
      </div>
      
      {/* Security Notice */}
      {sessionViews > 0 && (
        <Alert className="mb-8 max-w-3xl mx-auto">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            Viewing {stats.visible} of {stats.total} platforms. 
            {sessionViews > 50 && ' Sign in for unlimited browsing.'}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Stats Card */}
      <div className="max-w-md mx-auto mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{stats.total}+</div>
            <div className="text-lg text-muted-foreground">Supported Platforms</div>
            <p className="text-sm text-muted-foreground mt-2">All platforms available for username checking</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur pb-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  maxLength={50}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing {visibleSites.length} of {stats.total}+ platforms
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sites Grid with Anti-Scraping */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-12 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {visibleSites.map((site, index) => {
              const randomClass = getRandomClass()
              return (
                <Card 
                  key={`${site.n}-${index}`} 
                  className={`hover:shadow-md transition-shadow ${randomClass}`}
                  data-index={btoa(index.toString())} // Obfuscate index
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 overflow-hidden">
                        <h4 className="font-medium">
                          <ObfuscatedText text={site.n} />
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          <span className="select-none opacity-70">
                            {site.c}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline"
                          className="select-none"
                        >
                          {site.c}
                        </Badge>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => window.open(site.u, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {/* Load More Trigger */}
          {visibleSites.length < sites.length && (
            <div 
              ref={loadMoreRef} 
              className="flex justify-center py-8"
            >
              <Button variant="outline" disabled>
                <ChevronDown className="h-4 w-4 mr-2" />
                Loading more...
              </Button>
            </div>
          )}
        </>
      )}
      
      {/* CTA Section */}
      <Card className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-4">
            Start Checking Username Availability
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Check username availability across all {stats.total}+ platforms instantly.
            Free users get 10 searches per day, or upgrade for unlimited access.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/">Start Searching</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/pricing">View Plans</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
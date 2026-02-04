'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Copy, 
  Loader2, 
  Check,
  Lightbulb,
  Rocket,
  Target,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const styles = [
  { id: 'modern', label: 'Modern & Tech', icon: Zap, description: 'Innovative and cutting-edge' },
  { id: 'elegant', label: 'Elegant', icon: Sparkles, description: 'Sophisticated and premium' },
  { id: 'playful', label: 'Playful', icon: Rocket, description: 'Fun and creative' },
  { id: 'natural', label: 'Natural', icon: Target, description: 'Organic and authentic' },
  { id: 'one-word', label: 'One Word', icon: Lightbulb, description: 'Simple and memorable' },
  { id: 'minimal', label: 'Minimal', icon: Target, description: 'Clean and simple' },
]

interface GeneratedBrand {
  name: string
  available?: boolean
  checking?: boolean
}

export default function BrandNameGeneratorPage() {
  const [keywords, setKeywords] = useState('')
  const [industry, setIndustry] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [generatedBrands, setGeneratedBrands] = useState<GeneratedBrand[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!keywords.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/brand-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keywords: keywords.trim(),
          style: selectedStyle,
          industry: industry.trim() || 'general',
          count: 15,
        }),
      })
      
      const data = await response.json()
      
      if (data.brands) {
        setGeneratedBrands(
          data.brands.map((name: string) => ({
            name,
            available: undefined,
            checking: false,
          }))
        )
        
        // Check availability for each brand
        checkAvailability(data.brands)
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const checkAvailability = async (brands: string[]) => {
    for (let i = 0; i < brands.length; i++) {
      setGeneratedBrands(prev => 
        prev.map((item, index) => 
          index === i ? { ...item, checking: true } : item
        )
      )
      
      try {
        const response = await fetch('https://api.usernamesearch.io/discoverprofile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: brands[i].toLowerCase().replace(/\s+/g, ''),
            type: 'name',
            rescan: false
          }),
        })

        const data = await response.json()
        const apiResults = data.result || data.resultArr || data.results || []
        const availableCount = apiResults.filter((r: any) => !r.isExist).length
        
        setGeneratedBrands(prev => 
          prev.map((item, index) => 
            index === i 
              ? { ...item, available: availableCount > 100, checking: false }
              : item
          )
        )
      } catch (error) {
        setGeneratedBrands(prev => 
          prev.map((item, index) => 
            index === i ? { ...item, checking: false } : item
          )
        )
      }
    }
  }
  
  const copyToClipboard = (brandName: string, index: number) => {
    navigator.clipboard.writeText(brandName)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lightbulb className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Brand Name Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create unique, memorable brand names powered by AI. Perfect for startups, 
          products, or any new venture.
        </p>
      </div>
      
      {/* Generator Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Your Perfect Brand Name</CardTitle>
          <CardDescription>
            Describe your business and let AI create brandable names
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keywords Input */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords or Description</Label>
            <Textarea
              id="keywords"
              placeholder="e.g., sustainable fashion, organic coffee, AI productivity tools..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              Describe your business, values, or what makes you unique
            </p>
          </div>
          
          {/* Industry Input */}
          <div className="space-y-2">
            <Label htmlFor="industry">Industry (optional)</Label>
            <Input
              id="industry"
              placeholder="e.g., Technology, Fashion, Food & Beverage..."
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          
          {/* Style Selection */}
          <div className="space-y-2">
            <Label>Brand Style</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {styles.map((style) => {
                const Icon = style.icon
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                      selectedStyle === style.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-center">
                      <div className="text-sm font-medium">{style.label}</div>
                      <div className="text-xs text-muted-foreground">{style.description}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            disabled={loading || !keywords.trim()}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Brand Names...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Brand Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* Generated Brands */}
      {generatedBrands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Brand Names</CardTitle>
            <CardDescription>
              Click to copy any name. Green badges indicate high domain availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {generatedBrands.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-semibold text-lg">{item.name}</span>
                    {item.checking && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {!item.checking && item.available !== undefined && (
                      <Badge variant={item.available ? "default" : "secondary"} className="text-xs">
                        {item.available ? "Good Availability" : "Limited"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.name, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                    >
                      <Link href={`/?username=${item.name.toLowerCase().replace(/\s+/g, '')}`}>
                        Check
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Great Brand Names</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">What Makes a Good Brand Name</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Easy to pronounce and spell</li>
                <li>• Memorable and distinctive</li>
                <li>• Reflects your brand values</li>
                <li>• Works across cultures</li>
                <li>• Available as a domain</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Things to Avoid</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Hard-to-spell words</li>
                <li>• Trendy terms that may age poorly</li>
                <li>• Geographic limitations</li>
                <li>• Trademark conflicts</li>
                <li>• Negative connotations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
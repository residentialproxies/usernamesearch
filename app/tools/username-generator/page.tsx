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
  RefreshCw, 
  Loader2, 
  Check,
  Wand2,
  User,
  Gamepad2,
  Briefcase,
  Music,
  Code,
  Palette
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GeneratedUsername {
  username: string
  available?: boolean
  checking?: boolean
}

const styles = [
  { id: 'creative', label: 'Creative', icon: Palette, description: 'Artistic and unique' },
  { id: 'professional', label: 'Professional', icon: Briefcase, description: 'Clean and formal' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, description: 'Cool gaming tags' },
  { id: 'tech', label: 'Tech', icon: Code, description: 'Techy and modern' },
  { id: 'music', label: 'Music', icon: Music, description: 'Musical vibes' },
  { id: 'minimal', label: 'Minimal', icon: User, description: 'Simple and clean' },
]

export default function UsernameGeneratorPage() {
  const [keywords, setKeywords] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('creative')
  const [preferences, setPreferences] = useState('')
  const [generatedUsernames, setGeneratedUsernames] = useState<GeneratedUsername[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!keywords.trim()) return
    
    setLoading(true)
    try {
      // Create prompt based on keywords and preferences
      let prompt = `Generate usernames based on: ${keywords.trim()}`
      if (preferences.trim()) {
        prompt += `. Additional requirements: ${preferences.trim()}`
      }
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          keywords: keywords.trim().split(/[\s,]+/).filter(k => k.length > 0),
          style: selectedStyle,
          count: 10,
        }),
      })
      
      const data = await response.json()
      
      if (data.usernames) {
        setGeneratedUsernames(
          data.usernames.map((username: string) => ({
            username,
            available: undefined,
            checking: false,
          }))
        )
        
        // Check availability for each username
        checkAvailability(data.usernames)
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const checkAvailability = async (usernames: string[]) => {
    // Check each username's availability
    for (let i = 0; i < usernames.length; i++) {
      setGeneratedUsernames(prev => 
        prev.map((item, index) => 
          index === i ? { ...item, checking: true } : item
        )
      )
      
      try {
        const response = await fetch('https://api.usernamesearch.io/discoverprofile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: usernames[i],
            type: 'name',
            rescan: false
          }),
        })

        const data = await response.json()
        const apiResults = data.result || data.resultArr || data.results || []
        const availableCount = apiResults.filter((r: any) => !r.isExist).length
        
        setGeneratedUsernames(prev => 
          prev.map((item, index) => 
            index === i 
              ? { ...item, available: availableCount > 50, checking: false }
              : item
          )
        )
      } catch (error) {
        setGeneratedUsernames(prev => 
          prev.map((item, index) => 
            index === i ? { ...item, checking: false } : item
          )
        )
      }
    }
  }
  
  const copyToClipboard = (username: string, index: number) => {
    navigator.clipboard.writeText(username)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Username Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate unique, creative usernames powered by AI. Perfect for social media, 
          gaming, or any online platform.
        </p>
      </div>
      
      {/* Generator Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Your Perfect Username</CardTitle>
          <CardDescription>
            Enter keywords and preferences to generate personalized username suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keywords Input */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords or Name</Label>
            <Input
              id="keywords"
              placeholder="e.g., John, ninja, tech, music..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <p className="text-sm text-muted-foreground">
              Enter words that describe you or your interests
            </p>
          </div>
          
          {/* Style Selection */}
          <div className="space-y-2">
            <Label>Style</Label>
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
          
          {/* Additional Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferences">Additional Preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., Should be short, include numbers, no special characters..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              rows={3}
            />
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
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Usernames
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* Generated Usernames */}
      {generatedUsernames.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Usernames</CardTitle>
            <CardDescription>
              Click to copy any username. Green badges indicate high availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {generatedUsernames.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg">{item.username}</span>
                    {item.checking && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {!item.checking && item.available !== undefined && (
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? "High Availability" : "Limited Availability"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(item.username, index)}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={`/?username=${item.username}`}>
                        Check Availability
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Regenerate Button */}
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-4"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate More
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Great Usernames</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">
                <strong>Keep it memorable:</strong> Choose something easy to remember and spell
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">
                <strong>Be consistent:</strong> Use the same username across platforms when possible
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">
                <strong>Avoid special characters:</strong> Not all platforms support them
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">
                <strong>Consider length:</strong> 3-15 characters works for most platforms
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm">
                <strong>Think long-term:</strong> Choose something you won't outgrow
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CheckCircle2,
  XCircle,
  Globe,
  Users,
  TrendingUp,
  Info,
  ArrowRight,
  Search
} from 'lucide-react'

const platformData: Record<string, any> = {
  instagram: {
    name: 'Instagram',
    domain: 'instagram.com',
    category: 'Social Networks',
    monthlyVisits: '2.4B',
    description: 'Instagram is a photo and video sharing social network owned by Meta. With over 2 billion active users, securing your username on Instagram is crucial for personal branding and business presence.',
    usernameRules: {
      minLength: 1,
      maxLength: 30,
      allowedCharacters: 'Letters, numbers, periods, underscores',
      restrictions: [
        'Cannot start or end with a period',
        'No consecutive periods allowed',
        'No special characters except periods and underscores',
        'Case insensitive'
      ]
    },
    tips: [
      'Keep it short and memorable - ideally under 15 characters',
      'Avoid excessive numbers or underscores',
      'Consider using your real name for personal branding',
      'Make it easy to spell and pronounce',
      'Check for consistency with other social media handles'
    ],
    relatedPlatforms: ['threads', 'facebook', 'whatsapp']
  },
  tiktok: {
    name: 'TikTok',
    domain: 'tiktok.com',
    category: 'Social Networks',
    monthlyVisits: '1.7B',
    description: 'TikTok is the world\'s leading short-form video platform. With its massive Gen Z and millennial user base, having a consistent TikTok username is essential for content creators and brands.',
    usernameRules: {
      minLength: 2,
      maxLength: 24,
      allowedCharacters: 'Letters, numbers, underscores, periods',
      restrictions: [
        'Must contain only letters, numbers, underscores, and periods',
        'Cannot contain spaces',
        'Case insensitive',
        'Must be unique across TikTok'
      ]
    },
    tips: [
      'Choose something catchy that reflects your content niche',
      'Keep it simple for easy mentions in videos',
      'Avoid complex spellings that are hard to search',
      'Consider your target audience when choosing',
      'Make it memorable and brandable'
    ],
    relatedPlatforms: ['youtube', 'instagram', 'snapchat']
  },
  twitter: {
    name: 'X (Twitter)',
    domain: 'x.com',
    category: 'Social Networks',
    monthlyVisits: '1.2B',
    description: 'X (formerly Twitter) is a microblogging platform where brevity is key. With only 15 characters allowed for usernames, choosing the right handle is crucial for recognition and engagement.',
    usernameRules: {
      minLength: 1,
      maxLength: 15,
      allowedCharacters: 'Letters, numbers, underscores only',
      restrictions: [
        'Maximum 15 characters',
        'No spaces or special characters',
        'Cannot use "Twitter" or "Admin"',
        'Case insensitive'
      ]
    },
    tips: [
      'Keep it as short as possible for easy mentions',
      'Avoid underscores if possible - they\'re harder to type',
      'Consider removing vowels if your desired name is too long',
      'Make it professional if using for business',
      'Think about how it looks in @ mentions'
    ],
    relatedPlatforms: ['threads', 'bluesky', 'mastodon']
  },
  youtube: {
    name: 'YouTube',
    domain: 'youtube.com',
    category: 'Video & Streaming',
    monthlyVisits: '2.7B',
    description: 'YouTube is the world\'s largest video sharing platform. Your channel URL is permanent once set, making username selection critical for long-term brand building.',
    usernameRules: {
      minLength: 3,
      maxLength: 30,
      allowedCharacters: 'Letters, numbers, underscores, hyphens, periods',
      restrictions: [
        'Must be unique across YouTube and Google',
        'Cannot be changed once set (for custom URLs)',
        'Minimum 100 subscribers for custom URL',
        'Case insensitive'
      ]
    },
    tips: [
      'Choose a name that reflects your content type',
      'Make it easy to remember and spell',
      'Consider SEO - include relevant keywords if possible',
      'Think long-term - you can\'t easily change it',
      'Keep it consistent with other platforms'
    ],
    relatedPlatforms: ['twitch', 'instagram', 'tiktok']
  },
  github: {
    name: 'GitHub',
    domain: 'github.com',
    category: 'Software & Development',
    monthlyVisits: '400M',
    description: 'GitHub is the world\'s leading software development platform. Your GitHub username becomes part of your professional identity in the tech industry, appearing in code contributions and portfolios.',
    usernameRules: {
      minLength: 1,
      maxLength: 39,
      allowedCharacters: 'Alphanumeric characters and hyphens',
      restrictions: [
        'Cannot start with a hyphen',
        'No consecutive hyphens',
        'Case insensitive for URLs',
        'Permanent - cannot be reused even if deleted'
      ]
    },
    tips: [
      'Use your real name for professional credibility',
      'Keep it consistent with LinkedIn and other professional platforms',
      'Avoid temporary or joke usernames',
      'Consider SEO for your developer profile',
      'Make it easy for recruiters to find you'
    ],
    relatedPlatforms: ['gitlab', 'stackoverflow', 'linkedin']
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ platform: string }> }
): Promise<Metadata> {
  const { platform: platformParam } = await params
  const platform = platformParam.toLowerCase()
  const data = platformData[platform]
  
  if (!data) {
    return {
      title: 'Platform Not Found | UsernameSearch.io',
      description: 'The requested platform page was not found.'
    }
  }
  
  return {
    title: `${data.name} Username Checker - Check Availability | UsernameSearch.io`,
    description: `Check if your desired username is available on ${data.name}. Learn the username rules, get tips, and secure your ${data.name} handle today.`,
    keywords: `${data.name} username checker, ${data.name} username availability, ${data.name} handle checker, ${platform} username`,
    openGraph: {
      title: `${data.name} Username Checker`,
      description: `Check username availability on ${data.name} instantly`,
      url: `https://usernamesearch.io/username-checker/${platform}`,
    },
  }
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: platformParam } = await params
  const platform = platformParam.toLowerCase()
  const data = platformData[platform]
  
  if (!data) {
    notFound()
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4">{data.category}</Badge>
        <h1 className="text-4xl font-bold mb-4">
          {data.name} Username Checker
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {data.description}
        </p>
        
        {/* Stats */}
        <div className="flex gap-6 justify-center mt-6">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              <strong>{data.monthlyVisits}</strong> monthly visits
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              Domain: <strong>{data.domain}</strong>
            </span>
          </div>
        </div>
      </div>
      
      {/* Check Username CTA */}
      <Card className="mb-8 border-2 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to check your username on {data.name}?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use our instant checker to see if your desired username is available
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={`/?platform=${platform}`}>
                <Search className="mr-2 h-4 w-4" />
                Check Availability
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools/username-checker">
                Check All Platforms
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Username Rules */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            {data.name} Username Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Character Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="text-sm">
                    <strong>Length:</strong> {data.usernameRules.minLength}-{data.usernameRules.maxLength} characters
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="text-sm">
                    <strong>Allowed:</strong> {data.usernameRules.allowedCharacters}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Restrictions</h3>
              <ul className="space-y-2">
                {data.usernameRules.restrictions.map((restriction: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{restriction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tips for Choosing Your {data.name} Username
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.tips.map((tip: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Related Platforms */}
      {data.relatedPlatforms && (
        <Card>
          <CardHeader>
            <CardTitle>Also Check These Platforms</CardTitle>
            <CardDescription>
              Users who check {data.name} often also check these platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {data.relatedPlatforms.map((related: string) => {
                const relatedData = platformData[related]
                if (!relatedData) return null
                return (
                  <Button key={related} variant="outline" asChild>
                    <Link href={`/username-checker/${related}`}>
                      {relatedData.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* SEO Content */}
      <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
        <h2>Why Check Your {data.name} Username?</h2>
        <p>
          Securing your username on {data.name} is crucial for establishing your online identity. 
          With {data.monthlyVisits} monthly visitors, {data.name} is one of the most important 
          platforms for personal branding and business growth.
        </p>
        
        <h3>How to Claim Your {data.name} Username</h3>
        <ol>
          <li>Use our checker tool to verify availability</li>
          <li>Create your {data.name} account immediately if available</li>
          <li>Complete your profile to secure the username</li>
          <li>Check related platforms for consistency</li>
        </ol>
        
        <h3>What If Your Desired Username Is Taken?</h3>
        <p>
          If your preferred username is unavailable on {data.name}, consider these alternatives:
        </p>
        <ul>
          <li>Add your profession or industry (e.g., johnsmith_design)</li>
          <li>Include your location (e.g., johnsmithnyc)</li>
          <li>Use underscores or periods strategically</li>
          <li>Try our <Link href="/tools/username-generator">AI Username Generator</Link> for creative alternatives</li>
        </ul>
        
        <Alert className="mt-6">
          <AlertDescription>
            <strong>Pro Tip:</strong> Check username availability across all 520+ platforms 
            with our <Link href="/pricing" className="font-semibold underline">Pro plan</Link>. 
            Get comprehensive results and never miss a platform again.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
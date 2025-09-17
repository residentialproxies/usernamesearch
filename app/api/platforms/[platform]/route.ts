import { NextRequest, NextResponse } from 'next/server'
import sitesData from '@/lib/data/sites.json'

const platformDetails: Record<string, any> = {
  instagram: {
    name: 'Instagram',
    domain: 'instagram.com',
    category: 'Social Networks',
    tier: 'free',
    rank: 1,
    monthlyVisits: '2.4B',
    description: 'Photo and video sharing social network owned by Meta',
    usernameRules: {
      minLength: 1,
      maxLength: 30,
      allowedCharacters: 'Letters, numbers, periods, underscores',
      caseSensitive: false,
      restrictions: 'Cannot start or end with a period. No consecutive periods.'
    },
    tips: [
      'Keep it short and memorable',
      'Avoid too many numbers or underscores',
      'Consider using your real name or brand',
      'Check for consistency across other platforms'
    ]
  },
  tiktok: {
    name: 'TikTok',
    domain: 'tiktok.com',
    category: 'Social Networks',
    tier: 'free',
    rank: 2,
    monthlyVisits: '1.7B',
    description: 'Short-form video sharing platform',
    usernameRules: {
      minLength: 2,
      maxLength: 24,
      allowedCharacters: 'Letters, numbers, underscores, periods',
      caseSensitive: false,
      restrictions: 'Must contain only letters, numbers, underscores, and periods'
    },
    tips: [
      'Choose something catchy and easy to remember',
      'Consider your content niche',
      'Avoid complex spellings',
      'Think about how it sounds when spoken'
    ]
  },
  twitter: {
    name: 'X (Twitter)',
    domain: 'x.com',
    category: 'Social Networks',
    tier: 'free',
    rank: 3,
    monthlyVisits: '1.2B',
    description: 'Microblogging and social networking platform',
    usernameRules: {
      minLength: 1,
      maxLength: 15,
      allowedCharacters: 'Letters, numbers, underscores',
      caseSensitive: false,
      restrictions: 'Cannot be "Twitter" or contain "admin"'
    },
    tips: [
      'Keep it under 15 characters',
      'Simple is better for mentions',
      'Consider removing vowels if name is too long',
      'Avoid underscores if possible'
    ]
  },
  github: {
    name: 'GitHub',
    domain: 'github.com',
    category: 'Software & Development',
    tier: 'free',
    rank: 10,
    monthlyVisits: '400M',
    description: 'Code hosting and collaboration platform for developers',
    usernameRules: {
      minLength: 1,
      maxLength: 39,
      allowedCharacters: 'Alphanumeric characters and hyphens',
      caseSensitive: false,
      restrictions: 'Cannot start with hyphen. No consecutive hyphens.'
    },
    tips: [
      'Use your real name for professional presence',
      'Keep it consistent with other dev platforms',
      'Avoid temporary or joke usernames',
      'Consider SEO for your profile'
    ]
  },
  youtube: {
    name: 'YouTube',
    domain: 'youtube.com',
    category: 'Video & Streaming',
    tier: 'free',
    rank: 4,
    monthlyVisits: '2.7B',
    description: 'Video sharing and streaming platform by Google',
    usernameRules: {
      minLength: 3,
      maxLength: 30,
      allowedCharacters: 'Letters, numbers, underscores, hyphens, periods',
      caseSensitive: false,
      restrictions: 'Must be unique across YouTube and Google'
    },
    tips: [
      'Choose a name that reflects your content',
      'Keep it easy to spell and pronounce',
      'Consider your target audience',
      'Make it memorable and brandable'
    ]
  },
  linkedin: {
    name: 'LinkedIn',
    domain: 'linkedin.com',
    category: 'Professional & Business',
    tier: 'free',
    rank: 8,
    monthlyVisits: '900M',
    description: 'Professional networking and career development platform',
    usernameRules: {
      minLength: 3,
      maxLength: 100,
      allowedCharacters: 'Letters, numbers, hyphens',
      caseSensitive: false,
      restrictions: 'Professional URLs only. No special characters except hyphens.'
    },
    tips: [
      'Use your real name for professional credibility',
      'Keep it professional and clean',
      'Consider using firstname-lastname format',
      'Avoid nicknames or casual handles'
    ]
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { platform: string } }
) {
  const platform = params.platform.toLowerCase()
  
  // Check if we have detailed info for this platform
  if (platformDetails[platform]) {
    return NextResponse.json({
      success: true,
      platform: platformDetails[platform]
    })
  }
  
  // Otherwise, try to find it in the sites data
  const siteEntries = Object.entries(sitesData)
  const siteEntry = siteEntries.find(([name, site]) => 
    name.toLowerCase().replace(/[^a-z0-9]/g, '') === platform ||
    site.url.includes(platform)
  )
  
  if (siteEntry) {
    const [siteName, site] = siteEntry
    const index = siteEntries.findIndex(([name]) => name === siteName)
    return NextResponse.json({
      success: true,
      platform: {
        name: siteName,
        ...site,
        tier: index < 100 ? 'free' : 'pro',
        rank: index + 1000,
        description: `Check username availability on ${siteName}`,
        usernameRules: {
          minLength: 1,
          maxLength: 30,
          allowedCharacters: 'Varies by platform',
          caseSensitive: false,
          restrictions: 'Platform-specific restrictions may apply'
        }
      }
    })
  }
  
  return NextResponse.json(
    { 
      error: 'Platform not found',
      availablePlatforms: Object.keys(platformDetails)
    },
    { status: 404 }
  )
}
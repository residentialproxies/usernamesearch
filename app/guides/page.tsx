import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Sparkles,
  Target,
  Users,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Lightbulb,
  Search
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Username & Branding Guides - Expert Tips & Strategies | UsernameSearch.io',
  description: 'Comprehensive guides on username selection, brand consistency, personal branding online, and social media strategies. Learn best practices for building your digital identity.',
  keywords: 'username guides, personal branding guide, brand consistency tips, username best practices, social media username strategy, username availability guide, brand building online, username recovery guide',
  openGraph: {
    title: 'Expert Guides for Username & Brand Management',
    description: 'Master the art of username selection and personal branding with our comprehensive guides. From best practices to recovery strategies.',
    url: 'https://usernamesearch.io/guides',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-guides.png',
        width: 1200,
        height: 630,
        alt: 'Username and Branding Guides Collection',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Username & Branding Guides',
    description: 'Learn username best practices, brand consistency, and personal branding strategies',
    images: ['https://usernamesearch.io/twitter-guides.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/guides',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const guides = [
  {
    title: 'Username Best Practices',
    description: 'Learn the essential best practices for choosing and managing usernames across different platforms. Discover what works and what to avoid.',
    icon: CheckCircle2,
    href: '/resources/guides/best-practices-username',
    readTime: '8 min read',
    category: 'Best Practices',
    difficulty: 'Beginner',
    color: 'from-blue-500 to-blue-600',
    highlights: ['Platform-specific tips', 'Security guidelines', 'Common mistakes to avoid'],
  },
  {
    title: 'Brand Consistency Across Platforms',
    description: 'Master the art of maintaining brand consistency across all social media and online platforms. Build a recognizable digital presence.',
    icon: Shield,
    href: '/resources/guides/brand-consistency',
    readTime: '10 min read',
    category: 'Branding',
    difficulty: 'Intermediate',
    color: 'from-purple-500 to-purple-600',
    highlights: ['Visual consistency', 'Voice and tone', 'Cross-platform strategy'],
  },
  {
    title: 'Building Your Personal Brand Online',
    description: 'A comprehensive guide to building and growing your personal brand online. From strategy to execution, learn what it takes to stand out.',
    icon: TrendingUp,
    href: '/resources/guides/building-your-personal-brand-online',
    readTime: '12 min read',
    category: 'Personal Branding',
    difficulty: 'Advanced',
    color: 'from-green-500 to-green-600',
    highlights: ['Brand strategy', 'Content planning', 'Audience engagement'],
  },
  {
    title: 'How to Check Username Availability',
    description: 'Step-by-step guide on checking username availability efficiently across multiple platforms. Save time and secure your brand.',
    icon: Target,
    href: '/resources/guides/how-to-check-username-availability',
    readTime: '5 min read',
    category: 'Getting Started',
    difficulty: 'Beginner',
    color: 'from-orange-500 to-orange-600',
    highlights: ['Tool recommendations', 'Checking strategies', 'Quick tips'],
  },
  {
    title: 'Creating the Perfect Username',
    description: 'Discover the secrets to creating memorable, unique, and effective usernames that represent you or your brand perfectly.',
    icon: Sparkles,
    href: '/resources/guides/perfect-username',
    readTime: '7 min read',
    category: 'Username Creation',
    difficulty: 'Beginner',
    color: 'from-pink-500 to-pink-600',
    highlights: ['Creative techniques', 'Naming formulas', 'Availability tricks'],
  },
  {
    title: 'Social Media Username Strategy',
    description: 'Develop a winning social media username strategy that helps you grow your following and establish your online presence.',
    icon: Users,
    href: '/resources/guides/social-media-username-strategy',
    readTime: '9 min read',
    category: 'Social Media',
    difficulty: 'Intermediate',
    color: 'from-indigo-500 to-indigo-600',
    highlights: ['Platform optimization', 'Growth tactics', 'SEO benefits'],
  },
  {
    title: 'Username Recovery Guide',
    description: 'Lost access to your username? Learn how to recover usernames on different platforms and protect your digital identity.',
    icon: RefreshCw,
    href: '/resources/guides/username-recovery',
    readTime: '6 min read',
    category: 'Account Management',
    difficulty: 'Intermediate',
    color: 'from-red-500 to-red-600',
    highlights: ['Recovery methods', 'Prevention tips', 'Platform policies'],
  }
]

const categories = [
  { name: 'Best Practices', count: 1, icon: CheckCircle2 },
  { name: 'Branding', count: 2, icon: Award },
  { name: 'Personal Branding', count: 1, icon: TrendingUp },
  { name: 'Getting Started', count: 2, icon: Lightbulb },
  { name: 'Social Media', count: 1, icon: Users },
]

export default function GuidesPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Username and Branding Guides",
            "description": "Comprehensive collection of guides for username management and personal branding",
            "url": "https://usernamesearch.io/guides",
            "publisher": {
              "@type": "Organization",
              "name": "UsernameSearch.io",
              "logo": {
                "@type": "ImageObject",
                "url": "https://usernamesearch.io/logo.png"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": guides.map((guide, index) => ({
                "@type": "HowTo",
                "position": index + 1,
                "name": guide.title,
                "description": guide.description,
                "url": `https://usernamesearch.io${guide.href}`,
                "totalTime": `PT${parseInt(guide.readTime)}M`,
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "Username Checker Tool"
                  }
                ],
                "tool": [
                  {
                    "@type": "HowToTool",
                    "name": "UsernameSearch.io Platform"
                  }
                ]
              }))
            }
          })
        }}
      />

      <div className="container mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <BookOpen className="h-3 w-3 mr-1" />
            Expert Guides
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Username & Branding Guides
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the art of username selection and personal branding with our comprehensive guides. 
            From beginners to advanced strategies, we've got you covered.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{guides.length}</div>
              <div className="text-sm text-muted-foreground">Expert Guides</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">60+</div>
              <div className="text-sm text-muted-foreground">Minutes of Content</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Access</div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Badge 
                  key={category.name} 
                  variant="outline" 
                  className="px-4 py-2 text-sm"
                >
                  <Icon className="h-3 w-3 mr-2" />
                  {category.name}
                  <span className="ml-2 text-muted-foreground">{category.count}</span>
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Browse All Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of in-depth guides covering everything from username best practices 
              to advanced personal branding strategies
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => {
              const Icon = guide.icon
              return (
                <Card key={guide.title} className="relative overflow-hidden hover:shadow-xl transition-all group">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${guide.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {guide.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {guide.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {guide.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Highlights */}
                    <div className="space-y-2 mb-4">
                      {guide.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {guide.readTime}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={guide.href}>
                      <Button className="w-full group/btn">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Featured Guide Highlight */}
        <Card className="mb-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4" variant="default">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Most Popular Guide
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Building Your Personal Brand Online
                </h3>
                <p className="text-muted-foreground mb-6">
                  Learn the comprehensive strategy for building a powerful personal brand that 
                  stands out in today's digital landscape. From username selection to content 
                  strategy, this guide covers it all.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    12 min read
                  </Badge>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    50K+ readers
                  </Badge>
                  <Badge variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    Top rated
                  </Badge>
                </div>
                <Link href="/resources/guides/building-your-personal-brand-online">
                  <Button size="lg">
                    Start Reading
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl" />
                  <TrendingUp className="h-48 w-48 text-primary/20 relative" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Read Our Guides */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Read Our Guides?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our guides are crafted by experts to provide actionable insights and practical strategies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Actionable Strategies</h3>
                <p className="text-sm text-muted-foreground">
                  Every guide includes practical steps you can implement immediately
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Expert Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Written by professionals with years of experience in digital branding
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real Examples</h3>
                <p className="text-sm text-muted-foreground">
                  Learn from real-world case studies and successful implementations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Brand?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start by checking your username availability across all platforms. 
            Our free tool helps you secure your brand identity in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tools/username-checker">
                <Search className="mr-2 h-5 w-5" />
                Check Username Availability
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore All Tools
              </Link>
            </Button>
          </div>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does it take to read all guides?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our complete guide collection takes approximately 60 minutes to read through. Each guide is designed to be concise yet comprehensive, ranging from 5 to 12 minutes reading time."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are these guides suitable for beginners?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We have guides for all skill levels. Each guide is clearly marked with a difficulty level (Beginner, Intermediate, or Advanced) to help you choose the right content for your needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need any tools to follow these guides?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most guides can be followed without any special tools. However, having access to our free username checker tool will help you implement the strategies more effectively."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </>
  )
}
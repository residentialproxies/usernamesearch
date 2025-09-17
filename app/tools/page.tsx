import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Search, 
  Sparkles, 
  Building2, 
  CheckCircle2,
  Globe,
  Zap,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Award
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Free Username & Brand Name Tools - Username Checker, Generator & More',
  description: 'Powerful free tools for username and brand name management. Check username availability on 520+ sites, generate unique usernames, create brand names, and access the WhatsMyName app. All tools 100% free.',
  keywords: 'username tools, username checker, username generator, brand name generator, whatsmyname app, free username tools, social media username checker, brand name tools, username availability checker, online username tools',
  openGraph: {
    title: 'Free Username & Brand Tools - Check, Generate, Create | UsernameSearch.io',
    description: 'Access powerful free tools for username and brand management. Check availability on 520+ platforms, generate unique usernames, create memorable brand names.',
    url: 'https://usernamesearch.io/tools',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'Username and Brand Name Tools Collection',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Username & Brand Tools Collection',
    description: 'Check availability, generate usernames, create brand names - all free tools in one place',
    images: ['https://usernamesearch.io/twitter-tools.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/tools',
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

const tools = [
  {
    title: 'Username Checker',
    description: 'Check username availability across 520+ social media platforms and websites instantly. Get real-time results with our most popular tool.',
    icon: Search,
    href: '/tools/username-checker',
    features: ['520+ platforms', 'Real-time checking', 'Instant results', 'Free to use'],
    badge: 'Most Popular',
    color: 'from-blue-500 to-blue-600',
    stats: { users: '1M+', accuracy: '99.9%' }
  },
  {
    title: 'Username Generator',
    description: 'AI-powered username generator that creates unique, memorable usernames based on your preferences and interests.',
    icon: Sparkles,
    href: '/tools/username-generator',
    features: ['AI-powered', 'Multiple styles', 'Platform-specific', 'Customizable'],
    badge: 'AI Powered',
    color: 'from-purple-500 to-purple-600',
    stats: { generated: '5M+', styles: '20+' }
  },
  {
    title: 'Brand Name Generator',
    description: 'Generate creative, memorable brand names for your business or project. Perfect for startups and entrepreneurs.',
    icon: Building2,
    href: '/tools/brand-name-generator',
    features: ['Business focused', 'Domain check', 'Industry specific', 'Trademark friendly'],
    badge: 'Business Tool',
    color: 'from-green-500 to-green-600',
    stats: { brands: '500K+', industries: '50+' }
  },
  {
    title: 'WhatsMyName App',
    description: 'The original WhatsMyName tool - check username availability across the entire internet with one search.',
    icon: Globe,
    href: '/whatsmyname',
    features: ['Complete coverage', 'Fast results', 'Direct links', 'Export results'],
    badge: 'Original',
    color: 'from-orange-500 to-orange-600',
    stats: { sites: '520+', searches: '10M+' }
  }
]

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant results across all platforms'
  },
  {
    icon: Shield,
    title: '100% Free',
    description: 'All tools completely free to use'
  },
  {
    icon: Award,
    title: 'Highly Accurate',
    description: '99.9% accuracy rate on all checks'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Check multiple platforms at once'
  }
]

export default function ToolsPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Username and Brand Name Tools",
            "description": "Collection of free tools for username and brand name management",
            "url": "https://usernamesearch.io/tools",
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
              "itemListElement": tools.map((tool, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": tool.title,
                "description": tool.description,
                "url": `https://usernamesearch.io${tool.href}`,
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }))
            }
          })
        }}
      />

      <div className="container mx-auto py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Free Tools Collection
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Username & Brand Name Tools
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Professional tools to help you create, check, and manage your digital identity across the internet. 
            All tools are 100% free and require no registration.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">10M+</div>
              <div className="text-sm text-muted-foreground">Searches Completed</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">520+</div>
              <div className="text-sm text-muted-foreground">Platforms Checked</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Free Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of powerful tools designed to help you establish and manage your online presence
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <Card key={tool.title} className="relative overflow-hidden hover:shadow-xl transition-all group">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  
                  {tool.badge && (
                    <Badge className="absolute top-4 right-4 z-10" variant="secondary">
                      {tool.badge}
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{tool.title}</CardTitle>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      {tool.stats && Object.entries(tool.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{value}</span>
                          <span className="text-muted-foreground capitalize">{key}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href={tool.href}>
                      <Button className="w-full group/btn">
                        Try {tool.title}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16 py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools that deliver results without the premium price tag
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 px-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="text-center">
                  <div className="inline-flex p-3 rounded-lg bg-background shadow-sm mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join millions of users who trust our tools to manage their online identity. 
            No signup required - start using any tool instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tools/username-checker">
                <Search className="mr-2 h-5 w-5" />
                Check Username Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">
                <Star className="mr-2 h-5 w-5" />
                Unlock Pro Features
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
                  "name": "Are all these tools really free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! All our tools are 100% free to use. We offer a Pro plan with additional features like unlimited searches and API access, but the core functionality of all tools is free forever."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate is the username checker?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our username checker has a 99.9% accuracy rate. We check directly with each platform in real-time to ensure the most up-to-date availability status."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to create an account to use these tools?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No account required! All our tools can be used instantly without any registration. Just visit the tool page and start using it right away."
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
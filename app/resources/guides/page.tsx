import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Clock, 
  ArrowRight,
  User,
  Target,
  RefreshCw,
  Shield
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Username Guides & Resources | UsernameSearch.io',
  description: 'Expert guides on choosing the perfect username, building your online brand, and managing your digital identity across platforms.',
  keywords: 'username guide, online branding, digital identity, username tips, social media username',
  openGraph: {
    title: 'Username Guides & Resources',
    description: 'Expert guides for creating and managing your online username',
    url: 'https://usernamesearch.io/resources/guides',
  },
}

const guides = [
  {
    slug: 'perfect-username',
    title: 'How to Choose the Perfect Username in 2025',
    description: 'The complete guide to creating a memorable, unique username that works across all platforms. Learn the dos and don\'ts of username creation.',
    icon: User,
    readTime: '10 min read',
    category: 'Getting Started',
    topics: ['Username Tips', 'Best Practices', 'Common Mistakes'],
    featured: true
  },
  {
    slug: 'brand-consistency',
    title: 'Username Availability: Complete Guide to Claiming Your Brand',
    description: 'Master the art of brand consistency across social media. Learn strategies for securing your username on all major platforms.',
    icon: Target,
    readTime: '12 min read',
    category: 'Branding',
    topics: ['Brand Strategy', 'Platform Management', 'Case Studies']
  },
  {
    slug: 'username-recovery',
    title: 'Username Recovery Guide: How to Reclaim Lost or Inactive Usernames',
    description: 'Learn proven strategies to recover inactive usernames, negotiate with current holders, and navigate platform-specific recovery processes.',
    icon: RefreshCw,
    readTime: '15 min read',
    category: 'Advanced',
    topics: ['Recovery Methods', 'Platform Policies', 'Negotiation Tips']
  },
  {
    slug: 'username-security',
    title: 'Username Security & Privacy: Protecting Your Digital Identity',
    description: 'Essential guide to securing your usernames, preventing identity theft, and maintaining privacy across multiple online identities.',
    icon: Shield,
    readTime: '12 min read',
    category: 'Security',
    topics: ['Privacy Protection', 'Identity Security', 'Best Practices']
  }
]

export default function GuidesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Username Guides & Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Expert advice and comprehensive guides to help you create, manage, and protect 
          your online identity across the digital landscape.
        </p>
      </div>

      {/* Featured Guide */}
      {guides.filter(g => g.featured).map(guide => {
        const Icon = guide.icon
        return (
          <Card key={guide.slug} className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge className="mb-2">Featured Guide</Badge>
                    <CardTitle className="text-2xl">{guide.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {guide.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {guide.readTime}
                </div>
                <div className="flex gap-2">
                  {guide.topics.map(topic => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                </div>
                <Button asChild className="ml-auto">
                  <Link href={`/resources/guides/${guide.slug}`}>
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* All Guides Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {guides.filter(g => !g.featured).map(guide => {
          const Icon = guide.icon
          return (
            <Card key={guide.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">{guide.category}</Badge>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {guide.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {guide.readTime}
                  </div>
                  <Button variant="ghost" asChild>
                    <Link href={`/resources/guides/${guide.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Claim Your Username?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our powerful tools to check username availability across 1500+ platforms 
            and secure your digital identity today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">Check Username</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools/username-generator">Generate Ideas</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import Link from 'next/link'
import { Search, Sparkles, Building2, Shield, Zap, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ToolsPage() {
  const tools = [
    {
      title: 'Username Checker',
      description: 'Advanced username availability checker with Pro features and 400+ platforms',
      icon: Search,
      href: '/tools/username-checker',
      features: ['400+ platforms', 'Real-time checking', 'Bulk search', 'Export results'],
      badge: 'Most Popular',
    },
    {
      title: 'Username Generator',
      description: 'AI-powered username generator that creates unique, memorable usernames',
      icon: Sparkles,
      href: '/tools/username-generator',
      features: ['AI-powered', 'Multiple styles', 'Platform-specific', 'Instant generation'],
      badge: 'AI Powered',
    },
    {
      title: 'Brand Name Generator',
      description: 'Generate creative brand names for your business or project',
      icon: Building2,
      href: '/tools/brand-name-generator',
      features: ['Business focused', 'Domain check', 'Trademark friendly', 'Industry specific'],
      badge: 'New',
    },
  ]

  const upcomingTools = [
    {
      title: 'Social Media Audit',
      description: 'Analyze your social media presence across all platforms',
      icon: Shield,
    },
    {
      title: 'Username Monitor',
      description: 'Get alerts when your desired username becomes available',
      icon: Zap,
    },
    {
      title: 'Domain Checker',
      description: 'Check domain availability with TLD suggestions',
      icon: Globe,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Free Username Tools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful tools to help you create and manage your online identity across the web
        </p>
      </div>

      {/* Available Tools */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Available Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.title} href={tool.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden">
                  {tool.badge && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                        {tool.badge}
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{tool.description}</CardDescription>
                    <div className="space-y-1">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Coming Soon */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.title} className="h-full opacity-60">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground italic">In Development</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need More Advanced Features?</h2>
        <p className="text-muted-foreground mb-6">
          Upgrade to Pro for unlimited searches, API access, bulk checking, and priority support
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          View Pricing Plans
        </Link>
      </div>
    </div>
  )
}
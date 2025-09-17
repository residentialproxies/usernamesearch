import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Target,
  Award,
  Heart,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About UsernameSearch.io - The Most Comprehensive Username Checker',
  description: 'Learn about UsernameSearch.io, the leading username availability checker supporting 1500+ platforms. Our mission, technology, and commitment to helping you secure your digital identity.',
  keywords: 'about usernamesearch, username checker company, username availability tool, digital identity platform',
}

export default function AboutPage() {
  const stats = [
    { value: '1500+', label: 'Platforms Supported' },
    { value: '1M+', label: 'Usernames Checked' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Monitoring' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'We never store or share your search data. Your digital identity searches remain completely private.'
    },
    {
      icon: Zap,
      title: 'Speed & Accuracy',
      description: 'Real-time checking across 1500+ platforms with industry-leading accuracy and response times.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Built by creators for creators. We understand the importance of consistent online presence.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description: 'Constantly adding new platforms and features based on user feedback and market trends.'
    }
  ]

  const timeline = [
    {
      year: '2023',
      title: 'The Beginning',
      description: 'Started with a simple idea: make username checking fast and comprehensive.'
    },
    {
      year: '2024 Q1',
      title: 'WhatsMyName Integration',
      description: 'Integrated with the WhatsMyName API to support 1500+ platforms.'
    },
    {
      year: '2024 Q2',
      title: 'AI-Powered Features',
      description: 'Launched AI username generator and brand name creator.'
    },
    {
      year: '2024 Q3',
      title: 'API Launch',
      description: 'Released public API for developers and businesses.'
    },
    {
      year: 'Future',
      title: 'What\'s Next',
      description: 'Mobile app, browser extension, and team collaboration features.'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Search className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">About UsernameSearch.io</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to help everyone secure their perfect digital identity 
          across the internet's ever-expanding landscape of platforms.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <Card>
            <CardContent className="pt-8 pb-8">
              <p className="text-lg leading-relaxed mb-4">
                UsernameSearch.io was born from a simple frustration: checking username 
                availability across multiple platforms was tedious, time-consuming, and 
                often incomplete. As digital creators ourselves, we knew there had to be 
                a better way.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                We started by building a tool that we wanted to use - one that was fast, 
                comprehensive, and respectful of user privacy. By integrating with the 
                powerful WhatsMyName API and adding our own optimization layer, we created 
                the most comprehensive username checker available.
              </p>
              <p className="text-lg leading-relaxed">
                Today, UsernameSearch.io helps thousands of individuals, creators, and 
                businesses secure their digital identity across 1500+ platforms. We're 
                proud to be part of your journey in building a consistent online presence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Technology */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
                <p className="text-muted-foreground mb-6">
                  We leverage cutting-edge technology to deliver the fastest and most 
                  accurate username checking service available.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>WhatsMyName API integration for 1500+ platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Real-time availability checking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>AI-powered username generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced caching for instant results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Enterprise-grade security and privacy</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-24 w-24 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">Global Coverage</p>
                  <p className="text-muted-foreground">
                    Supporting platforms in 50+ countries and 30+ languages
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-semibold text-primary">{item.year}</span>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Built by Creators, for Creators</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team consists of developers, designers, and digital creators who 
                understand the challenges of building an online presence. We're passionate 
                about helping others succeed in the digital world.
              </p>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm">Passionate Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">Industry Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">User Focused</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Username?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of creators who trust UsernameSearch.io to help them 
              build a consistent online presence across all platforms.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/">
                  Check Username Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
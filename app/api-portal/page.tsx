'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Code2, 
  Zap, 
  Shield, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Terminal,
  Gauge,
  Lock
} from 'lucide-react'

export default function APIPortalPage() {
  const features = [
    {
      icon: Globe,
      title: '1500+ Platforms',
      description: 'Check username availability across all major social media and web platforms'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get results in seconds with our optimized parallel checking system'
    },
    {
      icon: Shield,
      title: 'Reliable & Secure',
      description: 'Enterprise-grade reliability with 99.9% uptime SLA'
    },
    {
      icon: Gauge,
      title: 'Rate Limiting',
      description: 'Generous rate limits with burst capacity for peak usage'
    }
  ]
  
  const endpoints = [
    {
      method: 'POST',
      path: '/api/check-pro',
      description: 'Check username availability',
      auth: true
    },
    {
      method: 'POST',
      path: '/api/check-pro/bulk',
      description: 'Bulk username checking (up to 10)',
      auth: true
    },
    {
      method: 'GET',
      path: '/api/check-pro/stats',
      description: 'Get API usage statistics',
      auth: true
    },
    {
      method: 'GET',
      path: '/api/sites',
      description: 'List all supported platforms',
      auth: false
    }
  ]
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <Code2 className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Username Search API
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Integrate username availability checking into your application with our powerful, 
          reliable API. Perfect for user registration flows, brand monitoring, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/api-portal/docs">
              View Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">Get API Key</Link>
          </Button>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card key={feature.title}>
              <CardHeader>
                <Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      {/* API Endpoints */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">API Endpoints</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Endpoint</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Auth</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((endpoint, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-sm">{endpoint.path}</td>
                    <td className="p-4 text-sm">{endpoint.description}</td>
                    <td className="p-4">
                      {endpoint.auth ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <span className="text-sm text-muted-foreground">Public</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      {/* Code Example */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Start</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Example Request
            </CardTitle>
            <CardDescription>
              Check username availability with a simple POST request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`curl -X POST https://usernamesearch.io/api/check-pro \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{
    "username": "johndoe",
    "categories": ["social", "gaming"],
    "includeUnavailable": false
  }'`}</code>
              </pre>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Response:</p>
              <div className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
                  <code>{`{
  "success": true,
  "results": [
    {
      "username": "johndoe",
      "results": [
        {
          "platform": "Instagram",
          "available": false,
          "url": "https://instagram.com/johndoe"
        },
        {
          "platform": "GitHub",
          "available": true,
          "url": "https://github.com/johndoe"
        }
      ],
      "stats": {
        "totalChecked": 85,
        "totalAvailable": 42,
        "totalTaken": 43
      }
    }
  ],
  "usage": {
    "requestCount": 1,
    "remainingCredits": 499
  }
}`}</code>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Pricing CTA */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get your API key today and start integrating username checking into your application. 
            Only $10 for 500 API requests with no expiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Get API Key</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/api-portal/docs">Read Documentation</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
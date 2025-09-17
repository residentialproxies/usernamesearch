'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Code, 
  Copy, 
  Check,
  Terminal,
  BookOpen,
  Key,
  Zap,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [apiDocs, setApiDocs] = useState<any>(null)

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setApiDocs(data))
  }, [])

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  if (!apiDocs) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading API documentation...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Code className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">{apiDocs.title}</h1>
        <p className="text-lg text-muted-foreground">
          Powerful API for checking username availability across 520+ platforms
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Badge variant="outline" className="px-3 py-1">
            Version {apiDocs.version}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            RESTful API
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {apiDocs.rateLimit.requests} requests per key
          </Badge>
        </div>
      </div>

      {/* Quick Start */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Get your API Key</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Purchase an API key to access all endpoints. Each key includes {apiDocs.rateLimit.requests} requests.
            </p>
            <Button asChild>
              <Link href="/pricing">
                <Key className="mr-2 h-4 w-4" />
                Get API Key
              </Link>
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Make your first request</h3>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{apiDocs.codeExamples.curl}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(apiDocs.codeExamples.curl, 'curl')}
              >
                {copiedCode === 'curl' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              <strong>Header:</strong> {apiDocs.authentication.header}<br />
              <strong>Format:</strong> Your API key string<br />
              {apiDocs.authentication.description}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API Endpoints
          </CardTitle>
          <CardDescription>
            Base URL: <code className="text-primary">{apiDocs.baseUrl}</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {apiDocs.endpoints.map((endpoint: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>{endpoint.method}</Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </div>
                </div>

                {/* Parameters */}
                {endpoint.parameters && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Parameters</h4>
                    <div className="bg-muted rounded-lg p-3 space-y-2">
                      {Object.entries(endpoint.parameters).map(([key, param]: [string, any]) => (
                        <div key={key} className="text-sm">
                          <code className="font-mono">{key}</code>
                          {param.required && <Badge variant="destructive" className="ml-2 text-xs">Required</Badge>}
                          <span className="text-muted-foreground ml-2">({param.type})</span>
                          <p className="text-xs text-muted-foreground mt-1">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example */}
                {endpoint.example && (
                  <Tabs defaultValue="request" className="mt-4">
                    <TabsList>
                      <TabsTrigger value="request">Request</TabsTrigger>
                      <TabsTrigger value="response">Response</TabsTrigger>
                    </TabsList>
                    <TabsContent value="request">
                      <div className="relative">
                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                          <code>{JSON.stringify(endpoint.example.request, null, 2)}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.example.request, null, 2), `req-${index}`)}
                        >
                          {copiedCode === `req-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="response">
                      <div className="relative">
                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-xs">
                          <code>{JSON.stringify(endpoint.example.response, null, 2)}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(JSON.stringify(endpoint.example.response, null, 2), `res-${index}`)}
                        >
                          {copiedCode === `res-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Code Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{apiDocs.codeExamples.javascript}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(apiDocs.codeExamples.javascript, 'js')}
                >
                  {copiedCode === 'js' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="python">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{apiDocs.codeExamples.python}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(apiDocs.codeExamples.python, 'py')}
                >
                  {copiedCode === 'py' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="curl">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{apiDocs.codeExamples.curl}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(apiDocs.codeExamples.curl, 'curl2')}
                >
                  {copiedCode === 'curl2' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Error Codes */}
      <Card>
        <CardHeader>
          <CardTitle>Error Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiDocs.errors.map((error: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant={error.code >= 400 && error.code < 500 ? 'destructive' : 'secondary'}>
                  {error.code}
                </Badge>
                <div>
                  <p className="font-medium text-sm">{error.message}</p>
                  <p className="text-sm text-muted-foreground">{error.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
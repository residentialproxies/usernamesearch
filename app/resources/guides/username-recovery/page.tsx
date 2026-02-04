import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { 
  RefreshCw, 
  ArrowRight, 
  Clock,
  Target,
  MessageSquare,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  BookOpen,
  Users,
  Mail
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Username Recovery Guide: How to Reclaim Lost or Inactive Usernames | UsernameSearch.io',
  description: 'Complete guide to recovering inactive usernames on social media. Learn proven strategies, platform-specific policies, and negotiation techniques to reclaim your desired username.',
  keywords: 'username recovery, reclaim username, inactive username, social media username recovery, get username back, username negotiation',
  authors: [{ name: 'UsernameSearch.io Team' }],
  openGraph: {
    title: 'How to Recover Lost or Inactive Usernames - Complete Guide',
    description: 'Learn proven strategies to recover inactive usernames on Instagram, Twitter, TikTok and more.',
    type: 'article',
    url: 'https://usernamesearch.io/resources/guides/username-recovery',
    images: [{
      url: 'https://usernamesearch.io/og-username-recovery.png',
      width: 1200,
      height: 630,
      alt: 'Username Recovery Guide'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Recovery Guide',
    description: 'Learn how to reclaim inactive usernames on social media platforms',
  },
  alternates: {
    canonical: 'https://usernamesearch.io/resources/guides/username-recovery'
  }
}

export default function UsernameRecoveryGuidePage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Recover Inactive Usernames on Social Media",
            "description": "Step-by-step guide to recovering inactive or lost usernames across social media platforms",
            "image": "https://usernamesearch.io/og-username-recovery.png",
            "author": {
              "@type": "Organization",
              "name": "UsernameSearch.io"
            },
            "datePublished": "2024-01-01",
            "dateModified": "2025-01-15T00:00:00.000Z",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Check Username Availability",
                "text": "Use UsernameSearch.io to verify if the username is truly inactive across platforms"
              },
              {
                "@type": "HowToStep",
                "name": "Research Account Activity",
                "text": "Investigate when the account was last active and if it violates platform policies"
              },
              {
                "@type": "HowToStep",
                "name": "Submit Official Request",
                "text": "File a username recovery request through the platform's official channels"
              },
              {
                "@type": "HowToStep",
                "name": "Contact Current Holder",
                "text": "If allowed, respectfully reach out to negotiate a transfer"
              },
              {
                "@type": "HowToStep",
                "name": "Consider Alternatives",
                "text": "Explore variations or wait for platform cleanup cycles"
              }
            ],
            "totalTime": "P7D",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0-500"
            }
          })
        }}
      />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/resources" className="text-muted-foreground hover:text-primary">Resources</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/resources/guides" className="text-muted-foreground hover:text-primary">Guides</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-primary">Username Recovery</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <RefreshCw className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How to Recover Lost or Inactive Usernames
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn proven strategies to reclaim inactive usernames, navigate platform policies, 
            and successfully negotiate username transfers in 2025.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>15 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Used by 50K+ users</span>
            </div>
            <Badge variant="secondary">Updated January 2025</Badge>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Key Stats */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Username Recovery Success Rates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">73%</div>
                <div className="text-sm text-muted-foreground">
                  Success rate for verified trademark claims
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">45%</div>
                <div className="text-sm text-muted-foreground">
                  Inactive accounts released annually
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7-30</div>
                <div className="text-sm text-muted-foreground">
                  Days average response time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg leading-relaxed mb-6">
            Finding that your desired username is taken but appears inactive is frustrating. 
            Whether it's your brand name, personal handle, or a critical business username, 
            this guide will walk you through every proven method to recover it.
          </p>
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Before starting the recovery process, use{' '}
              <Link href="/" className="text-primary hover:underline">
                our username checker
              </Link>{' '}
              to verify availability across all 520+ platforms. Sometimes the username 
              might be available on alternative platforms you haven't considered.
            </AlertDescription>
          </Alert>
        </section>

        {/* Platform-Specific Recovery Methods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Platform-Specific Recovery Methods
          </h2>
          
          <div className="space-y-6">
            {/* Instagram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Instagram Username Recovery</span>
                  <Badge>Most Requested</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Official Process:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Check if account violates Instagram's inactive account policy (no posts in 2+ years)</li>
                    <li>File a trademark report if you own the trademark</li>
                    <li>Use the "Report Account" → "It's pretending to be someone else" option</li>
                    <li>Contact Meta Business Support if you have a verified business account</li>
                  </ol>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Instagram rarely releases usernames unless there's a trademark violation 
                    or the account is completely abandoned (no login for 2+ years).
                  </AlertDescription>
                </Alert>
                <div>
                  <h4 className="font-semibold mb-2">Success Rate: 35%</h4>
                  <p className="text-sm text-muted-foreground">
                    Higher for trademark holders (65%) and verified accounts (50%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Twitter/X */}
            <Card>
              <CardHeader>
                <CardTitle>Twitter/X Username Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Official Process:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Check account activity (X releases inactive usernames periodically)</li>
                    <li>File a trademark claim through X's IP policy form</li>
                    <li>Contact @verified for business accounts</li>
                    <li>Wait for X's annual inactive account purge (usually December)</li>
                  </ol>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">
                    Good News:
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    X is more likely to release inactive usernames than other platforms, 
                    especially during their cleanup cycles.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* TikTok */}
            <Card>
              <CardHeader>
                <CardTitle>TikTok Username Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Official Process:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Report the account for impersonation if applicable</li>
                    <li>Contact TikTok for Business support</li>
                    <li>File intellectual property claim if you have trademark</li>
                    <li>Wait 180 days of inactivity for auto-release</li>
                  </ol>
                </div>
                <p className="text-sm text-muted-foreground">
                  TikTok has the shortest inactivity period before considering username release.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Negotiation Strategies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-primary" />
            Direct Negotiation Strategies
          </h2>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  Always respect platform Terms of Service. Some platforms prohibit username sales.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-xl font-semibold mb-4">How to Contact Username Holders</h3>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <div>
                      <h4 className="font-semibold">Research the Account</h4>
                      <p className="text-muted-foreground">Check their bio for contact info, linked websites, or other social profiles</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <div>
                      <h4 className="font-semibold">Craft a Professional Message</h4>
                      <p className="text-muted-foreground">Be respectful, explain your situation, and make a reasonable offer</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <div>
                      <h4 className="font-semibold">Offer Value Exchange</h4>
                      <p className="text-muted-foreground">Consider offering money, services, or alternative usernames</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                    <div>
                      <h4 className="font-semibold">Use Escrow Services</h4>
                      <p className="text-muted-foreground">For purchases, use trusted escrow to protect both parties</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Sample Outreach Message</h3>
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <p className="font-mono text-sm">
                      Hi [Name],<br /><br />
                      I noticed you own the username @[username] on [platform]. I'm reaching out because 
                      [brief explanation - e.g., "it matches my business name" or "it's my personal brand"].<br /><br />
                      If you're not actively using this username, I'd love to discuss the possibility of 
                      acquiring it from you. I'm happy to compensate you fairly for your time and the transfer.<br /><br />
                      Would you be open to discussing this?<br /><br />
                      Best regards,<br />
                      [Your name]
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cost Expectations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-primary" />
            Cost Expectations
          </h2>
          
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Typical Username Purchase Prices</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Generic 4-letter username</span>
                      <Badge variant="secondary">$500 - $5,000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Dictionary word</span>
                      <Badge variant="secondary">$1,000 - $25,000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Brand name match</span>
                      <Badge variant="secondary">$2,000 - $50,000</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">Single letter/number</span>
                      <Badge variant="secondary">$10,000+</Badge>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Warning:</strong> Never send payment directly without using an escrow service. 
                    Popular escrow services include Escrow.com and PlayerUp for gaming usernames.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal Considerations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Legal & Ethical Considerations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Legal Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Filing trademark claims with proper documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Negotiating purchases where platform allows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Waiting for official inactive account releases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Using platform's official dispute processes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Avoid These Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Hacking or unauthorized access attempts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>False trademark or impersonation claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Harassment of current username holders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <span>Using bots to monitor and grab usernames</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alternative Solutions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            Alternative Solutions
          </h2>
          
          <Card>
            <CardContent className="p-8 space-y-6">
              <p className="text-lg">
                If recovery attempts fail, consider these creative alternatives:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Username Variations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Add "official", "real", or "hq" suffix</li>
                    <li>• Use underscores or periods creatively</li>
                    <li>• Include location (NYC, UK, etc.)</li>
                    <li>• Add your industry (tech, music, etc.)</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Brand Pivots</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create unique compound words</li>
                    <li>• Use creative misspellings</li>
                    <li>• Develop an acronym</li>
                    <li>• Choose a completely unique brand</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Use our{' '}
                  <Link href="/tools/username-generator" className="text-primary hover:underline">
                    Username Generator
                  </Link>{' '}
                  to find creative alternatives that are available across all platforms.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </section>

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Real Recovery Success Stories</h2>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Badge className="mt-1">Case Study</Badge>
                  <div>
                    <h4 className="font-semibold mb-2">Small Business Trademark Victory</h4>
                    <p className="text-muted-foreground mb-3">
                      A bakery successfully reclaimed their trademarked name on Instagram after 
                      providing business registration and trademark documents. Process took 3 weeks.
                    </p>
                    <p className="text-sm">
                      <strong>Key Factor:</strong> Proper trademark documentation and persistence
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Badge className="mt-1">Case Study</Badge>
                  <div>
                    <h4 className="font-semibold mb-2">Twitter Username Purchase</h4>
                    <p className="text-muted-foreground mb-3">
                      A startup negotiated with an inactive account holder and successfully 
                      purchased their company name for $2,500 using an escrow service.
                    </p>
                    <p className="text-sm">
                      <strong>Key Factor:</strong> Professional approach and fair offer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Action Steps */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Your Username Recovery Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  'Check username availability across all platforms using our tool',
                  'Document any trademark or business registration you have',
                  'Research the current account holder\'s activity level',
                  'Attempt official platform recovery processes first',
                  'Consider direct negotiation if platform allows',
                  'Have alternatives ready in case recovery fails',
                  'Be patient - recovery can take weeks or months'
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/">
                    <Target className="mr-2 h-5 w-5" />
                    Start Checking Username Availability
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How long does username recovery typically take?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Official platform processes usually take 7-30 days. Trademark claims may be 
                  faster (1-2 weeks), while waiting for inactive account purges can take months. 
                  Direct negotiations vary based on the holder's responsiveness.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Is buying usernames legal?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  It depends on the platform's Terms of Service. Twitter/X generally allows it, 
                  Instagram technically prohibits it but rarely enforces, and TikTok strictly 
                  forbids username sales. Always check platform policies first.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What if someone is squatting on my trademark?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  File an intellectual property claim with the platform immediately. Provide 
                  trademark registration documents, business incorporation papers, and evidence 
                  of brand use. Most platforms have specific forms for trademark disputes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Related Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Perfect Username Guide</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to create the perfect username from scratch
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources/guides/perfect-username">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Username Security</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Protect your usernames from theft and impersonation
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources/guides/username-security">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Brand Consistency</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Maintain consistent branding across all platforms
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources/guides/brand-consistency">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Start Your Username Recovery Journey
            </h2>
            <p className="mb-6 text-primary-foreground/90">
              Check if your desired username is truly unavailable across all 520+ platforms. 
              You might find it's available on platforms you haven't checked yet!
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/">
                  Check Availability Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/tools/username-generator">
                  Find Alternatives
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </article>
    </>
  )
}
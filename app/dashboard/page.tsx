'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Search, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  Settings,
  Key,
  Copy,
  RefreshCw,
  Shield,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  User,
  CreditCard,
  Activity,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface UserData {
  email: string
  name?: string
  plan: 'free' | 'pro' | 'enterprise'
  apiKey?: string
  credits: number
  usedCredits: number
  searchHistory: SearchRecord[]
}

interface SearchRecord {
  username: string
  timestamp: string
  platformsChecked: number
  available: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session?.user) {
      router.push('/login')
      return
    }

    // Basic profile derived from session; credits placeholder
    setUserData({
      email: session.user.email || 'unknown@example.com',
      name: session.user.name || undefined,
      plan: (session.user as any).plan || 'free',
      apiKey: undefined,
      credits: 10,
      usedCredits: 0,
      searchHistory: [],
    })
    setLoading(false)
  }, [router, session, status])

  const copyApiKey = () => {
    if (userData?.apiKey) {
      navigator.clipboard.writeText(userData.apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const generateApiKey = async () => {
    // API key generation logic
    alert('API key generation requires Pro plan')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const creditUsagePercentage = (userData.usedCredits / userData.credits) * 100

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userData.name || userData.email}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Account Plan
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{userData.plan}</div>
            {userData.plan === 'free' && (
              <Button size="sm" variant="link" className="px-0 mt-1" asChild>
                <Link href="/pricing">
                  Upgrade <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              API Credits
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userData.credits - userData.usedCredits}/{userData.credits}
            </div>
            <Progress value={creditUsagePercentage} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Searches
            </CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.searchHistory.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Avg. availability
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Search History */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>
                Your recent username availability checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userData.searchHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No searches yet</p>
                  <Button asChild>
                    <Link href="/">
                      Start Searching <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.searchHistory.map((search, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{search.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(search.timestamp).toLocaleDateString()} • 
                            {search.platformsChecked} platforms checked
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {search.available}/{search.platformsChecked}
                        </p>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/">
                    <Search className="mr-2 h-4 w-4" />
                    Check Username
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/tools/username-generator">
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Username
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/tools/username-checker">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Advanced Checker
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/api">
                    <Key className="mr-2 h-4 w-4" />
                    API Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* API Key */}
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Your API key for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userData.plan === 'free' ? (
                <div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Upgrade to Pro to get API access
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full mt-4" asChild>
                    <Link href="/pricing">
                      Upgrade to Pro
                    </Link>
                  </Button>
                </div>
              ) : userData.apiKey ? (
                <div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-muted rounded text-xs truncate">
                      {userData.apiKey}
                    </code>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={copyApiKey}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="px-0 mt-2"
                    asChild
                  >
                    <Link href="/api">
                      View Documentation <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate an API key to access our service programmatically
                  </p>
                  <Button onClick={generateApiKey} className="w-full">
                    Generate API Key
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Your account activity this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">API Calls</span>
                </div>
                <span className="text-sm font-medium">{userData.usedCredits}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Searches</span>
                </div>
                <span className="text-sm font-medium">{userData.searchHistory.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last Active</span>
                </div>
                <span className="text-sm font-medium">Today</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/pricing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing & Plans
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-600"
                onClick={() => {
                  fetch('/api/auth/logout', { method: 'POST' })
                    .then(() => router.push('/'))
                }}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

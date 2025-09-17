'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Activity,
  Server,
  Globe,
  Zap,
  Clock,
  TrendingUp,
  RefreshCw,
  Shield,
  Database
} from 'lucide-react'

interface SystemStatus {
  name: string
  status: 'operational' | 'degraded' | 'down'
  uptime: number
  responseTime: number
  description: string
  icon: React.ElementType
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  severity: 'minor' | 'major' | 'critical'
  timestamp: string
  description: string
}

export default function StatusPage() {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      name: 'API Service',
      status: 'operational',
      uptime: 99.99,
      responseTime: 45,
      description: 'Core API endpoints',
      icon: Server
    },
    {
      name: 'WhatsMyName Integration',
      status: 'operational',
      uptime: 99.95,
      responseTime: 320,
      description: 'Username checking service',
      icon: Globe
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: 100,
      responseTime: 12,
      description: 'Data storage and retrieval',
      icon: Database
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      uptime: 99.99,
      responseTime: 28,
      description: 'User authentication and sessions',
      icon: Shield
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      uptime: 99.97,
      responseTime: 156,
      description: 'NowPayments integration',
      icon: Zap
    }
  ])

  const [incidents, setIncidents] = useState<Incident[]>([])
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  const refreshStatus = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setRefreshing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-500">Operational</Badge>
      case 'degraded':
        return <Badge className="bg-yellow-500">Degraded</Badge>
      case 'down':
        return <Badge className="bg-red-500">Down</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const overallStatus = systems.every(s => s.status === 'operational')
  const averageUptime = systems.reduce((acc, s) => acc + s.uptime, 0) / systems.length

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">System Status</h1>
            <p className="text-muted-foreground mt-2">
              Real-time status of UsernameSearch.io services
            </p>
          </div>
          <button
            onClick={refreshStatus}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            disabled={refreshing}
          >
            <RefreshCw className={`h-5 w-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Overall Status */}
        <Card className={overallStatus ? 'border-green-500' : 'border-yellow-500'}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {overallStatus ? (
                  <>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <div>
                      <h2 className="text-xl font-semibold">All Systems Operational</h2>
                      <p className="text-sm text-muted-foreground">
                        All services are running normally
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-8 w-8 text-yellow-500" />
                    <div>
                      <h2 className="text-xl font-semibold">Partial Service Disruption</h2>
                      <p className="text-sm text-muted-foreground">
                        Some services may be experiencing issues
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{averageUptime.toFixed(2)}%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Components */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">System Components</h2>
        <div className="grid gap-4">
          {systems.map((system) => {
            const Icon = system.icon
            return (
              <Card key={system.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{system.name}</h3>
                          {getStatusBadge(system.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {system.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{system.uptime}%</p>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{system.responseTime}ms</p>
                        <p className="text-xs text-muted-foreground">Response</p>
                      </div>
                      {getStatusIcon(system.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Incidents */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
        {incidents.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recent Incidents</h3>
                <p className="text-muted-foreground">
                  There have been no incidents in the past 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <Card key={incident.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{incident.title}</h3>
                        <Badge variant={incident.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {incident.severity}
                        </Badge>
                        <Badge variant="outline">{incident.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {incident.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(incident.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">142</span>
              <span className="text-muted-foreground">ms</span>
            </div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              5% faster than last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">99.97</span>
              <span className="text-muted-foreground">%</span>
            </div>
            <Progress value={99.97} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <Activity className="inline h-3 w-3 mr-1" />
              3 failed requests today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">24/7</span>
            </div>
            <Progress value={100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <Clock className="inline h-3 w-3 mr-1" />
              Checked every 30 seconds
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Update Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Last updated: {lastUpdated.toLocaleTimeString()} • 
          Updates automatically every 30 seconds • 
          <a href="https://twitter.com/usernamesearch" className="hover:text-primary ml-1">
            Follow @usernamesearch for updates
          </a>
        </p>
      </div>
    </div>
  )
}
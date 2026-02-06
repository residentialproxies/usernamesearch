'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, LogIn, Sparkles } from 'lucide-react'

const providers = [
  { id: 'google', name: 'Google', icon: Sparkles },
]

export default function LoginPage() {
  const handleOauth = async (provider: string) => {
    // NextAuth handles redirect; show a minimal loader via button state
    await signIn(provider, { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in with Google to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map(({ id, name, icon: Icon }) => (
            <Button
              key={id}
              className="w-full"
              variant={id === 'google' ? 'default' : 'outline'}
              onClick={() => handleOauth(id)}
            >
              <Icon className="h-4 w-4 mr-2" />
              Continue with {name}
            </Button>
          ))}

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            We never ask for your password. OAuth only.
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>New here? <Link href="/signup" className="text-primary hover:underline">Create account</Link></span>
          <span className="flex items-center gap-1 text-xs">
            <LogIn className="h-3 w-3" /> Single sign-on ready
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}

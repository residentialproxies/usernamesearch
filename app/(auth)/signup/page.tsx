'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Sparkles, ShieldCheck, Clock3 } from 'lucide-react'

const providers = [
  { id: 'google', name: 'Google', icon: Sparkles },
  { id: 'github', name: 'GitHub', icon: Github },
]

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>
            One-click sign up with Google or GitHub. No passwords needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map(({ id, name, icon: Icon }) => (
            <Button
              key={id}
              className="w-full"
              variant={id === 'google' ? 'default' : 'outline'}
              onClick={() => signIn(id, { callbackUrl: '/dashboard' })}
            >
              <Icon className="h-4 w-4 mr-2" />
              Continue with {name}
            </Button>
          ))}

          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> OAuth only
            </div>
            <div className="flex items-center gap-1">
              <Clock3 className="h-3 w-3" /> 10 free daily checks
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> API ready
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link></span>
          <span>No emails stored without consent.</span>
        </CardFooter>
      </Card>
    </div>
  )
}

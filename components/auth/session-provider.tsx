'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

/**
 * Thin wrapper to avoid importing next-auth in every client component.
 */
export function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session?: Session | null
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

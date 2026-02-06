import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { D1Database } from '@/lib/server/d1'
import { hasSuccessfulPayment } from '@/lib/server/payments'
import { getUserByEmail, getUserById, setUserPlanByEmail, upsertUser } from '@/lib/server/users'

/**
 * Central Auth.js (NextAuth) configuration.
 * Only Google OAuth is enabled – no email/password flows.
 */
export function createAuthOptions({ db }: { db?: D1Database } = {}): NextAuthOptions {
  return {
    providers: [
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? [
            GoogleProvider({
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
          ]
        : []),
    ],

    session: {
      strategy: 'jwt',
    },

    pages: {
      signIn: '/login',
    },

    callbacks: {
      async jwt({ token, account, profile, user }) {
        const now = Math.floor(Date.now() / 1000)

        if (account) {
          const userId = `${account.provider}:${account.providerAccountId}`
          token.userId = userId
          token.provider = account.provider
          token.name = profile?.name || user?.name || token.name
          token.email = (profile as { email?: string })?.email || token.email
          token.picture =
            (profile as { avatar_url?: string; picture?: string })?.avatar_url ||
            (profile as { picture?: string })?.picture ||
            token.picture

          if (db && token.email) {
            try {
              const dbUser = await upsertUser(db, {
                id: userId,
                email: token.email,
                name: token.name,
                pictureUrl: (token as { picture?: string }).picture ?? null,
              })
              let plan = dbUser.plan
              if (plan !== 'pro' && (await hasSuccessfulPayment(db, token.email))) {
                const updated = await setUserPlanByEmail(db, token.email, 'pro')
                plan = updated?.plan ?? 'pro'
              }
              token.plan = plan
            } catch (err) {
              console.error('[auth] Failed to upsert user:', err)
              token.plan = token.plan ?? 'free'
            }
          } else {
            token.plan = token.plan ?? 'free'
          }

          token.planRefreshedAt = now
          return token
        }

        const refreshIntervalSeconds = 10 * 60
        const planRefreshedAt = Number((token as { planRefreshedAt?: unknown }).planRefreshedAt ?? 0)
        const shouldRefresh = Boolean(db) && now - planRefreshedAt > refreshIntervalSeconds

        if (db && shouldRefresh) {
          try {
            const userId = (token as { userId?: string }).userId
            const email = token.email
            const found =
              (userId ? await getUserById(db, userId) : null) ||
              (email ? await getUserByEmail(db, email) : null)
            if (found?.plan) {
              token.plan = found.plan
            } else {
              token.plan = token.plan ?? 'free'
            }
            token.planRefreshedAt = now
          } catch (err) {
            console.error('[auth] Failed to refresh plan:', err)
            token.plan = token.plan ?? 'free'
          }
        } else {
          token.plan = token.plan ?? 'free'
        }

        return token
      },

      async session({ session, token }) {
        session.user = {
          ...session.user,
          id: (token as { userId?: string }).userId || token.sub,
          plan: ((token as { plan?: string }).plan as 'free' | 'pro' | 'enterprise') ?? 'free',
          provider: (token as { provider?: string }).provider,
          image: (token as { picture?: string }).picture || session.user?.image,
        }

        return session
      },
    },

    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.NODE_ENV === 'production',
  }
}

// Ensure at least one provider is configured at runtime to avoid silent failures.
if (process.env.NODE_ENV !== 'production') {
  const hasProvider = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  if (!hasProvider) {
    console.warn(
      '[auth] No OAuth providers configured. Set GOOGLE_CLIENT_ID/SECRET.'
    )
  }
}

export const authOptions: NextAuthOptions = createAuthOptions()

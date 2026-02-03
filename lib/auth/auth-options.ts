import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

/**
 * Central Auth.js (NextAuth) configuration.
 * Only Google & GitHub OAuth are enabled – no email/password flows.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    // Google OAuth
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // GitHub OAuth
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],

  // JWT sessions keep things stateless (no database required yet)
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.provider = account.provider
        token.name = profile?.name || user?.name || token.name
        token.email = (profile as { email?: string })?.email || token.email
        token.picture =
          (profile as { avatar_url?: string; picture?: string })?.avatar_url ||
          (profile as { picture?: string })?.picture ||
          token.picture

        // Default plan info for downstream UI; real billing can extend this later.
        token.plan = token.plan ?? 'free'
      }

      return token
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub,
        plan: (token as { plan?: string }).plan ?? 'free',
        provider: (token as { provider?: string }).provider,
        image: (token as { picture?: string }).picture || session.user?.image,
      }

      return session
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
}

// Ensure at least one provider is configured at runtime to avoid silent failures.
if (process.env.NODE_ENV !== 'production') {
  const hasProvider = Boolean(
    (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) ||
      (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  )

  if (!hasProvider) {
    console.warn(
      '[auth] No OAuth providers configured. Set GOOGLE_CLIENT_ID/SECRET and GITHUB_CLIENT_ID/SECRET.'
    )
  }
}

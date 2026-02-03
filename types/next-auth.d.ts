import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    plan?: 'free' | 'pro' | 'enterprise'
    provider?: string
  }

  interface Session {
    user: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
      plan?: 'free' | 'pro' | 'enterprise'
      provider?: string
    }
  }
}

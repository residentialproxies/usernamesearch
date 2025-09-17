import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - UsernameSearch.io | Access Your Account',
  description: 'Sign in to your UsernameSearch.io account to access your dashboard, API keys, search history, and Pro features.',
  keywords: 'login, sign in, account access, member login',
  openGraph: {
    title: 'Login to UsernameSearch.io',
    description: 'Access your account dashboard and Pro features.',
    url: 'https://usernamesearch.io/login',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-login.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Login',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Login - UsernameSearch.io',
    description: 'Access your account',
  },
  alternates: {
    canonical: 'https://usernamesearch.io/login',
  },
  robots: {
    index: false, // Don't index login page
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
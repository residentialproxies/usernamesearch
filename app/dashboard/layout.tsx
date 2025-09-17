import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - UsernameSearch.io | Manage Your Username Searches',
  description: 'Access your UsernameSearch.io dashboard. View search history, manage API keys, track usage, and monitor username availability across 1500+ platforms.',
  keywords: 'username dashboard, search history, API management, username tracking, account dashboard',
  openGraph: {
    title: 'Your Username Search Dashboard',
    description: 'Manage your username searches, API access, and account settings in one place.',
    url: 'https://usernamesearch.io/dashboard',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-dashboard.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Dashboard',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Search Dashboard',
    description: 'Manage your searches and API access',
    images: ['https://usernamesearch.io/twitter-dashboard.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/dashboard',
  },
  robots: {
    index: false, // Dashboard is private, don't index
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
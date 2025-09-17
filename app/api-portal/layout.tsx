import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Portal - UsernameSearch.io | Developer Dashboard',
  description: 'Access the UsernameSearch.io API portal. Manage API keys, monitor usage, view analytics, and access developer resources for username checking integration.',
  keywords: 'API portal, developer dashboard, API keys, usage analytics, developer tools, API management',
  openGraph: {
    title: 'Developer API Portal - UsernameSearch.io',
    description: 'Manage your API access and monitor usage for username checking services.',
    url: 'https://usernamesearch.io/api-portal',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-api-portal.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io API Portal',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Developer Portal',
    description: 'Manage API keys and monitor usage',
    images: ['https://usernamesearch.io/twitter-api-portal.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/api-portal',
  },
  robots: {
    index: false, // API portal is private
    follow: false,
  },
}

export default function ApiPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
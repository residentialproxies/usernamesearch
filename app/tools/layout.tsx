import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Username Tools - UsernameSearch.io',
  description: 'Free online username tools including generator, checker, and brand name creator. Generate unique usernames, check availability across platforms, and find the perfect online identity.',
  keywords: 'username generator, username checker, brand name generator, free username tools, online username creator',
  openGraph: {
    title: 'Free Username Tools & Generators',
    description: 'Generate unique usernames, check availability, and create brand names with our free online tools.',
    url: 'https://usernamesearch.io/tools',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-tools.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Tools',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Username Tools',
    description: 'Generate and check usernames with our free tools',
    images: ['https://usernamesearch.io/twitter-tools.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
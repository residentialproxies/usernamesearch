import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Status - UsernameSearch.io | Service Uptime & Performance',
  description: 'Check the current status of UsernameSearch.io services. Monitor API uptime, platform availability, and system performance in real-time.',
  keywords: 'system status, service uptime, API status, platform availability, service health',
  openGraph: {
    title: 'UsernameSearch.io System Status',
    description: 'Real-time status monitoring for all UsernameSearch.io services and APIs.',
    url: 'https://usernamesearch.io/status',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-status.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Status Page',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Status - UsernameSearch.io',
    description: 'Check service uptime and performance',
    images: ['https://usernamesearch.io/twitter-status.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/status',
  },
}

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "System Status",
            "description": "Real-time service status and uptime monitoring",
            "url": "https://usernamesearch.io/status",
            "publisher": {
              "@type": "Organization",
              "name": "UsernameSearch.io"
            }
          })
        }}
      />
      {children}
    </>
  )
}
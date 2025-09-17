import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Username Checker - Bulk Check Availability | UsernameSearch.io',
  description: 'Advanced username availability checker with bulk checking, filters, and export options. Check multiple usernames across 520+ platforms simultaneously.',
  keywords: 'bulk username checker, advanced username search, multiple username check, username availability tool, batch username checker',
  openGraph: {
    title: 'Advanced Username Checker - Bulk Availability Check',
    description: 'Check multiple usernames across 520+ platforms with advanced filtering and export options.',
    url: 'https://usernamesearch.io/tools/username-checker',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-checker.png',
        width: 1200,
        height: 630,
        alt: 'Advanced Username Checker Tool',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Username Checker',
    description: 'Bulk check username availability across platforms',
    images: ['https://usernamesearch.io/twitter-checker.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/tools/username-checker',
  },
}

export default function UsernameCheckerLayout({
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
            "@type": "WebApplication",
            "name": "Advanced Username Checker",
            "description": "Bulk username availability checker for multiple platforms",
            "url": "https://usernamesearch.io/tools/username-checker",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      {children}
    </>
  )
}
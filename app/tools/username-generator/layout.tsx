import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Username Generator - Create Unique Usernames | UsernameSearch.io',
  description: 'Generate creative and unique usernames instantly. Our AI-powered username generator creates personalized suggestions for social media, gaming, and online platforms.',
  keywords: 'username generator, random username, creative usernames, gaming username generator, social media username creator, unique username ideas',
  openGraph: {
    title: 'AI-Powered Username Generator - Create Unique Usernames',
    description: 'Generate creative usernames with our AI tool. Perfect for Instagram, TikTok, gaming, and more.',
    url: 'https://usernamesearch.io/tools/username-generator',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-generator.png',
        width: 1200,
        height: 630,
        alt: 'Username Generator Tool',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Username Generator',
    description: 'Create unique usernames instantly with AI',
    images: ['https://usernamesearch.io/twitter-generator.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/tools/username-generator',
  },
}

export default function UsernameGeneratorLayout({
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
            "name": "Username Generator",
            "description": "AI-powered tool to generate creative and unique usernames",
            "url": "https://usernamesearch.io/tools/username-generator",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "567"
            }
          })
        }}
      />
      {children}
    </>
  )
}
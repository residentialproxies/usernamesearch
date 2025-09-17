import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - UsernameSearch.io | Pro Plans for Advanced Username Checking',
  description: 'Choose the perfect plan for your username checking needs. Get access to 1500+ platforms, API access, bulk checking, and priority support with our Pro plans.',
  keywords: 'username checker pricing, username search plans, social media username API, bulk username checking, pro username tools',
  openGraph: {
    title: 'Affordable Username Checking Plans - UsernameSearch.io',
    description: 'From free basic checks to enterprise API access. Find the perfect plan for checking username availability across 1500+ platforms.',
    url: 'https://usernamesearch.io/pricing',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-pricing.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Pricing Plans',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Checker Pricing Plans',
    description: 'Free to Pro plans. Check username availability on 1500+ platforms.',
    images: ['https://usernamesearch.io/twitter-pricing.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/pricing',
  },
}

export default function PricingLayout({
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
            "@type": "Product",
            "name": "UsernameSearch.io Pro",
            "description": "Professional username availability checker for 1500+ platforms",
            "brand": {
              "@type": "Brand",
              "name": "UsernameSearch.io"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Free Plan",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Check username availability on all 1500+ platforms with daily limits",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "Pro Plan",
                "price": "10.00",
                "priceCurrency": "USD",
                "description": "Unlimited searches + 500 API requests for automation",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "AggregateOffer",
                "name": "Enterprise Plan",
                "priceCurrency": "USD",
                "description": "Custom pricing for teams and businesses",
                "availability": "https://schema.org/InStock"
              }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "324"
            }
          })
        }}
      />
      {children}
    </>
  )
}
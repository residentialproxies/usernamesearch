import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Name Generator - Create Memorable Brand Names | UsernameSearch.io',
  description: 'Generate unique brand names for your business or startup. Our AI-powered brand name generator creates catchy, memorable names with domain availability checking.',
  keywords: 'brand name generator, business name generator, startup name ideas, company name creator, domain name generator, brand naming tool',
  openGraph: {
    title: 'AI Brand Name Generator - Create Business Names',
    description: 'Generate unique brand names with domain availability checking. Perfect for startups and businesses.',
    url: 'https://usernamesearch.io/tools/brand-name-generator',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-brand-generator.png',
        width: 1200,
        height: 630,
        alt: 'Brand Name Generator Tool',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Brand Name Generator',
    description: 'Create unique brand names with domain checking',
    images: ['https://usernamesearch.io/twitter-brand-generator.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/tools/brand-name-generator',
  },
}

export default function BrandNameGeneratorLayout({
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
            "name": "Brand Name Generator",
            "description": "AI-powered tool to generate unique brand and business names",
            "url": "https://usernamesearch.io/tools/brand-name-generator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.7",
              "ratingCount": "234"
            }
          })
        }}
      />
      {children}
    </>
  )
}
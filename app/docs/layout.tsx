import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - UsernameSearch.io | API Guides & Tutorials',
  description: 'Comprehensive documentation for UsernameSearch.io API. Learn how to integrate username checking into your applications with code examples and guides.',
  keywords: 'API documentation, username API, developer docs, integration guide, API reference, code examples',
  openGraph: {
    title: 'UsernameSearch.io API Documentation',
    description: 'Complete guides and references for integrating username checking into your applications.',
    url: 'https://usernamesearch.io/docs',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-docs.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io Documentation',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Documentation',
    description: 'Complete guides for username checking API',
    images: ['https://usernamesearch.io/twitter-docs.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/docs',
  },
}

export default function DocsLayout({
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
            "@type": "TechArticle",
            "name": "UsernameSearch.io API Documentation",
            "description": "Technical documentation for username checking API",
            "url": "https://usernamesearch.io/docs",
            "author": {
              "@type": "Organization",
              "name": "UsernameSearch.io"
            },
            "dateModified": new Date().toISOString(),
            "audience": {
              "@type": "Audience",
              "audienceType": "Developers"
            }
          })
        }}
      />
      {children}
    </>
  )
}
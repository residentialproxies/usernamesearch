import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - UsernameSearch.io | Get Support',
  description: 'Contact UsernameSearch.io support team. Get help with username checking, API integration, account issues, or send us feedback and suggestions.',
  keywords: 'contact support, customer service, help desk, technical support, feedback',
  openGraph: {
    title: 'Contact UsernameSearch.io Support',
    description: 'Get help with our username checking services or send us your feedback.',
    url: 'https://usernamesearch.io/contact',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact UsernameSearch.io',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Support',
    description: 'Get help with UsernameSearch.io',
    images: ['https://usernamesearch.io/twitter-contact.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/contact',
  },
}

export default function ContactLayout({
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
            "@type": "ContactPage",
            "name": "Contact UsernameSearch.io",
            "description": "Contact our support team for help",
            "url": "https://usernamesearch.io/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "UsernameSearch.io",
              "email": "support@usernamesearch.io",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "availableLanguage": "English"
              }
            }
          })
        }}
      />
      {children}
    </>
  )
}
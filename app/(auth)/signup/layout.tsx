import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - UsernameSearch.io | Create Free Account',
  description: 'Create your free UsernameSearch.io account. Get access to username checking across 100+ platforms, save searches, and upgrade to Pro for full access.',
  keywords: 'sign up, create account, register, free account, join',
  openGraph: {
    title: 'Sign Up for UsernameSearch.io',
    description: 'Create your free account and start checking username availability.',
    url: 'https://usernamesearch.io/signup',
    siteName: 'UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/og-signup.png',
        width: 1200,
        height: 630,
        alt: 'Sign Up for UsernameSearch.io',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sign Up - UsernameSearch.io',
    description: 'Create your free account',
  },
  alternates: {
    canonical: 'https://usernamesearch.io/signup',
  },
  robots: {
    index: true, // Can index signup page for SEO
    follow: true,
  },
}

export default function SignupLayout({
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
            "name": "Sign Up for UsernameSearch.io",
            "description": "Create a free account to access username checking tools",
            "url": "https://usernamesearch.io/signup",
            "potentialAction": {
              "@type": "RegisterAction",
              "target": "https://usernamesearch.io/signup"
            }
          })
        }}
      />
      {children}
    </>
  )
}
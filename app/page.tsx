import type { Metadata } from 'next'
import SearchInterface from '@/components/search/search-interface'

export const metadata: Metadata = {
  title: 'UsernameSearch.io - Check Username Availability Across 520+ Platforms Instantly',
  description: 'Free username availability checker for 520+ social media platforms. 20 free API searches for registered users. Find your perfect username for Instagram, TikTok, Twitter/X, and more.',
  keywords: 'username checker, username availability, social media username, check username, username search, instagram username, tiktok username, twitter username, username generator, brand name checker',
  openGraph: {
    title: 'Check Username Availability on 520+ Platforms - UsernameSearch.io',
    description: 'Instantly check if your desired username is available across 520+ social media platforms, gaming sites, and online services. 20 free API searches for registered users.',
    url: 'https://usernamesearch.io',
    siteName: 'Username Search',
    images: [
      {
        url: 'https://usernamesearch.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UsernameSearch.io - Username Availability Checker',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UsernameSearch.io - Check Username Availability on 520+ Platforms',
    description: 'Free username checker for social media. 20 free API searches for registered users across Instagram, TikTok, Twitter, and 520+ platforms.',
    creator: '@usernamesearch',
    images: ['https://usernamesearch.io/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "UsernameSearch.io",
            "description": "Check username availability across 520+ platforms instantly",
            "url": "https://usernamesearch.io",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://usernamesearch.io/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "UsernameSearch.io",
              "logo": {
                "@type": "ImageObject",
                "url": "https://usernamesearch.io/logo.png"
              }
            },
            "sameAs": [
              "https://twitter.com/usernamesearch",
              "https://github.com/usernamesearch"
            ]
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Perfect{' '}
            <span className="text-primary">Social Username</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Check username availability across 520+ social media platforms, websites, 
            and services instantly. Secure your digital identity today.
          </p>
          
          {/* Search Interface */}
          <SearchInterface />
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">520+</div>
              <div className="text-gray-600 dark:text-gray-300">Platforms Checked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5M+</div>
              <div className="text-gray-600 dark:text-gray-300">Searches Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Accuracy Rate</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Username Search?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get results in seconds across hundreds of platforms simultaneously
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Coverage
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check availability across social media, domains, and more
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We don't store your searches or personal information
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How many platforms does UsernameSearch.io check?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "UsernameSearch.io checks username availability across over 520+ social media platforms, gaming sites, and online services including Instagram, TikTok, Twitter/X, YouTube, LinkedIn, and many more."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is UsernameSearch.io free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We offer a free tier that checks all 520+ platforms with up to 10 daily searches. For unlimited searches and additional features like API access and bulk checking, you can upgrade to our Pro plan."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are the username availability results?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our results are highly accurate with a 99.9% accuracy rate. We check directly with each platform in real-time using the WhatsMyName API."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </>
  )
}
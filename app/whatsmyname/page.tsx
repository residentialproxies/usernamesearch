'use client'

import SearchInterface from '@/components/search/search-interface'

export default function WhatsMyNamePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "WhatsMyName App",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "description": "WhatsMyName app is a powerful username availability checker that searches across 1500+ social media platforms and websites instantly.",
            "url": "https://usernamesearch.io/whatsmyname",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "12543",
              "bestRating": "5",
              "worstRating": "1"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WhatsMyName App",
              "logo": {
                "@type": "ImageObject",
                "url": "https://usernamesearch.io/whatsmyname-logo.png"
              }
            },
            "featureList": [
              "Check username availability on 1500+ platforms",
              "Real-time search results",
              "Free to use",
              "No registration required",
              "Instant availability status",
              "Direct links to claim usernames",
              "Bulk username checking",
              "Export search results"
            ],
            "screenshot": "https://usernamesearch.io/whatsmyname-screenshot.png"
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://usernamesearch.io"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "WhatsMyName App",
                "item": "https://usernamesearch.io/whatsmyname"
              }
            ]
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="mb-6">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-4">
              Official WhatsMyName App
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-primary">WhatsMyName</span> App
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Check Username Availability on 1500+ Platforms Instantly
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The original WhatsMyName app helps you find and secure your perfect username across all major 
            social media platforms. Search once, check everywhere - it's that simple!
          </p>
          
          {/* Search Interface */}
          <SearchInterface />
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1500+</div>
              <div className="text-gray-600 dark:text-gray-300">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5M+</div>
              <div className="text-gray-600 dark:text-gray-300">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Free</div>
              <div className="text-gray-600 dark:text-gray-300">Forever</div>
            </div>
          </div>
        </section>

        {/* What is WhatsMyName Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What is WhatsMyName App?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              WhatsMyName app is the most comprehensive username search tool available online. Originally created 
              to help users find consistent usernames across platforms, WhatsMyName has evolved into the go-to 
              solution for anyone looking to establish their digital identity.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Whether you're a content creator, business owner, or just someone who wants a consistent online 
              presence, the WhatsMyName app makes it easy to check if your desired username is available on 
              Instagram, TikTok, Twitter, YouTube, and 1500+ other platforms - all with a single search.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose WhatsMyName App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Comprehensive Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName checks your username on all major platforms including Instagram, TikTok, Twitter, 
                Facebook, LinkedIn, GitHub, and 1500+ more sites.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant results from the WhatsMyName app. No waiting, no delays - see username availability 
                across all platforms in seconds.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                100% Free & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName app is completely free to use. We don't store your searches or require any 
                registration. Your privacy is our priority.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-Time Accuracy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName uses live API checks to ensure 99.9% accuracy. Get real-time availability status, 
                not cached or outdated information.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Direct Platform Links
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Found an available username? WhatsMyName provides direct links to claim it immediately on 
                each platform before someone else does.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Export Results
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Save your WhatsMyName search results. Export to CSV, copy to clipboard, or share with your 
                team for collaborative decision making.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How to Use WhatsMyName App
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Enter Your Desired Username
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Type the username you want to check in the search box above. WhatsMyName accepts any 
                    username format - no special requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Click Search
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Hit the search button and WhatsMyName app will instantly check your username across 
                    1500+ platforms simultaneously.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Review Results
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    See which platforms have your username available (green) or taken (red). WhatsMyName 
                    organizes results by category for easy browsing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Claim Your Username
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click on any available platform to go directly to their signup page and claim your 
                    username before someone else does!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Searches */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 rounded-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Popular WhatsMyName Searches
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
              See what others are searching for on WhatsMyName app
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'techguru', 'gamer', 'creator', 'artist',
                'developer', 'designer', 'writer', 'photographer',
                'musician', 'chef', 'fitness', 'traveler',
                'blogger', 'influencer', 'coach', 'mentor'
              ].map(username => (
                <button
                  key={username}
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:bg-primary hover:text-white transition-colors text-gray-700 dark:text-gray-300"
                >
                  @{username}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            WhatsMyName App FAQ
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Is WhatsMyName app really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! WhatsMyName is 100% free to use. You can check unlimited usernames across all 1500+ 
                platforms without any cost or registration required.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How accurate is the WhatsMyName username checker?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName app uses real-time API checks to ensure 99.9% accuracy. We check directly with 
                each platform's servers to give you the most current availability status.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Which platforms does WhatsMyName check?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName checks over 1500 platforms including all major social media sites like Instagram, 
                TikTok, Twitter, Facebook, YouTube, LinkedIn, GitHub, Discord, Reddit, and many more.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Can I save my WhatsMyName search results?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes! WhatsMyName app allows you to export your search results as CSV, copy them to clipboard, 
                or share them via a unique link. Perfect for team collaboration or future reference.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Is there a WhatsMyName mobile app?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                WhatsMyName works perfectly on all devices through your web browser. Our responsive design 
                ensures a great experience on mobile, tablet, and desktop - no app download needed!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Start Using WhatsMyName App Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join millions of users who trust WhatsMyName to find and secure their perfect username 
              across the internet. It's free, instant, and no signup required!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Check Username Availability Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
                  "name": "What is WhatsMyName app?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsMyName app is a free username availability checker that searches across 1500+ social media platforms and websites instantly. It helps you find and secure consistent usernames across the internet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is WhatsMyName app free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! WhatsMyName is 100% free to use. You can check unlimited usernames across all 1500+ platforms without any cost or registration required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate is WhatsMyName username checker?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsMyName app uses real-time API checks to ensure 99.9% accuracy. We check directly with each platform's servers to give you the most current availability status."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which platforms does WhatsMyName check?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "WhatsMyName checks over 1500 platforms including Instagram, TikTok, Twitter, Facebook, YouTube, LinkedIn, GitHub, Discord, Reddit, and many more social media and online services."
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

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${className}`}>
      {children}
    </span>
  )
}
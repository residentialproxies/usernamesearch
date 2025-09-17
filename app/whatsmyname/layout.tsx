import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WhatsMyName App - Check Username Availability on 1500+ Sites | Free Username Search Tool',
  description: 'WhatsMyName app is the ultimate username availability checker. Search across 1500+ social media platforms instantly. Free WhatsMyName tool for checking if your username is available on Instagram, TikTok, Twitter, and more.',
  keywords: 'whatsmyname app, whatsmyname, what is my name app, whats my name tool, username checker, username search, whatsmyname username checker, whatsmyname social media, whatsmyname.app, check my username, username availability checker, social media username checker, whatsmyname online',
  openGraph: {
    title: 'WhatsMyName App - Free Username Availability Checker for 1500+ Platforms',
    description: 'The original WhatsMyName app for checking username availability. Search your desired username across 1500+ social media platforms, gaming sites, and online services instantly.',
    url: 'https://usernamesearch.io/whatsmyname',
    siteName: 'WhatsMyName App - UsernameSearch.io',
    images: [
      {
        url: 'https://usernamesearch.io/whatsmyname-og.png',
        width: 1200,
        height: 630,
        alt: 'WhatsMyName App - Username Availability Checker',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsMyName App - Check Username on 1500+ Platforms',
    description: 'Free WhatsMyName tool to check if your username is available across social media. Instant results for Instagram, TikTok, Twitter, and 1500+ sites.',
    creator: '@whatsmynameapp',
    images: ['https://usernamesearch.io/whatsmyname-twitter.png'],
  },
  alternates: {
    canonical: 'https://usernamesearch.io/whatsmyname',
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

export default function WhatsMyNameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
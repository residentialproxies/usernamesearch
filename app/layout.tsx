import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Username Search - Check Username Availability Across Platforms',
  description: 'Instantly check username availability across 500+ social media platforms, websites, and services. Find the perfect username for your brand or personal use.',
  keywords: 'username search, username availability, social media usernames, brand names, handle checker',
  authors: [{ name: 'Username Search' }],
  creator: 'Username Search',
  publisher: 'Username Search',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://usernamesearch.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://usernamesearch.io',
    title: 'Username Search - Check Username Availability',
    description: 'Instantly check username availability across 500+ social media platforms, websites, and services.',
    siteName: 'Username Search',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Username Search - Check Username Availability',
    description: 'Instantly check username availability across 500+ social media platforms, websites, and services.',
    creator: '@usernamesearch',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supported Sites - Check Username on 520+ Platforms | Username Search',
  description: 'Browse all 520+ platforms supported by Username Search. Check username availability on social media, gaming, forums, and more. Filter by category and popularity.',
  alternates: {
    canonical: 'https://usernamesearch.io/supported-sites',
  },
  openGraph: {
    title: 'Supported Sites - 520+ Platforms | Username Search',
    description: 'Browse all 520+ platforms supported by Username Search. Check username availability on social media, gaming, forums, and more.',
    url: 'https://usernamesearch.io/supported-sites',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supported Sites - 520+ Platforms | Username Search',
    description: 'Browse all 520+ platforms supported by Username Search.',
  },
}

export default function SupportedSitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

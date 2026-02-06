import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog - Username Search',
  description: 'Tips, guides, and insights about username selection, personal branding, and social media strategy.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function BlogPage() {
  redirect('/resources/guides')
}
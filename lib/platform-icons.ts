// Platform icon mapping based on WhatsMyName data
export const platformIcons: Record<string, string> = {
  // Social Media
  'Facebook': 'https://www.facebook.com/favicon.ico',
  'Twitter': 'https://twitter.com/favicon.ico',
  'X': 'https://x.com/favicon.ico',
  'Instagram': 'https://www.instagram.com/favicon.ico',
  'LinkedIn': 'https://www.linkedin.com/favicon.ico',
  'TikTok': 'https://www.tiktok.com/favicon.ico',
  'YouTube': 'https://www.youtube.com/favicon.ico',
  'Pinterest': 'https://www.pinterest.com/favicon.ico',
  'Reddit': 'https://www.reddit.com/favicon.ico',
  'Tumblr': 'https://www.tumblr.com/favicon.ico',
  'Snapchat': 'https://www.snapchat.com/favicon.ico',
  
  // Professional
  'GitHub': 'https://github.com/favicon.ico',
  'GitLab': 'https://gitlab.com/favicon.ico',
  'BitBucket': 'https://bitbucket.org/favicon.ico',
  'Stack Overflow': 'https://stackoverflow.com/favicon.ico',
  'Medium': 'https://medium.com/favicon.ico',
  'Dev.to': 'https://dev.to/favicon.ico',
  'Behance': 'https://www.behance.net/favicon.ico',
  'Dribbble': 'https://dribbble.com/favicon.ico',
  
  // Gaming
  'Steam': 'https://store.steampowered.com/favicon.ico',
  'Twitch': 'https://www.twitch.tv/favicon.ico',
  'Discord': 'https://discord.com/favicon.ico',
  'Epic Games': 'https://www.epicgames.com/favicon.ico',
  'Xbox': 'https://www.xbox.com/favicon.ico',
  'PlayStation': 'https://www.playstation.com/favicon.ico',
  
  // Forums & Communities
  '9GAG': 'https://9gag.com/favicon.ico',
  'Quora': 'https://www.quora.com/favicon.ico',
  'Ask.fm': 'https://ask.fm/favicon.ico',
  'AskFM': 'https://ask.fm/favicon.ico',
  
  // Entertainment
  'Spotify': 'https://www.spotify.com/favicon.ico',
  'SoundCloud': 'https://soundcloud.com/favicon.ico',
  'Last.fm': 'https://www.last.fm/favicon.ico',
  'Vimeo': 'https://vimeo.com/favicon.ico',
  
  // Others
  'About.me': 'https://about.me/favicon.ico',
  'Academia.edu': 'https://www.academia.edu/favicon.ico',
  'Archive.org': 'https://archive.org/favicon.ico',
  'Blogger': 'https://www.blogger.com/favicon.ico',
  'WordPress': 'https://wordpress.com/favicon.ico',
  'Flickr': 'https://www.flickr.com/favicon.ico',
  'PayPal': 'https://www.paypal.com/favicon.ico',
  'Venmo': 'https://venmo.com/favicon.ico',
  'CashApp': 'https://cash.app/favicon.ico',
  'Patreon': 'https://www.patreon.com/favicon.ico',
  'OnlyFans': 'https://onlyfans.com/favicon.ico',
  'Linktree': 'https://linktr.ee/favicon.ico',
}

// Get icon URL for a platform
export function getPlatformIcon(platformName: string): string | null {
  // Direct match
  if (platformIcons[platformName]) {
    return platformIcons[platformName]
  }
  
  // Case insensitive match
  const lowerName = platformName.toLowerCase()
  for (const [key, value] of Object.entries(platformIcons)) {
    if (key.toLowerCase() === lowerName) {
      return value
    }
  }
  
  return null
}

// Get icon from URL domain
export function getIconFromUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''
  }
  try {
    const domain = new URL(url).hostname
    // Use Google's favicon service as fallback
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
  } catch {
    return ''
  }
}

// Get platform color (for background when icon fails)
export const platformColors: Record<string, string> = {
  'Facebook': '#1877F2',
  'Twitter': '#1DA1F2',
  'X': '#000000',
  'Instagram': '#E4405F',
  'LinkedIn': '#0A66C2',
  'TikTok': '#000000',
  'YouTube': '#FF0000',
  'Pinterest': '#BD081C',
  'Reddit': '#FF4500',
  'Tumblr': '#35465C',
  'GitHub': '#181717',
  'GitLab': '#FC6D26',
  'Steam': '#000000',
  'Twitch': '#9146FF',
  'Discord': '#5865F2',
  'Spotify': '#1DB954',
  'SoundCloud': '#FF3300',
}

export function getPlatformColor(platformName: string): string {
  return platformColors[platformName] || '#6B7280'
}
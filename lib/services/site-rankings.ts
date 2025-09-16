/**
 * Site Rankings Service
 * 
 * Provides hardcoded rankings for popular social media and web platforms
 * based on global popularity and user engagement metrics.
 * Lower numbers indicate higher priority/popularity.
 */

interface SiteRankingData {
  ranking: number;
  category: string;
  popularity: 'very_high' | 'high' | 'medium' | 'low';
  monthlyVisitors?: string; // Approximate monthly visitors
  description?: string;
}

// Hardcoded site rankings based on popularity and global usage
const SITE_RANKINGS: Record<string, SiteRankingData> = {
  // Top Tier - Most Popular Global Platforms (1-10)
  'Instagram': {
    ranking: 1,
    category: 'Social Media',
    popularity: 'very_high',
    monthlyVisitors: '2B+',
    description: 'Photo and video sharing social network'
  },
  'TikTok': {
    ranking: 2,
    category: 'Social Media', 
    popularity: 'very_high',
    monthlyVisitors: '1.7B+',
    description: 'Short-form video hosting service'
  },
  'Twitter': {
    ranking: 3,
    category: 'Social Media',
    popularity: 'very_high',
    monthlyVisitors: '450M+',
    description: 'Microblogging and social networking'
  },
  'Facebook': {
    ranking: 4,
    category: 'Social Media',
    popularity: 'very_high',
    monthlyVisitors: '2.9B+',
    description: 'Social networking platform'
  },
  'YouTube': {
    ranking: 5,
    category: 'Video Sharing',
    popularity: 'very_high',
    monthlyVisitors: '2.7B+',
    description: 'Video sharing platform'
  },
  'LinkedIn': {
    ranking: 6,
    category: 'Professional',
    popularity: 'very_high',
    monthlyVisitors: '900M+',
    description: 'Professional networking platform'
  },
  'GitHub': {
    ranking: 7,
    category: 'Software development',
    popularity: 'very_high',
    monthlyVisitors: '100M+',
    description: 'Code repository and collaboration platform'
  },
  'Pinterest': {
    ranking: 8,
    category: 'Social Media',
    popularity: 'very_high',
    monthlyVisitors: '450M+',
    description: 'Image sharing and discovery'
  },
  'Snapchat': {
    ranking: 9,
    category: 'Social Media',
    popularity: 'very_high',
    monthlyVisitors: '750M+',
    description: 'Multimedia messaging'
  },
  'Reddit': {
    ranking: 10,
    category: 'Online Community',
    popularity: 'very_high',
    monthlyVisitors: '1.7B+',
    description: 'Social news aggregation and discussion'
  },

  // High Priority Platforms (11-30)
  'Telegram': {
    ranking: 11,
    category: 'Messaging',
    popularity: 'high',
    monthlyVisitors: '700M+',
    description: 'Instant messaging service'
  },
  'Discord': {
    ranking: 12,
    category: 'Communication',
    popularity: 'high',
    monthlyVisitors: '150M+',
    description: 'Voice, video and text communication'
  },
  'Twitch': {
    ranking: 13,
    category: 'Video Streaming',
    popularity: 'high',
    monthlyVisitors: '140M+',
    description: 'Live streaming platform for gamers'
  },
  'Medium': {
    ranking: 14,
    category: 'Blogging',
    popularity: 'high',
    monthlyVisitors: '120M+',
    description: 'Online publishing platform'
  },
  'Tumblr': {
    ranking: 15,
    category: 'Blogging',
    popularity: 'high',
    monthlyVisitors: '135M+',
    description: 'Microblogging platform'
  },
  'Spotify': {
    ranking: 16,
    category: 'Music',
    popularity: 'high',
    monthlyVisitors: '450M+',
    description: 'Music streaming service'
  },
  'Behance': {
    ranking: 17,
    category: 'Visual Arts and Design',
    popularity: 'high',
    monthlyVisitors: '45M+',
    description: 'Creative portfolio showcase'
  },
  'Dribbble': {
    ranking: 18,
    category: 'Visual Arts and Design',
    popularity: 'high',
    monthlyVisitors: '12M+',
    description: 'Design community and showcase'
  },
  'DeviantArt': {
    ranking: 19,
    category: 'Visual Arts and Design',
    popularity: 'high',
    monthlyVisitors: '45M+',
    description: 'Art community platform'
  },
  'Flickr': {
    ranking: 20,
    category: 'Photography',
    popularity: 'high',
    monthlyVisitors: '20M+',
    description: 'Photo sharing and hosting'
  },
  'SoundCloud': {
    ranking: 21,
    category: 'Music',
    popularity: 'high',
    monthlyVisitors: '175M+',
    description: 'Audio distribution platform'
  },
  'Steam': {
    ranking: 22,
    category: 'Gaming',
    popularity: 'high',
    monthlyVisitors: '120M+',
    description: 'Digital distribution platform for games'
  },
  'Etsy': {
    ranking: 23,
    category: 'E-commerce',
    popularity: 'high',
    monthlyVisitors: '90M+',
    description: 'Marketplace for handmade and vintage items'
  },
  'Patreon': {
    ranking: 24,
    category: 'Finance',
    popularity: 'high',
    monthlyVisitors: '8M+',
    description: 'Membership platform for creators'
  },
  'OnlyFans': {
    ranking: 25,
    category: 'Content Creation',
    popularity: 'high',
    monthlyVisitors: '170M+',
    description: 'Subscription-based social media platform'
  },
  'Vimeo': {
    ranking: 26,
    category: 'Video Sharing',
    popularity: 'high',
    monthlyVisitors: '130M+',
    description: 'Video hosting and streaming'
  },
  'BitBucket': {
    ranking: 27,
    category: 'Software development',
    popularity: 'high',
    monthlyVisitors: '10M+',
    description: 'Git repository hosting'
  },
  'GitLab': {
    ranking: 28,
    category: 'Software development',
    popularity: 'high',
    monthlyVisitors: '30M+',
    description: 'DevOps platform and Git repository'
  },
  'Stack Overflow': {
    ranking: 29,
    category: 'Software development',
    popularity: 'high',
    monthlyVisitors: '100M+',
    description: 'Programming Q&A platform'
  },
  'Codecademy': {
    ranking: 30,
    category: 'Education',
    popularity: 'high',
    monthlyVisitors: '45M+',
    description: 'Interactive coding education'
  },

  // Medium Priority Platforms (31-60)
  'MySpace': {
    ranking: 31,
    category: 'Social Media',
    popularity: 'medium',
    description: 'Social networking (legacy platform)'
  },
  'Last.fm': {
    ranking: 32,
    category: 'Music',
    popularity: 'medium',
    description: 'Music recommendation and scrobbling'
  },
  'Blogger': {
    ranking: 33,
    category: 'Blogging',
    popularity: 'medium',
    description: 'Google\'s blogging platform'
  },
  'WordPress': {
    ranking: 34,
    category: 'Blogging',
    popularity: 'medium',
    description: 'Content management system'
  },
  'About.me': {
    ranking: 35,
    category: 'Technology',
    popularity: 'medium',
    description: 'Personal landing page service'
  },
  'Academia.edu': {
    ranking: 36,
    category: 'Education',
    popularity: 'medium',
    description: 'Academic paper sharing platform'
  },
  'ResearchGate': {
    ranking: 37,
    category: 'Education',
    popularity: 'medium',
    description: 'Academic research network'
  },
  'Goodreads': {
    ranking: 38,
    category: 'Literature',
    popularity: 'medium',
    description: 'Book recommendation and review'
  },
  'IMDb': {
    ranking: 39,
    category: 'Entertainment',
    popularity: 'medium',
    description: 'Movie and TV database'
  },
  'Letterboxd': {
    ranking: 40,
    category: 'Entertainment',
    popularity: 'medium',
    description: 'Film review and discovery'
  },
  'Yelp': {
    ranking: 41,
    category: 'Reviews',
    popularity: 'medium',
    description: 'Local business reviews'
  },
  'Foursquare': {
    ranking: 42,
    category: 'Location',
    popularity: 'medium',
    description: 'Location-based social networking'
  },
  'Meetup': {
    ranking: 43,
    category: 'Social Networking',
    popularity: 'medium',
    description: 'Event organization and networking'
  },
  'SlideShare': {
    ranking: 44,
    category: 'Education',
    popularity: 'medium',
    description: 'Presentation sharing platform'
  },
  'Scribd': {
    ranking: 45,
    category: 'Education',
    popularity: 'medium',
    description: 'Digital library and document sharing'
  },
  'AngelList': {
    ranking: 46,
    category: 'Professional',
    popularity: 'medium',
    description: 'Startup and investment platform'
  },
  'ProductHunt': {
    ranking: 47,
    category: 'Technology',
    popularity: 'medium',
    description: 'Product discovery platform'
  },
  'Kaggle': {
    ranking: 48,
    category: 'Data Science',
    popularity: 'medium',
    description: 'Data science competition platform'
  },
  'HackerRank': {
    ranking: 49,
    category: 'Software development',
    popularity: 'medium',
    description: 'Coding challenges and hiring'
  },
  'LeetCode': {
    ranking: 50,
    category: 'Software development',
    popularity: 'medium',
    description: 'Algorithm and coding practice'
  },

  // Lower Priority / Niche Platforms (61+)
  '9GAG': {
    ranking: 61,
    category: 'Entertainment',
    popularity: 'medium',
    description: 'Meme and humor sharing'
  },
  'Ask.fm': {
    ranking: 62,
    category: 'Online Community',
    popularity: 'medium',
    description: 'Anonymous Q&A platform'
  },
  'BuyMeACoffee': {
    ranking: 63,
    category: 'Finance',
    popularity: 'medium',
    description: 'Creator support platform'
  },
  'Ko-fi': {
    ranking: 64,
    category: 'Finance',
    popularity: 'medium',
    description: 'Creator support and donations'
  }
};

/**
 * Gets the ranking for a specific site
 * @param siteName - Name of the site
 * @returns Ranking number (lower = higher priority) or undefined if not found
 */
export function getSiteRanking(siteName: string): number | undefined {
  const rankingData = SITE_RANKINGS[siteName];
  return rankingData?.ranking;
}

/**
 * Gets detailed ranking information for a site
 * @param siteName - Name of the site
 * @returns SiteRankingData object or undefined if not found
 */
export function getSiteRankingData(siteName: string): SiteRankingData | undefined {
  return SITE_RANKINGS[siteName];
}

/**
 * Gets all sites sorted by ranking
 * @returns Array of [siteName, rankingData] tuples sorted by ranking
 */
export function getAllSitesByRanking(): Array<[string, SiteRankingData]> {
  return Object.entries(SITE_RANKINGS)
    .sort((a, b) => a[1].ranking - b[1].ranking);
}

/**
 * Gets top N sites by ranking
 * @param limit - Number of top sites to return
 * @returns Array of site names sorted by ranking
 */
export function getTopSites(limit: number = 20): string[] {
  return getAllSitesByRanking()
    .slice(0, limit)
    .map(([siteName]) => siteName);
}

/**
 * Gets sites by popularity level
 * @param popularity - Popularity level to filter by
 * @returns Array of site names with the specified popularity level
 */
export function getSitesByPopularity(
  popularity: 'very_high' | 'high' | 'medium' | 'low'
): string[] {
  return Object.entries(SITE_RANKINGS)
    .filter(([_, data]) => data.popularity === popularity)
    .sort((a, b) => a[1].ranking - b[1].ranking)
    .map(([siteName]) => siteName);
}

/**
 * Gets sites by category, sorted by ranking
 * @param category - Category to filter by
 * @returns Array of site names in the specified category
 */
export function getSitesByCategory(category: string): string[] {
  return Object.entries(SITE_RANKINGS)
    .filter(([_, data]) => data.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a[1].ranking - b[1].ranking)
    .map(([siteName]) => siteName);
}

/**
 * Checks if a site has ranking data
 * @param siteName - Name of the site to check
 * @returns Boolean indicating if ranking data exists
 */
export function hasSiteRanking(siteName: string): boolean {
  return siteName in SITE_RANKINGS;
}

/**
 * Gets ranking statistics
 * @returns Object with ranking statistics
 */
export function getRankingStats() {
  const sites = Object.values(SITE_RANKINGS);
  return {
    totalSites: sites.length,
    byPopularity: {
      very_high: sites.filter(s => s.popularity === 'very_high').length,
      high: sites.filter(s => s.popularity === 'high').length,
      medium: sites.filter(s => s.popularity === 'medium').length,
      low: sites.filter(s => s.popularity === 'low').length,
    },
    categories: Array.from(new Set(sites.map(s => s.category))).sort(),
    rankingRange: {
      min: Math.min(...sites.map(s => s.ranking)),
      max: Math.max(...sites.map(s => s.ranking)),
    }
  };
}

export default {
  getSiteRanking,
  getSiteRankingData,
  getAllSitesByRanking,
  getTopSites,
  getSitesByPopularity,
  getSitesByCategory,
  hasSiteRanking,
  getRankingStats
};
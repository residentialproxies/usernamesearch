import sitesData from '../data/sites.json';
import { getSiteRanking } from './site-rankings';

export interface Site {
  category: string;
  errorMsg: string;
  errorType: 'status_code' | 'message';
  url: string;
  urlMain: string;
  username_claimed: string;
  username_unclaimed: string;
  regexCheck?: string;
}

export interface CheckResult {
  siteName: string;
  url: string;
  urlMain: string;
  category: string;
  available: boolean | null;
  error?: string;
  ranking?: number;
}

export interface UsernameCheckResponse {
  username: string;
  results: CheckResult[];
  summary: {
    total: number;
    available: number;
    unavailable: number;
    errors: number;
  };
}

class UsernameChecker {
  private sites: Record<string, Site>;
  private readonly REQUEST_TIMEOUT = 10000; // 10 seconds
  private readonly MAX_CONCURRENT_REQUESTS = 50;

  constructor() {
    this.sites = sitesData as unknown as Record<string, Site>;
  }

  /**
   * Validates username format for a specific site
   */
  private validateUsernameForSite(username: string, site: Site): boolean {
    if (!site.regexCheck) return true;
    
    try {
      const regex = new RegExp(site.regexCheck);
      return regex.test(username);
    } catch (error) {
      console.warn(`Invalid regex for site: ${site.regexCheck}`);
      return true; // Allow check if regex is invalid
    }
  }

  /**
   * Makes HTTP request to check username availability
   */
  private async checkSiteAvailability(
    siteName: string,
    username: string,
    site: Site
  ): Promise<CheckResult> {
    const url = site.url.replace('{}', username);
    
    const result: CheckResult = {
      siteName,
      url,
      urlMain: site.urlMain,
      category: site.category,
      available: null,
      ranking: getSiteRanking(siteName)
    };

    // Validate username format first
    if (!this.validateUsernameForSite(username, site)) {
      result.available = null;
      result.error = 'Invalid username format for this site';
      return result;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (site.errorType === 'status_code') {
        // If site uses status codes, 200 means username exists (unavailable)
        // 404 or other error codes mean username is available
        result.available = !response.ok;
      } else if (site.errorType === 'message') {
        // If site uses error messages, we need to check the response body
        const responseText = await response.text();
        const hasErrorMessage = responseText.includes(site.errorMsg);
        result.available = hasErrorMessage; // Error message means username is available
      }

    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          result.error = 'Request timeout';
        } else {
          result.error = error.message;
        }
      } else {
        result.error = 'Unknown error occurred';
      }
      result.available = null;
    }

    return result;
  }

  /**
   * Checks username availability across all sites
   */
  async checkUsername(username: string): Promise<UsernameCheckResponse> {
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }

    const trimmedUsername = username.trim();
    
    // Basic username validation
    if (trimmedUsername.length < 2) {
      throw new Error('Username must be at least 2 characters long');
    }

    if (trimmedUsername.length > 50) {
      throw new Error('Username must be less than 50 characters');
    }

    const siteEntries = Object.entries(this.sites);
    const results: CheckResult[] = [];

    // Process sites in batches to avoid overwhelming servers
    const batchSize = this.MAX_CONCURRENT_REQUESTS;
    
    for (let i = 0; i < siteEntries.length; i += batchSize) {
      const batch = siteEntries.slice(i, i + batchSize);
      
      const batchPromises = batch.map(([siteName, site]) =>
        this.checkSiteAvailability(siteName, trimmedUsername, site)
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Small delay between batches to be respectful to servers
      if (i + batchSize < siteEntries.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Sort results by ranking (lower number = higher priority)
    results.sort((a, b) => {
      const rankA = a.ranking || 999999;
      const rankB = b.ranking || 999999;
      return rankA - rankB;
    });

    // Calculate summary statistics
    const summary = {
      total: results.length,
      available: results.filter(r => r.available === true).length,
      unavailable: results.filter(r => r.available === false).length,
      errors: results.filter(r => r.available === null).length,
    };

    return {
      username: trimmedUsername,
      results,
      summary
    };
  }

  /**
   * Checks username availability for specific sites only
   */
  async checkUsernameForSites(
    username: string, 
    siteNames: string[]
  ): Promise<UsernameCheckResponse> {
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }

    if (!siteNames || siteNames.length === 0) {
      throw new Error('At least one site must be specified');
    }

    const trimmedUsername = username.trim();
    const results: CheckResult[] = [];

    const promises = siteNames.map(async (siteName) => {
      const site = this.sites[siteName];
      if (!site) {
        return {
          siteName,
          url: '',
          urlMain: '',
          category: '',
          available: null,
          error: `Site '${siteName}' not found`,
          ranking: getSiteRanking(siteName)
        } as CheckResult;
      }

      return this.checkSiteAvailability(siteName, trimmedUsername, site);
    });

    const allResults = await Promise.all(promises);
    results.push(...allResults);

    // Sort by ranking
    results.sort((a, b) => {
      const rankA = a.ranking || 999999;
      const rankB = b.ranking || 999999;
      return rankA - rankB;
    });

    const summary = {
      total: results.length,
      available: results.filter(r => r.available === true).length,
      unavailable: results.filter(r => r.available === false).length,
      errors: results.filter(r => r.available === null).length,
    };

    return {
      username: trimmedUsername,
      results,
      summary
    };
  }

  /**
   * Gets list of all available sites
   */
  getSites(): Record<string, Site> {
    return this.sites;
  }

  /**
   * Gets sites by category
   */
  getSitesByCategory(category: string): Record<string, Site> {
    return Object.fromEntries(
      Object.entries(this.sites).filter(([_, site]) => 
        site.category.toLowerCase() === category.toLowerCase()
      )
    );
  }

  /**
   * Gets all unique categories
   */
  getCategories(): string[] {
    const categories = new Set(Object.values(this.sites).map(site => site.category));
    return Array.from(categories).sort();
  }
}

// Export singleton instance
export const usernameChecker = new UsernameChecker();
export default usernameChecker;
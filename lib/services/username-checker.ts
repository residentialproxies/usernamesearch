import sitesData from '../data/sites.json';
import { getSiteRanking } from './site-rankings';
import {
  TIMEOUTS,
  CONCURRENCY,
  USERNAME_RULES,
  HTTP_HEADERS,
  BATCH_CONFIG,
  SITE_RANKINGS,
  ERROR_MESSAGES,
  VALIDATION_MESSAGES,
  SITE_CATEGORIES,
} from '@/lib/config';

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
  private readonly REQUEST_TIMEOUT = TIMEOUTS.SITE_CHECK;
  private readonly MAX_CONCURRENT_REQUESTS = CONCURRENCY.MAX_CONCURRENT_REQUESTS;

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
      console.warn(VALIDATION_MESSAGES.INVALID_REGEX(site.regexCheck));
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
          'User-Agent': HTTP_HEADERS.USER_AGENT,
          'Accept': HTTP_HEADERS.ACCEPT,
          'Accept-Language': HTTP_HEADERS.ACCEPT_LANGUAGE,
          'Accept-Encoding': HTTP_HEADERS.ACCEPT_ENCODING,
          'DNT': HTTP_HEADERS.DNT,
          'Connection': HTTP_HEADERS.CONNECTION,
          'Upgrade-Insecure-Requests': HTTP_HEADERS.UPGRADE_INSECURE_REQUESTS,
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
          result.error = ERROR_MESSAGES.REQUEST_TIMEOUT;
        } else {
          result.error = error.message;
        }
      } else {
        result.error = ERROR_MESSAGES.UNKNOWN_ERROR;
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
      throw new Error(ERROR_MESSAGES.USERNAME_REQUIRED);
    }

    const trimmedUsername = username.trim();

    // Basic username validation
    if (trimmedUsername.length < USERNAME_RULES.MIN_LENGTH) {
      throw new Error(ERROR_MESSAGES.USERNAME_MIN_LENGTH(USERNAME_RULES.MIN_LENGTH));
    }

    if (trimmedUsername.length > USERNAME_RULES.MAX_LENGTH) {
      throw new Error(ERROR_MESSAGES.USERNAME_MAX_LENGTH(USERNAME_RULES.MAX_LENGTH));
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
        await new Promise(resolve => setTimeout(resolve, BATCH_CONFIG.BATCH_DELAY_MS));
      }
    }

    // Sort results by ranking (lower number = higher priority)
    results.sort((a, b) => {
      const rankA = a.ranking || SITE_RANKINGS.DEFAULT_RANKING;
      const rankB = b.ranking || SITE_RANKINGS.DEFAULT_RANKING;
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
      throw new Error(ERROR_MESSAGES.USERNAME_REQUIRED);
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
          category: SITE_CATEGORIES.DEFAULT,
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
      const rankA = a.ranking || SITE_RANKINGS.DEFAULT_RANKING;
      const rankB = b.ranking || SITE_RANKINGS.DEFAULT_RANKING;
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
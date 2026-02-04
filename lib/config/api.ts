/**
 * API Endpoints and Keys (Environment-based)
 * All API keys must be set via environment variables - no fallbacks
 */

// API Keys (required environment variables)
export const API_KEYS = {
  GEMINI: process.env.GEMINI_API_KEY,
  WHATSMYNAME: process.env.WHATSMYNAME_API_KEY,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  WHATSMYNAME: 'https://api.whatsmynameapp.org/api/v1/search',
} as const;

// API Configuration
export const API_CONFIG = {
  GEMINI: {
    MODEL: 'gemini-2.0-flash',
    SAFETY_SETTINGS: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ] as const,
  },
  WHATSMYNAME: {
    ACCEPT_HEADER: 'application/x-ndjson',
    API_KEY_HEADER: 'x-api-key',
  },
} as const;

// HTTP Headers
export const HTTP_HEADERS = {
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  ACCEPT: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  ACCEPT_LANGUAGE: 'en-US,en;q=0.5',
  ACCEPT_ENCODING: 'gzip, deflate',
  DNT: '1',
  CONNECTION: 'keep-alive',
  UPGRADE_INSECURE_REQUESTS: '1',
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  NDJSON: 'application/x-ndjson',
} as const;

/**
 * Validate that required API keys are set
 * Throws error if any required key is missing
 */
export function validateApiKeys(): void {
  const missing: string[] = [];

  if (!API_KEYS.GEMINI) {
    missing.push('GEMINI_API_KEY');
  }

  if (!API_KEYS.WHATSMYNAME) {
    missing.push('WHATSMYNAME_API_KEY');
  }

  if (missing.length > 0) {
    throw new Error(`Missing required API keys: ${missing.join(', ')}`);
  }
}

/**
 * Get Gemini API key (throws if not set)
 */
export function getGeminiApiKey(): string {
  if (!API_KEYS.GEMINI) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  return API_KEYS.GEMINI;
}

/**
 * Get WhatsMyName API key (throws if not set)
 */
export function getWhatsmynameApiKey(): string {
  if (!API_KEYS.WHATSMYNAME) {
    throw new Error('WHATSMYNAME_API_KEY environment variable is not set');
  }
  return API_KEYS.WHATSMYNAME;
}

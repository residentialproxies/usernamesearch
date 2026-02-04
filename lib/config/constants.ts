/**
 * Business Rules, Limits, and Timeouts
 * Centralized configuration for all magic numbers
 */

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  AI_GENERATION: 15000,
  API_REQUEST: 45000,
  SITE_CHECK: 10000,
} as const;

// Concurrency Limits
export const CONCURRENCY = {
  MAX_CONCURRENT_REQUESTS: 50,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  FREE_DAILY_LIMIT: 10,
  FREE_EXPORTS_BEFORE_VERIFICATION: 3,
  SESSION_RESET_HOURS: 24,
} as const;

// Username Validation
export const USERNAME_RULES = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 50,
  MAX_LENGTH_GENERATED: 30,
  MAX_LENGTH_PROMPT: 30,
  MIN_LENGTH_GENERATED: 3,
} as const;

// AI Generation
export const AI_GENERATION = {
  DEFAULT_COUNT: 10,
  MAX_COUNT: 50,
  MIN_COUNT: 1,
  TEMPERATURE: 0.9,
  TOP_K: 40,
  TOP_P: 0.95,
  MAX_OUTPUT_TOKENS: 2048,
} as const;

// API Key Configuration
export const API_KEY_CONFIG = {
  PREFIX: 'usc',
  RANDOM_BYTES_LENGTH: 24,
  DEFAULT_CREDITS: 500,
  TEST_CREDITS: 100,
} as const;

// Cache/Storage Keys
export const STORAGE_KEYS = {
  EXPORT_COUNT: 'usernamesearch_export_count',
  SESSION_START: 'usernamesearch_session_start',
} as const;

// Cleanup Intervals (in milliseconds)
export const CLEANUP_INTERVALS = {
  FREE_USAGE_CLEANUP: 60 * 60 * 1000, // 1 hour
} as const;

// Site Rankings (fallback for unknown sites)
export const SITE_RANKINGS = {
  DEFAULT_RANKING: 999999,
} as const;

// Batch Processing
export const BATCH_CONFIG = {
  BATCH_DELAY_MS: 100,
} as const;

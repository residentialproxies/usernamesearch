/**
 * Main Configuration Exports
 * Centralized configuration system for usernamesearch.io
 */

// Re-export all configuration modules
export * from './constants';
export * from './api';
export * from './content';

// Version info
export const CONFIG_VERSION = '1.0.0';

// Environment detection
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_TEST = process.env.NODE_ENV === 'test';

// Feature flags (can be extended based on environment)
export const FEATURE_FLAGS = {
  ENABLE_AI_GENERATION: true,
  ENABLE_EXPORTS: true,
  ENABLE_API_KEYS: true,
  ENABLE_RATE_LIMITING: true,
} as const;

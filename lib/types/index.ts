// Re-export all types from services for easy importing
export type {
  Site,
  CheckResult,
  UsernameCheckResponse
} from '../services/username-checker';

export type {
  GenerateUsernamesRequest,
  UsernameGenerationResult
} from '../services/ai-generator';

// Additional common types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  timestamp?: string;
}

export interface APIError {
  error: string;
  code: string;
  details?: any;
  timestamp?: string;
}

// Service health check response
export interface HealthCheckResponse {
  service: string;
  status: 'healthy' | 'unhealthy';
  message: string;
  timestamp: string;
}

// Rate limiting types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}
/**
 * Validation utilities for username checking and generation
 */

/**
 * Basic username validation
 */
export function validateUsername(username: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
    return { isValid: false, errors };
  }

  const trimmed = username.trim();

  if (trimmed.length < 2) {
    errors.push('Username must be at least 2 characters long');
  }

  if (trimmed.length > 50) {
    errors.push('Username must be less than 50 characters');
  }

  // Must start with letter or number
  if (!/^[a-zA-Z0-9]/.test(trimmed)) {
    errors.push('Username must start with a letter or number');
  }

  // Only allow letters, numbers, dots, underscores, and hyphens
  if (!/^[a-zA-Z0-9._-]+$/.test(trimmed)) {
    errors.push('Username can only contain letters, numbers, dots, underscores, and hyphens');
  }

  // Cannot end with dot
  if (trimmed.endsWith('.')) {
    errors.push('Username cannot end with a dot');
  }

  // Cannot have consecutive dots
  if (trimmed.includes('..')) {
    errors.push('Username cannot contain consecutive dots');
  }

  // Cannot be all numbers
  if (/^\d+$/.test(trimmed)) {
    errors.push('Username cannot be all numbers');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates username against a specific site's regex requirements
 */
export function validateUsernameForSite(
  username: string, 
  regexPattern?: string
): {
  isValid: boolean;
  error?: string;
} {
  if (!regexPattern) {
    return { isValid: true };
  }

  try {
    const regex = new RegExp(regexPattern);
    const isValid = regex.test(username);
    
    return {
      isValid,
      error: isValid ? undefined : `Username format not allowed for this site`
    };
  } catch (error) {
    console.warn(`Invalid regex pattern: ${regexPattern}`);
    return { isValid: true }; // Allow if regex is invalid
  }
}

/**
 * Sanitizes username by removing invalid characters
 */
export function sanitizeUsername(username: string): string {
  return username
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '') // Remove invalid characters
    .replace(/^[^a-z0-9]+/, '') // Remove leading non-alphanumeric
    .replace(/\.+$/, '') // Remove trailing dots
    .replace(/\.{2,}/g, '.') // Replace multiple dots with single dot
    .substring(0, 30); // Limit length
}

/**
 * Checks if username contains potentially offensive content
 */
export function containsOffensiveContent(username: string): boolean {
  const offensivePatterns = [
    // Common offensive words (basic list - expand as needed)
    /nazi/i,
    /hitler/i,
    /kill/i,
    /death/i,
    /hate/i,
    /racist/i,
    /sexual/i,
    /porn/i,
    /xxx/i,
    // Add more patterns as needed
  ];

  return offensivePatterns.some(pattern => pattern.test(username));
}

/**
 * Generates username suggestions based on a base username
 */
export function generateUsernameSuggestions(baseUsername: string, count: number = 5): string[] {
  const sanitized = sanitizeUsername(baseUsername);
  if (sanitized.length === 0) return [];

  const suggestions: string[] = [];
  const suffixes = ['123', '456', '789', '2024', '2025', 'x', 'official', 'real', 'pro'];
  const prefixes = ['the', 'real', 'official', 'mr', 'ms'];

  // Add number suffixes
  for (let i = 1; i <= Math.min(count, 3); i++) {
    suggestions.push(`${sanitized}${suffixes[i - 1]}`);
  }

  // Add prefixes
  if (count > 3) {
    for (let i = 0; i < Math.min(count - 3, 2); i++) {
      suggestions.push(`${prefixes[i]}${sanitized}`);
    }
  }

  // Add variations
  if (sanitized.length > 5 && suggestions.length < count) {
    const short = sanitized.substring(0, 5);
    suggestions.push(`${short}${Math.floor(Math.random() * 1000)}`);
  }

  return suggestions.slice(0, count);
}

/**
 * Estimates username availability likelihood based on length and complexity
 */
export function estimateAvailability(username: string): {
  likelihood: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  score: number; // 0-100
  factors: string[];
} {
  const factors: string[] = [];
  let score = 50; // Start at neutral

  // Length factor
  if (username.length <= 4) {
    score -= 30;
    factors.push('Very short usernames are usually taken');
  } else if (username.length <= 6) {
    score -= 15;
    factors.push('Short usernames are often taken');
  } else if (username.length >= 15) {
    score += 20;
    factors.push('Longer usernames are more likely available');
  }

  // Complexity factor
  const hasNumbers = /\d/.test(username);
  const hasSpecialChars = /[._-]/.test(username);
  const isAllLowercase = username === username.toLowerCase();

  if (hasNumbers) {
    score += 10;
    factors.push('Contains numbers (increases availability)');
  }

  if (hasSpecialChars) {
    score += 5;
    factors.push('Contains special characters');
  }

  if (!isAllLowercase) {
    score -= 5;
    factors.push('Mixed case (often normalized to lowercase)');
  }

  // Common word penalty
  const commonWords = ['user', 'admin', 'test', 'hello', 'world', 'cool', 'awesome', 'best'];
  const lowerUsername = username.toLowerCase();
  
  if (commonWords.some(word => lowerUsername.includes(word))) {
    score -= 20;
    factors.push('Contains common words');
  }

  // Dictionary word check (simplified)
  if (/^[a-z]+$/.test(lowerUsername) && lowerUsername.length <= 8) {
    score -= 15;
    factors.push('Appears to be a dictionary word');
  }

  // Normalize score
  score = Math.max(0, Math.min(100, score));

  let likelihood: 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
  if (score >= 80) likelihood = 'very_high';
  else if (score >= 60) likelihood = 'high';
  else if (score >= 40) likelihood = 'medium';
  else if (score >= 20) likelihood = 'low';
  else likelihood = 'very_low';

  return { likelihood, score, factors };
}
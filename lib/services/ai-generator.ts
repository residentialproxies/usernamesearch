import { z } from 'zod';
import {
  API_ENDPOINTS,
  API_CONFIG,
  TIMEOUTS,
  AI_GENERATION,
  USERNAME_RULES,
  AI_STYLES,
  PLATFORM_PROMPTS,
  FALLBACK_PATTERNS,
  VALIDATION_MESSAGES,
  HEALTH_MESSAGES,
} from '@/lib/config';

// Request/Response schemas
const GenerateUsernamesRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  count: z.number().min(AI_GENERATION.MIN_COUNT).max(AI_GENERATION.MAX_COUNT).default(AI_GENERATION.DEFAULT_COUNT),
  style: z.enum(['creative', 'professional', 'casual', 'gaming', 'tech', 'artistic']).optional(),
  keywords: z.array(z.string()).optional(),
  avoid: z.array(z.string()).optional(), // Words/patterns to avoid
  maxLength: z.number().min(USERNAME_RULES.MIN_LENGTH_GENERATED).max(USERNAME_RULES.MAX_LENGTH_GENERATED).optional(),
  includeNumbers: z.boolean().optional(),
  includeUnderscores: z.boolean().optional(),
});

const GeminiResponseSchema = z.object({
  candidates: z.array(z.object({
    content: z.object({
      parts: z.array(z.object({
        text: z.string()
      }))
    })
  }))
});

export type GenerateUsernamesRequest = z.infer<typeof GenerateUsernamesRequestSchema>;

export interface UsernameGenerationResult {
  usernames: string[];
  prompt: string;
  style?: string;
  metadata: {
    totalGenerated: number;
    filtered: number;
    validUsernames: number;
    generationTime: number;
    usingFallback?: boolean;
  };
}

class AIUsernameGenerator {
  private readonly apiKey: string;
  private readonly requestTimeout = TIMEOUTS.AI_GENERATION;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  /**
   * Validates if a username meets basic criteria
   */
  private isValidUsername(username: string, maxLength?: number): boolean {
    // Remove any surrounding quotes or special characters
    const cleaned = username.trim().replace(/^["']|["']$/g, '');
    
    // Basic validation
    if (cleaned.length < USERNAME_RULES.MIN_LENGTH || cleaned.length > (maxLength || USERNAME_RULES.MAX_LENGTH_GENERATED)) {
      return false;
    }

    // Must start with letter or number
    if (!/^[a-zA-Z0-9]/.test(cleaned)) {
      return false;
    }

    // Only allow letters, numbers, underscores, dots, and hyphens
    if (!/^[a-zA-Z0-9._-]+$/.test(cleaned)) {
      return false;
    }

    // Cannot end with dot
    if (cleaned.endsWith('.')) {
      return false;
    }

    // Cannot have consecutive dots
    if (cleaned.includes('..')) {
      return false;
    }

    return true;
  }

  /**
   * Filters out usernames that contain words to avoid
   */
  private filterByAvoidList(usernames: string[], avoid?: string[]): string[] {
    if (!avoid || avoid.length === 0) return usernames;

    const avoidLowerCase = avoid.map(word => word.toLowerCase());
    
    return usernames.filter(username => {
      const usernameLower = username.toLowerCase();
      return !avoidLowerCase.some(word => usernameLower.includes(word));
    });
  }

  /**
   * Generates creative prompt for Gemini API based on user requirements
   */
  private createPrompt(request: GenerateUsernamesRequest): string {
    const { prompt, count, style, keywords, maxLength, includeNumbers, includeUnderscores } = request;

    let systemPrompt = `You are a creative username generator. Generate ${count} unique, creative usernames based on the following requirements:\n\n`;
    
    systemPrompt += `Main theme/prompt: "${prompt}"\n\n`;

    if (style) {
      systemPrompt += `Style: ${AI_STYLES[style]}\n`;
    }

    if (keywords && keywords.length > 0) {
      systemPrompt += `Try to incorporate these keywords: ${keywords.join(', ')}\n`;
    }

    systemPrompt += `\nConstraints:\n`;
    systemPrompt += `- Each username must be ${maxLength ? `${USERNAME_RULES.MIN_LENGTH}-${maxLength}` : `${USERNAME_RULES.MIN_LENGTH}-${USERNAME_RULES.MAX_LENGTH_GENERATED}`} characters long\n`;
    systemPrompt += `- Use only letters, numbers${includeUnderscores ? ', underscores' : ''}${includeNumbers === false ? ' (no numbers unless specifically needed)' : ''}\n`;
    systemPrompt += `- Start with a letter or number\n`;
    systemPrompt += `- Make each username unique and memorable\n`;
    systemPrompt += `- Avoid common/generic usernames\n`;
    systemPrompt += `- Do not use offensive or inappropriate content\n\n`;

    systemPrompt += `Format: Return ONLY the usernames, one per line, with no additional text, numbers, or explanations. Example format:\n`;
    systemPrompt += `cooljohnny\n`;
    systemPrompt += `techguru95\n`;
    systemPrompt += `artlover\n`;

    return systemPrompt;
  }

  /**
   * Fallback username generation using predefined patterns
   */
  private generateFallbackUsernames(request: GenerateUsernamesRequest): string[] {
    const { keywords, style, count } = request;
    const keywordList = keywords || [];
    
    // Predefined suffixes and prefixes based on style
    const stylePrefixes = FALLBACK_PATTERNS.PREFIXES;
    const styleSuffixes = FALLBACK_PATTERNS.SUFFIXES;
    
    const prefixes = stylePrefixes[style as keyof typeof stylePrefixes] || stylePrefixes.creative;
    const suffixes = styleSuffixes[style as keyof typeof styleSuffixes] || styleSuffixes.creative;
    
    const usernames: string[] = [];
    const used = new Set<string>();
    
    // Generate combinations
    for (let i = 0; i < count && usernames.length < count; i++) {
      let username = '';
      
      if (keywordList.length > 0 && Math.random() > 0.3) {
        // Use keywords
        const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
        if (Math.random() > 0.5) {
          username = keyword + suffixes[Math.floor(Math.random() * suffixes.length)];
        } else {
          username = prefixes[Math.floor(Math.random() * prefixes.length)] + keyword;
        }
      } else {
        // Generate random combination
        username = prefixes[Math.floor(Math.random() * prefixes.length)] + 
                  suffixes[Math.floor(Math.random() * suffixes.length)];
      }
      
      // Add random number occasionally
      if (Math.random() > 0.7) {
        username += Math.floor(Math.random() * 99) + 1;
      }
      
      if (!used.has(username) && this.isValidUsername(username)) {
        used.add(username);
        usernames.push(username);
      }
    }
    
    return usernames;
  }

  /**
   * Makes API call to Gemini to generate usernames
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set')
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

    try {
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: AI_GENERATION.TEMPERATURE,
          topK: AI_GENERATION.TOP_K,
          topP: AI_GENERATION.TOP_P,
          maxOutputTokens: AI_GENERATION.MAX_OUTPUT_TOKENS,
        },
        safetySettings: API_CONFIG.GEMINI.SAFETY_SETTINGS.map(s => ({
          category: s.category,
          threshold: s.threshold,
        })),
      };

      const response = await fetch(API_ENDPOINTS.GEMINI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const parsedResponse = GeminiResponseSchema.parse(data);

      if (!parsedResponse.candidates || parsedResponse.candidates.length === 0) {
        throw new Error(VALIDATION_MESSAGES.NO_CANDIDATES);
      }

      return parsedResponse.candidates[0].content.parts[0].text;

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Gemini API took too long to respond');
        }
        throw error;
      }
      throw new Error('Unknown error occurred while calling Gemini API');
    }
  }

  /**
   * Parses the Gemini response and extracts usernames
   */
  private parseUsernameResponse(response: string): string[] {
    const lines = response.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .filter(line => !line.includes(':') && !line.includes('Here are'))
      .map(line => {
        // Remove any numbering, bullets, or formatting
        return line.replace(/^\d+[\.\)]\s*/, '')
                  .replace(/^[-*]\s*/, '')
                  .replace(/^[•·]\s*/, '')
                  .trim();
      })
      .filter(line => line.length > 0);

    return Array.from(new Set(lines)); // Remove duplicates
  }

  /**
   * Generates usernames using Gemini AI
   */
  async generateUsernames(request: GenerateUsernamesRequest): Promise<UsernameGenerationResult> {
    const startTime = Date.now();
    
    try {
      // Validate request
      const validatedRequest = GenerateUsernamesRequestSchema.parse(request);
      
      let usernames: string[] = [];
      let totalGenerated = 0;
      let usingFallback = false;
      
      try {
        // Try to use Gemini AI first
        const prompt = this.createPrompt(validatedRequest);
        const response = await this.callGeminiAPI(prompt);
        usernames = this.parseUsernameResponse(response);
        totalGenerated = usernames.length;
      } catch (aiError) {
        console.warn(VALIDATION_MESSAGES.AI_GENERATION_FAILED, aiError);
        // Use fallback generation
        usernames = this.generateFallbackUsernames(validatedRequest);
        totalGenerated = usernames.length;
        usingFallback = true;
      }
      
      // Filter by avoid list
      if (validatedRequest.avoid) {
        usernames = this.filterByAvoidList(usernames, validatedRequest.avoid);
      }
      
      // Validate usernames
      const validUsernames = usernames
        .filter(username => this.isValidUsername(username, validatedRequest.maxLength))
        .slice(0, validatedRequest.count); // Ensure we don't exceed requested count
      
      const endTime = Date.now();
      
      return {
        usernames: validUsernames,
        prompt: validatedRequest.prompt,
        style: validatedRequest.style,
        metadata: {
          totalGenerated,
          filtered: totalGenerated - usernames.length,
          validUsernames: validUsernames.length,
          generationTime: endTime - startTime,
          usingFallback
        }
      };

    } catch (error) {
      console.error('Username generation error:', error);
      
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid request: ${error.errors.map(e => e.message).join(', ')}`);
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Unknown error occurred during username generation');
    }
  }

  /**
   * Generates usernames based on existing username patterns
   */
  async generateSimilarUsernames(
    baseUsername: string, 
    count: number = 10
  ): Promise<UsernameGenerationResult> {
    const prompt = `Create variations and similar usernames based on "${baseUsername}". ` +
                  `Keep the same style and feel but make them unique alternatives.`;
    
    return this.generateUsernames({
      prompt,
      count,
      style: 'creative',
      maxLength: Math.max(baseUsername.length + 5, 30)
    });
  }

  /**
   * Generates usernames for specific platforms
   */
  async generateForPlatform(
    platform: string,
    interests: string[],
    count: number = AI_GENERATION.DEFAULT_COUNT
  ): Promise<UsernameGenerationResult> {
    const platformPrompt = PLATFORM_PROMPTS[platform.toLowerCase()] ||
                          `Generate usernames suitable for ${platform}`;

    const prompt = `${platformPrompt}. Interests: ${interests.join(', ')}`;

    return this.generateUsernames({
      prompt,
      count,
      style: platform.toLowerCase() === 'linkedin' ? 'professional' : 'creative',
      keywords: interests.slice(0, 3), // Limit to top 3 interests
    });
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; message: string }> {
    try {
      const testResult = await this.generateUsernames({
        prompt: 'test',
        count: 1,
        style: 'casual'
      });

      if (testResult.usernames.length > 0) {
        return { status: 'healthy', message: HEALTH_MESSAGES.AI_HEALTHY };
      } else {
        return { status: 'unhealthy', message: HEALTH_MESSAGES.AI_UNHEALTHY_NO_RESULTS };
      }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

// Export singleton instance
export const aiUsernameGenerator = new AIUsernameGenerator();
export default aiUsernameGenerator;

import { z } from 'zod';

// Environment variable for Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Request/Response schemas
const GenerateUsernamesRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  count: z.number().min(1).max(50).default(10),
  style: z.enum(['creative', 'professional', 'casual', 'gaming', 'tech', 'artistic']).optional(),
  keywords: z.array(z.string()).optional(),
  avoid: z.array(z.string()).optional(), // Words/patterns to avoid
  maxLength: z.number().min(3).max(30).optional(),
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
  };
}

class AIUsernameGenerator {
  private readonly apiKey: string;
  private readonly requestTimeout = 15000; // 15 seconds

  constructor() {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    this.apiKey = GEMINI_API_KEY;
  }

  /**
   * Validates if a username meets basic criteria
   */
  private isValidUsername(username: string, maxLength?: number): boolean {
    // Remove any surrounding quotes or special characters
    const cleaned = username.trim().replace(/^["']|["']$/g, '');
    
    // Basic validation
    if (cleaned.length < 2 || cleaned.length > (maxLength || 30)) {
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
      const styleGuides = {
        creative: 'Be imaginative and unique, mixing words in unexpected ways',
        professional: 'Keep it business-appropriate and trustworthy',
        casual: 'Make it friendly and approachable',
        gaming: 'Create something that sounds cool for gaming platforms',
        tech: 'Use tech-related terms and make it sound innovative',
        artistic: 'Make it sound creative and expressive'
      };
      systemPrompt += `Style: ${styleGuides[style]}\n`;
    }

    if (keywords && keywords.length > 0) {
      systemPrompt += `Try to incorporate these keywords: ${keywords.join(', ')}\n`;
    }

    systemPrompt += `\nConstraints:\n`;
    systemPrompt += `- Each username must be ${maxLength ? `2-${maxLength}` : '2-30'} characters long\n`;
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
   * Makes API call to Gemini to generate usernames
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
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
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        throw new Error('No response from Gemini API');
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
      
      // Create prompt for Gemini
      const prompt = this.createPrompt(validatedRequest);
      
      // Make API call
      const response = await this.callGeminiAPI(prompt);
      
      // Parse response
      let usernames = this.parseUsernameResponse(response);
      const totalGenerated = usernames.length;
      
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
          generationTime: endTime - startTime
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
    count: number = 10
  ): Promise<UsernameGenerationResult> {
    const platformStyles: Record<string, string> = {
      instagram: 'Create Instagram-friendly usernames that are catchy and memorable',
      tiktok: 'Generate fun, trendy usernames perfect for TikTok',
      twitter: 'Make professional yet engaging usernames for Twitter',
      linkedin: 'Create professional, business-appropriate usernames',
      github: 'Generate developer-friendly usernames for GitHub',
      gaming: 'Create cool, edgy usernames for gaming platforms',
      youtube: 'Make memorable usernames perfect for content creators'
    };

    const platformPrompt = platformStyles[platform.toLowerCase()] || 
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
        return { status: 'healthy', message: 'AI generator is working properly' };
      } else {
        return { status: 'unhealthy', message: 'AI generator returned no results' };
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
import { NextRequest, NextResponse } from 'next/server';
import { aiUsernameGenerator, GenerateUsernamesRequest } from '@/lib/services/ai-generator';
import { z } from 'zod';

// Extended request schema for API endpoint
const GenerateAPIRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  count: z.number().min(1).max(50).default(10),
  style: z.enum(['creative', 'professional', 'casual', 'gaming', 'tech', 'artistic']).optional(),
  keywords: z.array(z.string()).optional(),
  avoid: z.array(z.string()).optional(),
  maxLength: z.number().min(3).max(30).optional(),
  includeNumbers: z.boolean().optional(),
  includeUnderscores: z.boolean().optional(),
  // API-specific fields
  platform: z.string().optional(), // For platform-specific generation
  baseUsername: z.string().optional(), // For generating similar usernames
});

type GenerateAPIRequest = z.infer<typeof GenerateAPIRequestSchema>;

// Rate limiting
const generateRequestCounts = new Map<string, { count: number; resetTime: number }>();
const GENERATE_RATE_LIMIT_REQUESTS = 5; // requests per minute for AI generation
const GENERATE_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkGenerateRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = generateRequestCounts.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    generateRequestCounts.set(clientId, { count: 1, resetTime: now + GENERATE_RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= GENERATE_RATE_LIMIT_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

function getClientId(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0] || realIp || 'unknown';
}

/**
 * POST /api/generate
 * 
 * Generates creative usernames using AI
 * 
 * Body:
 * {
 *   "prompt": "string", // Required: description of desired username
 *   "count": number, // Optional: number of usernames to generate (1-50, default 10)
 *   "style": "creative|professional|casual|gaming|tech|artistic", // Optional: generation style
 *   "keywords": ["string"], // Optional: keywords to incorporate
 *   "avoid": ["string"], // Optional: words to avoid
 *   "maxLength": number, // Optional: maximum length (3-30)
 *   "includeNumbers": boolean, // Optional: allow numbers
 *   "includeUnderscores": boolean, // Optional: allow underscores
 *   "platform": "string", // Optional: generate for specific platform
 *   "baseUsername": "string" // Optional: generate similar usernames
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientId(request);
    if (!checkGenerateRateLimit(clientId)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded for AI generation. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Parse and validate request
    let body: GenerateAPIRequest;
    try {
      const rawBody = await request.json();
      body = GenerateAPIRequestSchema.parse(rawBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Invalid request data',
            code: 'VALIDATION_ERROR',
            details: error.errors
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    const { platform, baseUsername, ...generateRequest } = body;

    let result;

    try {
      // Handle special generation types
      if (baseUsername) {
        // Generate similar usernames
        result = await aiUsernameGenerator.generateSimilarUsernames(
          baseUsername, 
          generateRequest.count || 10
        );
      } else if (platform && generateRequest.keywords) {
        // Generate for specific platform
        result = await aiUsernameGenerator.generateForPlatform(
          platform,
          generateRequest.keywords,
          generateRequest.count || 10
        );
      } else {
        // Standard generation
        result = await aiUsernameGenerator.generateUsernames(generateRequest as GenerateUsernamesRequest);
      }

      return NextResponse.json({
        success: true,
        ...result
      });

    } catch (generationError) {
      console.error('Username generation failed:', generationError);
      
      if (generationError instanceof Error) {
        // Check for specific API errors
        if (generationError.message.includes('API key')) {
          return NextResponse.json(
            { 
              error: 'AI service configuration error',
              code: 'API_KEY_ERROR'
            },
            { status: 500 }
          );
        }
        
        if (generationError.message.includes('timeout')) {
          return NextResponse.json(
            { 
              error: 'AI service timeout. Please try again.',
              code: 'TIMEOUT_ERROR'
            },
            { status: 408 }
          );
        }

        return NextResponse.json(
          { 
            error: generationError.message,
            code: 'GENERATION_ERROR'
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to generate usernames',
          code: 'UNKNOWN_GENERATION_ERROR'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/generate?health=true
 * 
 * Health check for AI generation service
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const healthCheck = searchParams.get('health');

    if (healthCheck === 'true') {
      const health = await aiUsernameGenerator.healthCheck();
      
      return NextResponse.json({
        service: 'AI Username Generator',
        ...health,
        timestamp: new Date().toISOString()
      }, { 
        status: health.status === 'healthy' ? 200 : 503 
      });
    }

    return NextResponse.json({
      service: 'AI Username Generator',
      endpoints: {
        generate: 'POST /api/generate - Generate usernames using AI',
        health: 'GET /api/generate?health=true - Service health check'
      },
      examples: {
        basic: {
          prompt: 'Cool gaming username',
          count: 10,
          style: 'gaming'
        },
        advanced: {
          prompt: 'Professional tech username',
          count: 5,
          style: 'professional',
          keywords: ['tech', 'developer'],
          maxLength: 20,
          includeNumbers: true
        },
        platform: {
          prompt: 'Creative username',
          platform: 'instagram',
          keywords: ['art', 'design'],
          count: 8
        }
      }
    });

  } catch (error) {
    console.error('Generate API GET error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve service information',
        code: 'INFO_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function PUT() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}
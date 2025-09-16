import { NextRequest, NextResponse } from 'next/server';
import { usernameChecker } from '@/lib/services/username-checker';
import { z } from 'zod';

// Request validation schema
const CheckUsernameRequestSchema = z.object({
  username: z.string()
    .min(2, 'Username must be at least 2 characters long')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Username can only contain letters, numbers, dots, underscores, and hyphens'),
  sites: z.array(z.string()).optional(), // Optional array of specific sites to check
  categories: z.array(z.string()).optional(), // Optional array of categories to filter by
  limit: z.number().min(1).max(500).optional(), // Optional limit on number of sites to check
});

type CheckUsernameRequest = z.infer<typeof CheckUsernameRequestSchema>;

// Rate limiting (simple in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const clientData = requestCounts.get(clientId);

  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

function getClientId(request: NextRequest): string {
  // Get client IP or use a default identifier
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0] || realIp || 'unknown';
}

/**
 * POST /api/check
 * 
 * Checks username availability across multiple platforms
 * 
 * Body:
 * {
 *   "username": "string", // Required: username to check
 *   "sites": ["string"], // Optional: specific sites to check
 *   "categories": ["string"], // Optional: filter by categories
 *   "limit": number // Optional: limit number of sites (max 500)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientId(request);
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body: CheckUsernameRequest;
    try {
      const rawBody = await request.json();
      body = CheckUsernameRequestSchema.parse(rawBody);
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

    const { username, sites, categories, limit } = body;

    // If specific sites are requested, check only those
    if (sites && sites.length > 0) {
      const result = await usernameChecker.checkUsernameForSites(username, sites);
      
      // Apply limit if specified
      if (limit && limit < result.results.length) {
        result.results = result.results.slice(0, limit);
        result.summary = {
          total: result.results.length,
          available: result.results.filter(r => r.available === true).length,
          unavailable: result.results.filter(r => r.available === false).length,
          errors: result.results.filter(r => r.available === null).length,
        };
      }

      return NextResponse.json(result);
    }

    // Check all sites
    const result = await usernameChecker.checkUsername(username);

    // Filter by categories if specified
    if (categories && categories.length > 0) {
      const categorySet = new Set(categories.map(c => c.toLowerCase()));
      result.results = result.results.filter(r => 
        categorySet.has(r.category.toLowerCase())
      );
    }

    // Apply limit if specified
    if (limit && limit < result.results.length) {
      result.results = result.results.slice(0, limit);
    }

    // Recalculate summary after filtering
    result.summary = {
      total: result.results.length,
      available: result.results.filter(r => r.available === true).length,
      unavailable: result.results.filter(r => r.available === false).length,
      errors: result.results.filter(r => r.available === null).length,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Username check error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: error.message,
          code: 'USERNAME_CHECK_ERROR'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error occurred while checking username',
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/check?info=true
 * 
 * Returns information about available sites and categories
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const info = searchParams.get('info');

    if (info === 'true') {
      const sites = usernameChecker.getSites();
      const categories = usernameChecker.getCategories();
      
      return NextResponse.json({
        totalSites: Object.keys(sites).length,
        categories: categories,
        sampleSites: Object.keys(sites).slice(0, 20), // Return first 20 as sample
      });
    }

    return NextResponse.json(
      { 
        error: 'Invalid request. Use POST to check usernames or GET with ?info=true for site information.',
        code: 'INVALID_REQUEST_METHOD'
      },
      { status: 400 }
    );

  } catch (error) {
    console.error('API info error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve site information',
        code: 'INFO_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
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
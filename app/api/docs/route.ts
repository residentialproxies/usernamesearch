import { NextRequest, NextResponse } from 'next/server'

const API_DOCUMENTATION = {
  title: 'UsernameSearch.io API Documentation',
  version: '1.0.0',
  baseUrl: 'https://usernamesearch.io/api',
  authentication: {
    type: 'API Key',
    header: 'X-API-Key',
    description: 'Include your API key in the X-API-Key header for all requests'
  },
  rateLimit: {
    requests: 500,
    period: 'per API key',
    description: 'Each API key allows 500 requests total'
  },
  endpoints: [
    {
      method: 'POST',
      path: '/check',
      description: 'Check username availability across all supported platforms',
      parameters: {
        username: {
          type: 'string',
          required: true,
          description: 'The username to check (3-30 characters)',
          example: 'johndoe'
        },
        platforms: {
          type: 'array',
          required: false,
          description: 'Specific platforms to check (Pro only). Leave empty to check all.',
          example: ['instagram', 'twitter', 'github']
        },
        rescan: {
          type: 'boolean',
          required: false,
          description: 'Force a fresh scan instead of using cached results',
          example: false
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key-here'
      },
      example: {
        request: {
          username: 'johndoe',
          platforms: ['instagram', 'twitter'],
          rescan: false
        },
        response: {
          success: true,
          username: 'johndoe',
          stats: {
            total: 1500,
            available: 847,
            taken: 653,
            totalAvailable: 847
          },
          results: {
            available: [
              {
                name: 'Instagram',
                domain: 'instagram.com',
                url: 'https://instagram.com/johndoe',
                available: true,
                category: 'Social Networks',
                rank: 1
              }
            ],
            taken: [],
            unknown: []
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/generate',
      description: 'Generate AI-powered username suggestions',
      parameters: {
        type: {
          type: 'string',
          required: true,
          description: 'Type of generation: "username" or "brand"',
          example: 'username'
        },
        keywords: {
          type: 'string',
          required: true,
          description: 'Keywords to base the generation on',
          example: 'tech ninja'
        },
        style: {
          type: 'string',
          required: false,
          description: 'Style preference: creative, professional, gaming, minimal',
          example: 'creative'
        },
        count: {
          type: 'number',
          required: false,
          description: 'Number of suggestions to generate (1-20)',
          example: 10
        }
      },
      example: {
        request: {
          type: 'username',
          keywords: 'tech ninja',
          style: 'gaming',
          count: 5
        },
        response: {
          success: true,
          type: 'username',
          suggestions: [
            'TechNinja2025',
            'NinjaBytes',
            'CyberNinja',
            'TechShadow',
            'NinjaCore'
          ]
        }
      }
    },
    {
      method: 'GET',
      path: '/platforms',
      description: 'Get list of all supported platforms',
      parameters: {
        tier: {
          type: 'string',
          required: false,
          description: 'Filter by tier: "free" or "pro"',
          example: 'free'
        },
        category: {
          type: 'string',
          required: false,
          description: 'Filter by category',
          example: 'Social Networks'
        }
      },
      example: {
        response: {
          success: true,
          platforms: [
            {
              name: 'Instagram',
              domain: 'instagram.com',
              category: 'Social Networks',
              tier: 'free',
              rank: 1
            }
          ],
          total: 1500
        }
      }
    },
    {
      method: 'GET',
      path: '/platforms/:platform',
      description: 'Get detailed information about a specific platform',
      parameters: {
        platform: {
          type: 'string',
          required: true,
          description: 'Platform identifier (e.g., "instagram")',
          example: 'instagram'
        }
      },
      example: {
        response: {
          success: true,
          platform: {
            name: 'Instagram',
            domain: 'instagram.com',
            category: 'Social Networks',
            tier: 'free',
            rank: 1,
            monthlyVisits: '2.4B',
            description: 'Photo and video sharing social network',
            usernameRules: {
              minLength: 1,
              maxLength: 30,
              allowedCharacters: 'Letters, numbers, periods, underscores',
              caseSensitive: false
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/stats',
      description: 'Get your API usage statistics',
      headers: {
        'X-API-Key': 'your-api-key-here'
      },
      example: {
        response: {
          success: true,
          apiKey: 'usc_xxx...',
          plan: 'pro',
          usage: {
            total: 500,
            used: 127,
            remaining: 373
          },
          history: [
            {
              date: '2025-01-15',
              requests: 45
            }
          ]
        }
      }
    }
  ],
  errors: [
    {
      code: 400,
      message: 'Bad Request',
      description: 'Invalid parameters or missing required fields'
    },
    {
      code: 401,
      message: 'Unauthorized',
      description: 'Invalid or missing API key'
    },
    {
      code: 429,
      message: 'Too Many Requests',
      description: 'Rate limit exceeded'
    },
    {
      code: 500,
      message: 'Internal Server Error',
      description: 'Server error, please try again later'
    }
  ],
  codeExamples: {
    curl: `curl -X POST https://usernamesearch.io/api/check \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{"username": "johndoe"}'`,
    
    javascript: `const response = await fetch('https://usernamesearch.io/api/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    username: 'johndoe'
  })
});

const data = await response.json();
console.log(data);`,
    
    python: `import requests

response = requests.post(
    'https://usernamesearch.io/api/check',
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': 'your-api-key'
    },
    json={'username': 'johndoe'}
)

data = response.json()
print(data)`
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(API_DOCUMENTATION)
}
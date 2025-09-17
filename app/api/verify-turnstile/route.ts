import { NextRequest, NextResponse } from 'next/server'

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

/**
 * POST /api/verify-turnstile
 * Verify Cloudflare Turnstile token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      )
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY
    
    if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Verify token with Cloudflare
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        // Optional: include user's IP
        remoteip: request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  request.ip || 
                  '127.0.0.1'
      }),
    })

    const verifyData: TurnstileResponse = await verifyResponse.json()

    if (verifyData.success) {
      return NextResponse.json({
        success: true,
        message: 'Verification successful'
      })
    } else {
      console.error('Turnstile verification failed:', verifyData['error-codes'])
      
      // Map common error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        'missing-input-secret': 'Server configuration error',
        'invalid-input-secret': 'Server configuration error',
        'missing-input-response': 'Verification token missing',
        'invalid-input-response': 'Invalid verification token',
        'bad-request': 'Invalid request format',
        'timeout-or-duplicate': 'Verification expired or already used',
        'internal-error': 'Verification service temporarily unavailable'
      }

      const errorCode = verifyData['error-codes']?.[0] || 'unknown-error'
      const userMessage = errorMessages[errorCode] || 'Verification failed. Please try again.'

      return NextResponse.json(
        { 
          success: false, 
          error: userMessage,
          code: errorCode 
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Verification service unavailable. Please try again later.' 
      },
      { status: 500 }
    )
  }
}
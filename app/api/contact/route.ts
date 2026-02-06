import { NextRequest, NextResponse } from 'next/server'
import { getD1Database } from '@/lib/server/d1'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/server/rate-limit'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  type: 'general' | 'support' | 'sales' | 'bug'
}

// Input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets (XSS prevention)
    .replace(/[\r\n]+/g, ' ') // Prevent header injection
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    let db
    try {
      db = await getD1Database()
    } catch {
      // DB not available, skip rate limiting
    }
    const clientIP = getClientIP(request)

    if (db) {
      const rateLimit = await checkRateLimit(
        db,
        `contact:${clientIP}`,
        RATE_LIMITS.CONTACT.limit,
        RATE_LIMITS.CONTACT.windowMs
      )

      if (!rateLimit.allowed) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
              'X-RateLimit-Remaining': '0',
            },
          }
        )
      }
    }

    const body: ContactFormData = await request.json()
    const { name, email, subject, message, type = 'general' } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum allowed' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: email.toLowerCase().trim(),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      type,
    }

    // In production, you would:
    // 1. Send email notification
    // 2. Store in database
    // 3. Create support ticket
    // 4. Send confirmation email to user

    // For now, we'll log and return success
    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString()
    })

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      ticketId: `USC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
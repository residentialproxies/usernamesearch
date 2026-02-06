import { NextRequest, NextResponse } from 'next/server'
import { API_ENDPOINTS, API_CONFIG, getGeminiApiKey } from '@/lib/config'

async function callGeminiAPI(prompt: string) {
  const apiKey = getGeminiApiKey()
  // Use header-based authentication instead of URL parameter for security
  const apiUrl = API_ENDPOINTS.GEMINI

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1024,
        },
        safetySettings: API_CONFIG.GEMINI.SAFETY_SETTINGS.map(s => ({
          category: s.category,
          threshold: s.threshold,
        })),
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No content generated')
    }

    return generatedText
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords, style = 'modern', industry = 'general', count = 10 } = body

    if (!keywords || typeof keywords !== 'string') {
      return NextResponse.json(
        { error: 'Keywords are required' },
        { status: 400 }
      )
    }

    const styleDescriptions: Record<string, string> = {
      modern: 'modern, tech-savvy, innovative',
      elegant: 'elegant, sophisticated, premium',
      playful: 'fun, creative, memorable',
      natural: 'organic, eco-friendly, authentic',
      'one-word': 'single word, unique, brandable',
      minimal: 'simple, clean, minimalist'
    }

    const prompt = `You are a professional brand naming expert. Generate ${count} unique, creative, and memorable brand names based on these requirements:

Keywords: ${keywords}
Style: ${styleDescriptions[style] || style}
Industry: ${industry}

Requirements:
1. Names should be 1-2 words maximum
2. Easy to pronounce and spell
3. Memorable and unique
4. Available as a domain name (avoid common words)
5. No numbers or special characters
6. Professional and brandable
7. Relevant to the keywords and industry

Return ONLY the brand names as a comma-separated list, nothing else.
Example format: BrandOne, BrandTwo, BrandThree`

    const generatedText = await callGeminiAPI(prompt)
    
    const brandNames = generatedText
      .split(',')
      .map((name: string) => name.trim())
      .filter((name: string) => name.length > 0)
      .slice(0, count)

    return NextResponse.json({
      success: true,
      brands: brandNames,
      keywords,
      style,
      industry,
      count: brandNames.length
    })

  } catch (error) {
    console.error('Brand generator error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate brand names',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

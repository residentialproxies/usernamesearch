import { NextRequest, NextResponse } from 'next/server'
import {
  buildGoogleUsernameQuery,
  clampGoogleNum,
  formatGoogleErrorMessage,
  getRotatedKeyOrder,
  isRetryableGoogleError,
  parseGoogleApiKeys,
} from '@/lib/services/google-search'

const GOOGLE_SEARCH_API_URL = 'https://www.googleapis.com/customsearch/v1'

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get('username') || ''
  const numParam = searchParams.get('num')

  if (!username || username.length < 2 || username.length > 50) {
    return NextResponse.json({ error: 'username must be 2-50 characters' }, { status: 400 })
  }

  const num = clampGoogleNum(Number(numParam ?? '5'), 5)

  // Keys and CX
  const envKeys = [
    ...parseGoogleApiKeys(process.env.GOOGLE_CUSTOM_SEARCH_API_KEYS),
    ...parseGoogleApiKeys(process.env.GOOGLE_CUSTOM_SEARCH_API_KEY),
  ]

  const fallbackKeys = parseGoogleApiKeys(
    [
      process.env.GOOGLE_CUSTOM_SEARCH_API_KEYS,
      // user-supplied defaults for convenience; override via env in prod
      'AIzaSyDXz-Uaot1KB_gQdODxh4uGtUvsGCsCF9A',
      'AIzaSyA8jg36o8xZFSE3Dqm1T6rOFkNAir-ZoI8',
      'AIzaSyAeXNHDNm_EX50mjr_ATGzbGti5mgocytI',
      'AIzaSyBiXmz1fHdGhvmOJhawr_UBwo5Lz4BJ5_g',
      'AIzaSyCiWND74Uoo8I1XGC71u7qE2tFwd0ak6gE',
      'AIzaSyDfMuVFquXLfAFP70O_6se164tcaz1ljh0',
      'AIzaSyDuCZDzcs9YWJ6p2vrD12Lj_8qeuJ1fEGE',
      'AIzaSyAMwM1tt316f0lrfJscWnRLmRgW5aW6RgI',
      'AIzaSyAVoVN5ZQa_HHTuwv4FO0QeApf8aqg4Kuw',
    ]
      .filter(Boolean)
      .join(',')
  )

  const keys = envKeys.length > 0 ? envKeys : fallbackKeys
  const cx = process.env.GOOGLE_CUSTOM_SEARCH_CX || '759c3a793704d498b'

  if (keys.length === 0 || !cx) {
    return NextResponse.json(
      { error: 'Google Custom Search API credentials missing (set GOOGLE_CUSTOM_SEARCH_CX and keys).' },
      { status: 500 }
    )
  }

  try {
    const searchQuery = buildGoogleUsernameQuery(username)
    const keyOrder = getRotatedKeyOrder(keys, username.toLowerCase())
    let lastError: { status: number; message: string } | null = null

    for (let attempt = 0; attempt < keyOrder.length; attempt++) {
      const { key, index } = keyOrder[attempt]

      const url = new URL(GOOGLE_SEARCH_API_URL)
      url.searchParams.set('key', key)
      url.searchParams.set('cx', cx)
      url.searchParams.set('q', searchQuery)
      url.searchParams.set('num', String(num))
      url.searchParams.set('safe', 'active')
      url.searchParams.set(
        'fields',
        ['items(title,link,displayLink,snippet,formattedUrl)', 'searchInformation(totalResults,searchTime)'].join(',')
      )

      const response = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(
          {
            query: searchQuery,
            totalResults: data.searchInformation?.totalResults,
            searchTime: data.searchInformation?.searchTime,
            items: data.items || [],
          },
          {
            headers: {
              'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
              'X-Google-Key-Index': String(index),
            },
          }
        )
      }

      const errorText = await response.text()
      let payload: unknown = null
      try {
        payload = errorText ? JSON.parse(errorText) : null
      } catch {
        payload = { error: { message: errorText || response.statusText } }
      }

      const message = formatGoogleErrorMessage(response.status, payload)
      lastError = { status: response.status, message }

      const shouldRetry = attempt < keyOrder.length - 1 && isRetryableGoogleError(response.status, payload)
      if (!shouldRetry) {
        return NextResponse.json({ error: message }, { status: response.status })
      }
    }

    return NextResponse.json(
      { error: lastError?.message || 'Google Search API error (all keys failed)' },
      { status: lastError?.status || 502 }
    )
  } catch (error: unknown) {
    const err = error as Error
    if (err.name === 'AbortError' || err.name === 'TimeoutError') {
      return NextResponse.json({ error: 'Request timed out' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Internal server error', details: err.message }, { status: 500 })
  }
}

export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'

import { createApiKey } from '@/lib/services/api-key-manager'
import { getD1Database, type D1Database } from '@/lib/server/d1'
import { hmacSha512Hex, requireEnv, safeEqual } from '@/lib/server/nowpayments'
import { setUserPlanByEmail } from '@/lib/server/users'

const PRO_CREDITS = 500

export const dynamic = 'force-dynamic'

async function getPaymentEmail(db: D1Database, orderId: string): Promise<string | null> {
  const row = await db
    .prepare('SELECT email FROM payments WHERE order_id = ? LIMIT 1')
    .bind(orderId)
    .first<{ email: string }>()
  return row?.email ?? null
}

async function handleWebhook(request: NextRequest) {
  const ipnSecret = requireEnv('NOWPAYMENTS_IPN_SECRET')
  const db = await getD1Database()

  const signature = request.headers.get('x-nowpayments-sig') || ''
  const raw = await request.text()

  const expected = await hmacSha512Hex(ipnSecret, raw)
  if (!signature || !safeEqual(signature.toLowerCase(), expected.toLowerCase())) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const body = raw ? JSON.parse(raw) : {}

  const orderId = String(body?.order_id || body?.orderId || '').trim()
  const status = String(body?.payment_status || body?.paymentStatus || '').trim()
  const invoiceId = body?.invoice_id || body?.invoiceId || null
  const emailFromWebhook = body?.customer_email || body?.customerEmail || null

  if (!orderId || !status) {
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
  }

  const email = String(emailFromWebhook || (await getPaymentEmail(db, orderId)) || '').trim()
  if (!email) {
    return NextResponse.json({ error: 'Customer email missing' }, { status: 400 })
  }

  await db
    .prepare(
      [
        'INSERT INTO payments (order_id, invoice_id, email, status, raw_json, created_at, updated_at)',
        'VALUES (?, ?, ?, ?, ?, unixepoch(), unixepoch())',
        'ON CONFLICT(order_id) DO UPDATE SET',
        '  invoice_id = COALESCE(excluded.invoice_id, payments.invoice_id),',
        '  email = excluded.email,',
        '  status = excluded.status,',
        '  raw_json = excluded.raw_json,',
        '  updated_at = unixepoch()',
      ].join('\n')
    )
    .bind(orderId, invoiceId, email, status, raw)
    .run()

  if (status === 'finished' || status === 'confirmed') {
    const existing = await db
      .prepare('SELECT key FROM api_keys WHERE payment_id = ? LIMIT 1')
      .bind(orderId)
      .first<{ key: string }>()

    if (!existing?.key) {
      try {
        await createApiKey(email, PRO_CREDITS, orderId)
      } catch (err) {
        console.warn('[payment] createApiKey failed (likely duplicate webhook):', err)
      }
    }

    await setUserPlanByEmail(db, email, 'pro')
  }

  return NextResponse.json({ success: true })
}

export async function POST(request: NextRequest) {
  try {
    return await handleWebhook(request)
  } catch (err) {
    console.error('Webhook processing error:', err)
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return POST(request)
}

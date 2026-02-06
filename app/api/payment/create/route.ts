import { NextRequest, NextResponse } from 'next/server'

import { getD1Database } from '@/lib/server/d1'
import { getBaseUrl, randomOrderId, requireEnv } from '@/lib/server/nowpayments'

const PAYMENT_AMOUNT_USD = 10

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const nowPaymentsApiKey = requireEnv('NOWPAYMENTS_API_KEY')
    const db = await getD1Database()

    const body = await request.json()
    const email = String(body?.email || '').trim()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const orderId = randomOrderId()

    const insert = await db
      .prepare(
        [
          'INSERT INTO payments (order_id, email, status, created_at, updated_at)',
          "VALUES (?, ?, 'pending', unixepoch(), unixepoch())",
        ].join('\n')
      )
      .bind(orderId, email)
      .run()

    if (!insert.success) {
      return NextResponse.json({ error: insert.error || 'Failed to create order' }, { status: 500 })
    }

    const baseUrl = getBaseUrl()

    const invoiceResponse = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': nowPaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: PAYMENT_AMOUNT_USD,
        price_currency: 'USD',
        order_id: orderId,
        order_description: 'UsernameSearch.io Pro Plan - 500 API Credits',
        ipn_callback_url: `${baseUrl}/api/payment/webhook`,
        success_url: `${baseUrl}/payment/success?order_id=${orderId}`,
        cancel_url: `${baseUrl}/pricing`,
        customer_email: email,
      }),
    })

    const invoiceText = await invoiceResponse.text()
    if (!invoiceResponse.ok) {
      console.error('NowPayments invoice error:', invoiceResponse.status, invoiceText)
      return NextResponse.json({ error: 'Failed to create payment invoice' }, { status: 502 })
    }

    const invoiceData = invoiceText ? JSON.parse(invoiceText) : null
    const invoiceId: string | null = invoiceData?.id ?? null
    const paymentUrl: string | null = invoiceData?.invoice_url ?? null

    if (invoiceId) {
      await db
        .prepare('UPDATE payments SET invoice_id = ?, updated_at = unixepoch() WHERE order_id = ?')
        .bind(invoiceId, orderId)
        .run()
    }

    return NextResponse.json({
      success: true,
      orderId,
      invoiceId,
      paymentUrl,
      amount: PAYMENT_AMOUNT_USD,
    })
  } catch (err) {
    console.error('Payment creation error:', err)
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

import { getD1Database } from '@/lib/server/d1'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const db = await getD1Database()
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const row = await db
      .prepare(
        [
          'SELECT',
          '  order_id as orderId,',
          '  invoice_id as invoiceId,',
          '  email,',
          '  status,',
          '  created_at as createdAt,',
          '  updated_at as updatedAt',
          'FROM payments',
          'WHERE order_id = ?',
          'LIMIT 1',
        ].join('\n')
      )
      .bind(orderId)
      .first<{
        orderId: string
        invoiceId: string | null
        email: string
        status: string
        createdAt: number
        updatedAt: number
      }>()

    if (!row) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...row,
      email: row.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      createdAt: new Date(row.createdAt * 1000).toISOString(),
      updatedAt: new Date(row.updatedAt * 1000).toISOString(),
    })
  } catch (err) {
    console.error('Payment verification error:', err)
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 })
  }
}

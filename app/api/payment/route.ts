import { NextRequest, NextResponse } from 'next/server'
import { createApiKey } from '@/lib/services/api-key-manager'
import crypto from 'crypto'

// NowPayments 配置（从 needs.md 中的信息）
const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY || 'EE4GPYN-SB2MM6W-MP2EEGW-Y5N3ZGG'
const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET || 'eucve+np/UVAIuMLaNoscc8BE2VL/+hY'
const PAYMENT_AMOUNT = 10 // $10 USD

/**
 * POST /api/payment/create
 * 创建支付订单
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // 创建支付订单
    // 注意：NowPayments 需要服务器端调用，这里简化处理
    const orderId = crypto.randomBytes(16).toString('hex')
    const paymentUrl = `https://nowpayments.io/payment?order_id=${orderId}&amount=${PAYMENT_AMOUNT}`
    
    // 在生产环境中，应该：
    // 1. 调用 NowPayments API 创建发票
    // 2. 保存订单信息到数据库
    // 3. 返回支付链接
    
    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
      amount: PAYMENT_AMOUNT,
      message: 'Payment order created. Redirect user to payment URL.'
    })
    
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/payment/webhook
 * NowPayments IPN 回调处理
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('x-nowpayments-sig')
    
    // 验证签名
    const expectedSignature = crypto
      .createHmac('sha512', NOWPAYMENTS_IPN_SECRET)
      .update(JSON.stringify(body))
      .digest('hex')
    
    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
    
    const {
      payment_status,
      order_id,
      pay_amount,
      pay_currency,
      order_description,
      customer_email
    } = body
    
    // 处理不同的支付状态
    switch (payment_status) {
      case 'finished':
      case 'confirmed':
        // 支付成功，创建 API 密钥
        const apiKey = await createApiKey(
          customer_email || 'user@example.com',
          500, // 500 次请求
          order_id
        )
        
        // 发送邮件给用户（这里简化处理）
        console.log(`Payment successful for order ${order_id}`)
        console.log(`API Key created: ${apiKey}`)
        
        // 在生产环境中应该：
        // 1. 更新数据库中的订单状态
        // 2. 发送包含 API 密钥的邮件给用户
        // 3. 记录交易日志
        
        return NextResponse.json({
          success: true,
          message: 'Payment processed successfully'
        })
        
      case 'partially_paid':
        console.log(`Partial payment received for order ${order_id}`)
        break
        
      case 'waiting':
        console.log(`Waiting for payment for order ${order_id}`)
        break
        
      case 'failed':
      case 'expired':
        console.log(`Payment failed/expired for order ${order_id}`)
        break
        
      default:
        console.log(`Unknown payment status: ${payment_status}`)
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/payment/verify
 * 验证支付状态
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }
    
    // 在生产环境中，应该查询数据库获取订单状态
    // 这里返回模拟数据
    
    return NextResponse.json({
      orderId,
      status: 'pending', // pending, completed, failed
      amount: PAYMENT_AMOUNT,
      currency: 'USD',
      message: 'Payment verification endpoint'
    })
    
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
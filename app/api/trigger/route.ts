import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Webhook URL not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'manual',
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error('Webhook failed')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to trigger' },
      { status: 500 }
    )
  }
}
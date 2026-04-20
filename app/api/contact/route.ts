import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    await request.json()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  // For demo: log to server console (Vercel logs or local terminal)
  console.log('Contact form submitted:', data)
  return NextResponse.json({ success: true })
}

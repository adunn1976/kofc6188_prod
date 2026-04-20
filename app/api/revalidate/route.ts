import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const sitePaths = [
  '/',
  '/events',
  '/officers',
  '/programs',
  '/programs/faith',
  '/programs/family',
  '/programs/community',
  '/programs/life',
]

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'REVALIDATE_SECRET is not configured.' },
      { status: 500 }
    )
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret.' }, { status: 401 })
  }

  let payload: Record<string, unknown> = {}

  try {
    payload = await request.json()
  } catch {
    payload = {}
  }

  for (const path of sitePaths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: true,
    paths: sitePaths,
    documentType: payload._type ?? null,
  })
}

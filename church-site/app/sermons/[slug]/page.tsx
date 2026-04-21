import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { sermonBySlugQuery } from '@/lib/sanity.queries'
import RichText from '@/components/RichText'

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let sermon: any = null

  try {
    sermon = await client.fetch(sermonBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching sermon detail:', error)
  }

  if (!sermon) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        Sermon • {new Date(sermon.date).toLocaleDateString()}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{sermon.title}</h1>
      <p className="mt-2 text-sm text-slate-600">
        {sermon.speaker ? `Speaker: ${sermon.speaker}` : ''}
        {sermon.speaker && sermon.scripture ? ' • ' : ''}
        {sermon.scripture ? sermon.scripture : ''}
      </p>

      {sermon.summary ? (
        <p className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-slate-700">{sermon.summary}</p>
      ) : null}

      {sermon.mediaUrl ? (
        <a
          href={sermon.mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Listen / Watch
        </a>
      ) : null}

      <div className="mt-8">
        <RichText value={sermon.body} />
      </div>
    </section>
  )
}

import { client } from '@/lib/sanity.client'
import { latestSermonsQuery } from '@/lib/sanity.queries'

export default async function SermonsPage() {
  let sermons: any[] = []

  try {
    sermons = await client.fetch(latestSermonsQuery)
  } catch (error) {
    console.error('Error fetching sermons:', error)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Sermons</h1>
      <p className="mt-4 text-slate-700">Listen to recent messages and grow in God’s Word.</p>

      <div className="mt-8 space-y-4">
        {sermons.length > 0 ? (
          sermons.map((sermon) => (
            <article key={sermon._id} className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">{sermon.title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(sermon.date).toLocaleDateString()} {sermon.speaker ? `• ${sermon.speaker}` : ''}
                {sermon.scripture ? ` • ${sermon.scripture}` : ''}
              </p>
              {sermon.summary ? <p className="mt-3 text-sm text-slate-600">{sermon.summary}</p> : null}
              {sermon.mediaUrl ? (
                <a href={sermon.mediaUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline">
                  Listen / Watch
                </a>
              ) : null}
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Sermons will appear here once published in Sanity Studio.
          </article>
        )}
      </div>
    </section>
  )
}

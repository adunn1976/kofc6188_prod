import { client } from '@/lib/sanity.client'
import RichText from '@/components/RichText'
import { homepageQuery, latestSermonsQuery, worshipPageQuery } from '@/lib/sanity.queries'

type WorshipPageContent = {
  pageTitle?: string
  introText?: string
  serviceTimesTitle?: string
  pulpitHeading?: string
  pulpitContent?: { _type?: string; [key: string]: unknown }[]
}

export default async function WorshipPage() {
  let homepage: any = null
  let content: WorshipPageContent | null = null
  let sermons: any[] = []

  try {
    ;[homepage, content, sermons] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(worshipPageQuery),
      client.fetch(latestSermonsQuery),
    ])
  } catch (error) {
    console.error('Error fetching worship data:', error)
  }

  const pageTitle = content?.pageTitle || 'Worship'
  const introText =
    content?.introText || 'Join us each week for worship rooted in Scripture, prayer, and Christ-centered teaching.'
  const serviceTimesTitle = content?.serviceTimesTitle || 'Service Times'
  const pulpitHeading = content?.pulpitHeading || "From the Pastor's Pulpit"
  const hasPulpitContent = Boolean(content?.pulpitContent && content.pulpitContent.length > 0)

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{pageTitle}</h1>
      <p className="mt-4 leading-7 text-slate-700">{introText}</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">{serviceTimesTitle}</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {homepage?.serviceTimes?.length > 0 ? (
            homepage.serviceTimes.map((item: any, idx: number) => (
              <li key={idx}>
                <span className="font-medium">{item.day || 'Sunday'}:</span> {item.time || '9:00 AM'}
                {item.label ? ` (${item.label})` : ''}
              </li>
            ))
          ) : (
            <>
              <li><span className="font-medium">Sunday:</span> 9:00 AM & 11:00 AM</li>
              <li><span className="font-medium">Wednesday:</span> 7:00 PM Prayer Service</li>
            </>
          )}
        </ul>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">{pulpitHeading}</h2>
      <div className="mt-4 space-y-3">
        {hasPulpitContent ? (
          <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
            <RichText value={content?.pulpitContent} />
          </div>
        ) : (
          (sermons.length > 0 ? sermons.slice(0, 5) : []).map((sermon) => (
            <article key={sermon._id} className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">{sermon.title}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(sermon.date).toLocaleDateString()} {sermon.speaker ? `• ${sermon.speaker}` : ''}
              </p>
              {sermon.mediaUrl ? (
                <a
                  href={sermon.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-blue-700 hover:underline"
                >
                  Listen / Watch
                </a>
              ) : null}
            </article>
          ))
        )}
        {!hasPulpitContent && sermons.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
            Sermons will appear here as they are published.
          </p>
        )}
      </div>
    </section>
  )
}

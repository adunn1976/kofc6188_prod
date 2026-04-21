import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import { homepageQuery, latestAnnouncementsQuery, latestSermonsQuery, upcomingEventsQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'

function asText(value: any) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((block) => {
        if (typeof block === 'string') return block
        if (block?._type === 'block' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child?.text || '').join('')
        }
        return ''
      })
      .filter(Boolean)
      .join(' ')
  }
  return ''
}

export default async function HomePage() {
  let homepage: any = null
  let announcements: any[] = []
  let sermons: any[] = []
  let events: any[] = []

  try {
    homepage = await client.fetch(homepageQuery)
    announcements = await client.fetch(latestAnnouncementsQuery)
    sermons = await client.fetch(latestSermonsQuery)
    events = await client.fetch(upcomingEventsQuery)
  } catch (error) {
    console.error('Error fetching church homepage content:', error)
  }

  return (
    <div>
      <section className="relative h-[380px] w-full sm:h-[450px]">
        {homepage?.heroImage ? (
          <Image
            src={urlFor(homepage.heroImage).width(1800).height(900).url()}
            alt={homepage.heroImage?.alt || 'Church sanctuary'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-blue-900 to-blue-700" />
        )}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-center px-4 text-white sm:px-6">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            {asText(homepage?.heroTitle) || 'Welcome to Our Church Family'}
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-xl">
            {asText(homepage?.heroSubtitle) || 'A Christ-centered community for worship, growth, and service.'}
          </p>
          <div className="mt-6">
            <Link
              href={homepage?.primaryCtaUrl || '/worship'}
              className="inline-block rounded bg-white px-5 py-3 font-semibold text-blue-900 hover:bg-blue-50"
            >
              {asText(homepage?.primaryCtaLabel) || 'Plan Your Visit'}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">About Our Church</h2>
            <p className="mt-4 text-slate-700 leading-7">
              {asText(homepage?.introText) ||
                'We are a welcoming church committed to worship, discipleship, and loving our community. Whether you are new to church or have followed Christ for years, we would love to walk with you.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800">Learn More</Link>
              <Link href="/contact" className="rounded border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100">Contact Us</Link>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Service Times</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
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
                  <li><span className="font-medium">Wednesday:</span> 7:00 PM Prayer</li>
                </>
              )}
            </ul>
            <Link href="/worship" className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline">Worship Details →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Upcoming Events</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(events.length > 0 ? events.slice(0, 3) : []).map((event) => (
            <article key={event._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{event.summary || 'Join us for this upcoming church event.'}</p>
              <p className="mt-3 text-xs text-slate-500">{event.location || 'Church Campus'}</p>
            </article>
          ))}
          {events.length === 0 && (
            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-slate-900">Events Coming Soon</h3>
              <p className="mt-2 text-sm text-slate-600">Upcoming events will appear here as soon as they are published in Sanity.</p>
            </article>
          )}
        </div>
        <div className="mt-5">
          <Link href="/events" className="text-sm font-semibold text-blue-700 hover:underline">View all events →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Latest Sermons</h2>
            <div className="mt-4 space-y-3">
              {(sermons.length > 0 ? sermons.slice(0, 3) : []).map((sermon) => (
                <article key={sermon._id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="font-semibold text-slate-900">{sermon.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(sermon.date).toLocaleDateString()} {sermon.speaker ? `• ${sermon.speaker}` : ''}
                  </p>
                  {sermon.mediaUrl ? (
                    <a href={sermon.mediaUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-blue-700 hover:underline">
                      Listen / Watch
                    </a>
                  ) : null}
                </article>
              ))}
              {sermons.length === 0 && (
                <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Sermons will appear here when published.</p>
              )}
            </div>
            <Link href="/sermons" className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">View all sermons →</Link>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Church News</h2>
            <div className="mt-4 space-y-3">
              {(announcements.length > 0 ? announcements : []).map((item) => (
                <article key={item._id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                  {item.summary ? <p className="mt-2 text-sm text-slate-600">{item.summary}</p> : null}
                </article>
              ))}
              {announcements.length === 0 && (
                <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">Announcements will appear here when published.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

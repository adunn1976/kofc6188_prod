import { client } from '@/lib/sanity.client'
import { upcomingEventsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

export default async function EventsPage() {
  let events: any[] = []

  try {
    events = await client.fetch(upcomingEventsQuery)
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Events</h1>
      <p className="mt-4 text-slate-700">See what’s coming up in the life of our church.</p>

      <div className="mt-8 space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <article key={event._id} className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                <Link href={`/events/${event.slug?.current || ''}`} className="hover:text-blue-700 hover:underline">
                  {event.title}
                </Link>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {new Date(event.date).toLocaleDateString()}
                {event.location ? ` • ${event.location}` : ''}
                {event.ministryTitle ? ` • ${event.ministryTitle}` : ''}
              </p>
              {event.summary ? <p className="mt-3 text-sm text-slate-600">{event.summary}</p> : null}
              {event.slug?.current ? (
                <Link href={`/events/${event.slug.current}`} className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline">
                  View details →
                </Link>
              ) : null}
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Upcoming events will appear here once published in Sanity Studio.
          </article>
        )}
      </div>
    </section>
  )
}

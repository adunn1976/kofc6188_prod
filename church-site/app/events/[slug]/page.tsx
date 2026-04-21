import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { eventBySlugQuery } from '@/lib/sanity.queries'
import RichText from '@/components/RichText'

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let event: any = null

  try {
    event = await client.fetch(eventBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching event detail:', error)
  }

  if (!event) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Event</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{event.title}</h1>
      <p className="mt-3 text-sm text-slate-600">
        {new Date(event.date).toLocaleString()}
        {event.location ? ` • ${event.location}` : ''}
        {event.ministryTitle ? ` • ${event.ministryTitle}` : ''}
      </p>

      {event.summary ? (
        <p className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-slate-700">{event.summary}</p>
      ) : null}

      <div className="mt-8">
        <RichText value={event.body} />
      </div>
    </section>
  )
}

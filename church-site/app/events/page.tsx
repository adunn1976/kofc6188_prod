import { client } from '@/lib/sanity.client'
import { allEventsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

const weekdayNameToIndex: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

function extractWeekdaysFromSchedule(schedule?: string) {
  if (!schedule) return [] as number[]
  const text = schedule.toLowerCase()
  return Object.entries(weekdayNameToIndex)
    .filter(([name]) => text.includes(name))
    .map(([, index]) => index)
}

type EventListItem = {
  _id: string
  title: string
  slug?: { current?: string }
  date?: string
  location?: string
  ministryTitle?: string
  summary?: string
  schedule?: string
}

export default async function EventsPage() {
  let events: EventListItem[] = []

  try {
    events = (await client.fetch(allEventsQuery)) || []
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const daysInMonth = monthEnd.getDate()
  const firstWeekday = monthStart.getDay()
  const monthLabel = monthStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const datedEventsThisMonth = events
    .filter((event) => {
      if (!event.date) return false
      const d = new Date(event.date)
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    })
    .sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime())

  const recurringEvents = events.filter((event) => !event.date && event.schedule)

  const eventsByDay = new Map<number, EventListItem[]>()
  for (const event of datedEventsThisMonth) {
    const day = new Date(event.date || '').getDate()
    const existing = eventsByDay.get(day) || []
    existing.push(event)
    eventsByDay.set(day, existing)
  }

  const recurringEventsByDay = new Map<number, EventListItem[]>()
  for (const event of recurringEvents) {
    const weekdays = extractWeekdaysFromSchedule(event.schedule)
    for (let day = 1; day <= daysInMonth; day += 1) {
      const weekday = new Date(now.getFullYear(), now.getMonth(), day).getDay()
      if (weekdays.includes(weekday)) {
        const existing = recurringEventsByDay.get(day) || []
        existing.push(event)
        recurringEventsByDay.set(day, existing)
      }
    }
  }

  const dayCells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, idx) => idx + 1),
  ]
  while (dayCells.length % 7 !== 0) {
    dayCells.push(null)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Events</h1>
      <p className="mt-4 text-slate-700">See all events in the life of our church, including upcoming and past gatherings.</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Events Calendar — {monthLabel}</h2>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
          {weekdayLabels.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {dayCells.map((day, idx) => {
            if (!day) {
              return <div key={`blank-${idx}`} className="min-h-[96px] rounded-lg bg-slate-50" />
            }

            const dayEvents = eventsByDay.get(day) || []
            const recurringDayEvents = recurringEventsByDay.get(day) || []

            return (
              <div key={day} className="min-h-[96px] rounded-lg border border-slate-200 bg-white p-2">
                <p className="text-xs font-semibold text-slate-700">{day}</p>
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <p key={event._id} className="truncate text-[11px] text-blue-700">
                      {event.slug?.current ? (
                        <Link href={`/events/${event.slug.current}`} className="hover:underline">
                          {event.title}
                        </Link>
                      ) : (
                        event.title
                      )}
                    </p>
                  ))}
                  {recurringDayEvents.slice(0, 1).map((event) => (
                    <p key={`recurring-${event._id}`} className="truncate text-[11px] text-emerald-700">
                      {event.slug?.current ? (
                        <Link href={`/events/${event.slug.current}`} className="hover:underline">
                          ↺ {event.title}
                        </Link>
                      ) : (
                        <>↺ {event.title}</>
                      )}
                    </p>
                  ))}
                  {dayEvents.length + recurringDayEvents.length > 3 ? (
                    <p className="text-[11px] text-slate-500">+{dayEvents.length + recurringDayEvents.length - 3} more</p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>

        {recurringEvents.length > 0 ? (
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">Recurring Events</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {recurringEvents.map((event) => (
                <li key={event._id}>
                  <span className="font-medium">{event.title}:</span> {event.schedule}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

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
                {event.schedule ? event.schedule : event.date ? new Date(event.date).toLocaleDateString() : ''}
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
            Events will appear here once published in Sanity Studio.
          </article>
        )}
      </div>
    </section>
  )
}

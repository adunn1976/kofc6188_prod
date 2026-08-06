import { client } from '@/lib/sanity.client'
import { allEventsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'

const CHURCH_TIME_ZONE = 'America/New_York'

const weekdayNameToIndex: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
}

const weekdayNames = Object.keys(weekdayNameToIndex)
const ordinalWordToNumber: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
}

function extractWeekdaysFromSchedule(schedule?: string) {
  if (!schedule) return [] as number[]
  const text = schedule.toLowerCase()
  return Object.entries(weekdayNameToIndex)
    .filter(([name]) => text.includes(name))
    .map(([, index]) => index)
}

function extractFirstWeekdayExceptions(schedule?: string) {
  if (!schedule) return [] as number[]
  const text = schedule.toLowerCase()
  const exceptions: number[] = []

  for (const weekday of weekdayNames) {
    const pattern = new RegExp(`except\\s+(?:the\\s+)?first\\s+${weekday}(?:\\s+of\\s+(?:the\\s+)?month)?`)
    if (pattern.test(text)) {
      exceptions.push(weekdayNameToIndex[weekday])
    }
  }

  return exceptions
}

function extractOnlyNthWeekdays(schedule?: string) {
  if (!schedule) return [] as Array<{ weekday: number; occurrence: number }>
  const text = schedule.toLowerCase()
  const nthOnly: Array<{ weekday: number; occurrence: number }> = []

  for (const [ordinalWord, occurrence] of Object.entries(ordinalWordToNumber)) {
    for (const weekday of weekdayNames) {
      const nthPattern = new RegExp(`(?:every\\s+)?${ordinalWord}\\s+${weekday}(?:\\s+of\\s+(?:the\\s+)?month)?`)
      const exceptPattern = new RegExp(`except\\s+(?:the\\s+)?${ordinalWord}\\s+${weekday}(?:\\s+of\\s+(?:the\\s+)?month)?`)
      if (nthPattern.test(text) && !exceptPattern.test(text)) {
        nthOnly.push({ weekday: weekdayNameToIndex[weekday], occurrence })
      }
    }
  }

  return nthOnly
}

function isFirstWeekdayOfMonth(year: number, month: number, day: number, weekday: number) {
  for (let d = 1; d <= 7; d += 1) {
    if (new Date(year, month, d).getDay() === weekday) {
      return d === day
    }
  }
  return false
}

function getWeekdayOccurrenceInMonth(year: number, month: number, day: number, weekday: number) {
  let count = 0
  for (let d = 1; d <= day; d += 1) {
    if (new Date(year, month, d).getDay() === weekday) {
      count += 1
    }
  }
  return count
}

function extractTimeFromSchedule(schedule?: string) {
  if (!schedule) return ''
  const text = schedule.replace(/\s+/g, ' ').trim()

  // Handles formats like "9:30-10:45 AM" or "9:30 to 10:45 PM" by inferring
  // the meridiem for the start time from the end time.
  const inferredRangeMatch = text.match(/(\d{1,2}:\d{2})\s*(?:-|–|to)\s*\d{1,2}:\d{2}\s*(AM|PM)/i)
  if (inferredRangeMatch) {
    return `${inferredRangeMatch[1]} ${inferredRangeMatch[2].toUpperCase()}`
  }

  // Handles formats where start already has explicit meridiem, e.g. "9:30 AM-10:45 AM".
  const explicitStartMatch = text.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i)
  if (explicitStartMatch) {
    return explicitStartMatch[1].toUpperCase()
  }

  return ''
}

function formatEventDate(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    timeZone: CHURCH_TIME_ZONE,
  }).format(new Date(date))
}

function formatEventTime(date?: string) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: CHURCH_TIME_ZONE,
  }).format(new Date(date))
}

function getEventLocalMinutes(date?: string) {
  if (!date) return Number.MAX_SAFE_INTEGER
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: CHURCH_TIME_ZONE,
  }).formatToParts(new Date(date))

  const hour = Number(parts.find((part) => part.type === 'hour')?.value || '0')
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || '0')
  return hour * 60 + minute
}

function parseTimeTextToMinutes(timeText?: string) {
  if (!timeText) return Number.MAX_SAFE_INTEGER
  const match = timeText.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return Number.MAX_SAFE_INTEGER

  let hour = Number(match[1])
  const minute = Number(match[2])
  const ampm = match[3].toUpperCase()

  if (ampm === 'AM' && hour === 12) hour = 0
  if (ampm === 'PM' && hour !== 12) hour += 12

  return hour * 60 + minute
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
    const firstWeekdayExceptions = extractFirstWeekdayExceptions(event.schedule)
    const nthOnlyWeekdays = extractOnlyNthWeekdays(event.schedule)
    for (let day = 1; day <= daysInMonth; day += 1) {
      const weekday = new Date(now.getFullYear(), now.getMonth(), day).getDay()
      if (weekdays.includes(weekday)) {
        const nthRule = nthOnlyWeekdays.find((rule) => rule.weekday === weekday)
        if (nthRule) {
          const occurrence = getWeekdayOccurrenceInMonth(now.getFullYear(), now.getMonth(), day, weekday)
          if (occurrence !== nthRule.occurrence) {
            continue
          }
        }

        if (
          firstWeekdayExceptions.includes(weekday) &&
          isFirstWeekdayOfMonth(now.getFullYear(), now.getMonth(), day, weekday)
        ) {
          continue
        }

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
            const calendarEvents = [
              ...dayEvents.map((event) => ({
                ...event,
                isRecurring: false,
                timeText: formatEventTime(event.date),
                sortMinutes: getEventLocalMinutes(event.date),
              })),
              ...recurringDayEvents.map((event) => ({
                ...event,
                isRecurring: true,
                timeText: extractTimeFromSchedule(event.schedule),
                sortMinutes: parseTimeTextToMinutes(extractTimeFromSchedule(event.schedule)),
              })),
            ].sort((a, b) => a.sortMinutes - b.sortMinutes || a.title.localeCompare(b.title))

            return (
              <div key={day} className="min-h-[120px] rounded-lg border border-slate-200 bg-white p-2">
                <p className="text-xs font-semibold text-slate-700">{day}</p>
                <div className="mt-1 max-h-28 space-y-1 overflow-y-auto pr-1">
                  {calendarEvents.map((event) => (
                    <div key={`${event.isRecurring ? 'recurring' : 'dated'}-${event._id}`}>
                      <p className={`truncate text-[11px] ${event.isRecurring ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {event.slug?.current ? (
                          <Link href={`/events/${event.slug.current}`} className="hover:underline" title={event.title}>
                            {event.isRecurring ? '↺ ' : ''}
                            {event.title}
                          </Link>
                        ) : (
                          <span title={event.title}>
                            {event.isRecurring ? '↺ ' : ''}
                            {event.title}
                          </span>
                        )}
                      </p>
                      {event.timeText ? <p className="truncate text-[10px] text-slate-500">{event.timeText}</p> : null}
                    </div>
                  ))}
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
                {event.schedule ? event.schedule : formatEventDate(event.date)}
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

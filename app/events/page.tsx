import { client } from '@/lib/sanity.client'
import { latestEventsQuery } from '@/lib/sanity.queries'

export default async function EventsPage() {
  let events = []

  try {
    events = await client.fetch(latestEventsQuery)
  } catch (error) {
    console.error('Error fetching events:', error)
    // Fallback to empty array if Sanity is not available
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold">Upcoming Events</h1>

      {events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event: any) => (
            <div key={event._id} className="rounded-lg border bg-white p-5 shadow sm:p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">
                {new Date(event.date).toLocaleDateString()}
                {event.location && ` • ${event.location}`}
              </p>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p>Stay tuned for upcoming Knights of Columbus events and activities.</p>
          <p className="text-sm text-gray-600 mt-2">
            Events will be displayed here once configured in the content management system.
          </p>
        </div>
      )}
    </main>
  )
}


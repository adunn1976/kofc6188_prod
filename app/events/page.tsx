/* import { client } from '../../lib/sanity'

export default async function EventsPage() {
  const events = await client.fetch('*[_type == "event"] | order(date asc)')

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <ul>
        {events.map((event:any) => (
          <li key={event._id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm">{new Date(event.date).toLocaleString()}</p>
            <p className="mt-2">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
} */

  // app/page.tsx
import { client } from "@/lib/sanity.client";
import { allEventsQuery } from "@/lib/sanity.queries";

export default async function HomePage() {
  const events = await client.fetch(allEventsQuery);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>

      {events.length === 0 && <p>No events found.</p>}

      <ul className="space-y-8">
        {events.map((event: any) => (
          <li key={event._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-500 mb-1">
              {new Date(event.date).toLocaleString()}
            </p>
            {event.location && (
              <p className="text-gray-700 mb-2">{event.location}</p>
            )}
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="rounded-md w-full h-64 object-cover mb-3"
              />
            )}
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}


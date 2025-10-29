import { client } from '../../lib/sanity'

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
}

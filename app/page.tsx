import { client } from '../lib/sanity'
import Link from 'next/link'

export default async function Home() {
  const events = await client.fetch('*[_type == "event"] | order(date asc)[0..2]')
  const officers = await client.fetch('*[_type == "officer"] | order(role asc)[0..3]')

  return (
    <div className="max-w-4xl mx-auto p-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold">Knights of Columbus<br/>Corpus Christi Council 6188</h1>
        <p className="mt-4 text-lg">Faith · Family · Fraternity · Service</p>
      </section>

      <section className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
        <div className="grid gap-4">
          {events.map((e:any) => (
            <div key={e._id} className="p-4 border rounded">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm">{new Date(e.date).toLocaleString()}</p>
              <p className="mt-2">{e.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/events" className="text-blue-600">View all events →</Link>
        </div>
      </section>
      <div className="bg-blue-500 text-white p-8 rounded-xl">
      Tailwind is now working 🎉
    </div>

      <section className="py-6">
        <h2 className="text-2xl font-semibold mb-4">Officers</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {officers.map((o:any) => (
            <div key={o._id} className="p-4 border rounded">
              <p className="font-semibold">{o.name}</p>
              <p className="text-sm">{o.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link href="/officers" className="text-blue-600">Meet the team →</Link>
        </div>
      </section>
    </div>
    
  )
}

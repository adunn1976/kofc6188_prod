import { client } from '@/lib/sanity.client'
import { singleProgramQuery, latestEventsQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import ProgramPosts from '@/components/ProgramPosts'

export default async function FamilyPage() {
  let program = null
  let events = []

  try {
    program = await client.fetch(singleProgramQuery, { slug: 'family' })
    events = await client.fetch(latestEventsQuery)
  } catch (error) {
    console.error('Error fetching family program:', error)
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      {program?.image && (
        <div className="mb-8">
          <Image
            src={urlFor(program.image).width(800).height(400).url()}
            alt={program.title || 'Family Program'}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">
        {program?.title || 'Family Program'}
      </h1>

      <div className="prose prose-lg max-w-none">
        {program?.content ? (
          <div dangerouslySetInnerHTML={{ __html: program.content }} />
        ) : (
          <p className="text-lg text-gray-700 mb-6">
            Our Family program provides support and resources for families in our community.
            We offer various activities and initiatives designed to strengthen family bonds,
            provide educational opportunities, and create lasting memories for families of all ages.
          </p>
        )}
      </div>

      {program?.description && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
          <p className="text-green-700">{program.description}</p>
        </div>
      )}

      <ProgramPosts posts={program?.posts} />

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Latest Family Events</h2>
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.slice(0, 3).map((event: any) => (
              <div key={event._id} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  {event.location && <p><strong>Location:</strong> {event.location}</p>}
                </div>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Family Events</h3>
            <div className="text-sm text-gray-600 mb-3">
              <p><strong>Date:</strong> Coming Soon</p>
              <p><strong>Location:</strong> To be announced</p>
            </div>
            <p className="text-gray-700">Event details will be displayed here once configured in the content management system.</p>
          </div>
        )}

        <div className="mt-4">
          <Link
            href="/events"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View All Events →
          </Link>
        </div>
      </section>

      <div className="bg-gray-100 p-4 rounded mt-8">
        <p>Program: <strong>{program?.title || 'Family'}</strong></p>
        <p>Last updated: {new Date().toISOString()}</p>
      </div>
    </article>
  )
}
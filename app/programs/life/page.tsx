import { client } from '@/lib/sanity.client'
import { singleProgramQuery, latestProgramEventsQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import ProgramPosts from '@/components/ProgramPosts'

export default async function LifePage() {
  let program = null
  let events = []

  try {
    program = await client.fetch(singleProgramQuery, { slug: 'life' })
    if (program?._id) {
      events = await client.fetch(latestProgramEventsQuery, { programId: program._id })
    }
  } catch (error) {
    console.error('Error fetching life program:', error)
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      {program?.image && (
        <div className="mb-8">
          <Image
            src={urlFor(program.image).width(800).height(400).url()}
            alt={program.title || 'Life Program'}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        {program?.title || 'Life Program'}
      </h1>

      <div className="prose prose-lg max-w-none">
        {program?.content ? (
          <div dangerouslySetInnerHTML={{ __html: program.content }} />
        ) : (
          <p className="text-lg text-gray-700 mb-6">
            Our Life program is dedicated to promoting and protecting the sanctity of human life
            from conception to natural death. We support pro-life initiatives, provide education
            on life issues, and offer assistance to families in need through our various charitable programs.
          </p>
        )}
      </div>

      {program?.description && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
          <p className="text-red-700">{program.description}</p>
        </div>
      )}

      <ProgramPosts posts={program?.posts} />

      <section className="mt-12 border-t pt-8">
        <h2 className="mb-6 text-2xl font-semibold">Latest Life Events</h2>
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
            <h3 className="text-xl font-semibold mb-2">Life Events</h3>
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
    </article>
  )
}
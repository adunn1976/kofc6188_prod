import { client } from '@/lib/sanity.client'
import { singleProgramQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import ProgramPosts from '@/components/ProgramPosts'
import ProgramRichContent from '@/components/ProgramRichContent'

export default async function CommunityPage() {
  let program = null

  try {
    program = await client.fetch(singleProgramQuery, { slug: 'community' })
  } catch (error) {
    console.error('Error fetching community program:', error)
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      {program?.image && (
        <div className="mb-8">
          <Image
            src={urlFor(program.image).width(800).height(400).url()}
            alt={program.title || 'Community Program'}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="mb-6 text-3xl font-bold sm:text-4xl">
        {program?.title || 'Community Program'}
      </h1>

      <div className="prose prose-lg max-w-none">
        {program?.introText ? (
          <p className="text-lg text-gray-700 mb-6">{program.introText}</p>
        ) : (
          <p className="text-lg text-gray-700 mb-6">
            Our Community program serves the local Corpus Christi community through various
            charitable initiatives, volunteer work, and outreach programs. We are committed to
            making a positive impact in our neighborhood and supporting those in need.
          </p>
        )}
      </div>

      {program?.description && (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 my-6">
          <p className="text-purple-700">{program.description}</p>
        </div>
      )}

      <ProgramRichContent
        blocks={program?.content}
        title="Program Content"
      />

      <ProgramRichContent
        blocks={program?.body}
        title="Additional Details"
      />

      <ProgramPosts posts={program?.posts} />

      <section className="mt-12 border-t pt-8">
        <h2 className="mb-6 text-2xl font-semibold">Latest Community Events</h2>
        {program?.events && program.events.length > 0 ? (
          <div className="space-y-4">
            {program.events.map((event: any) => (
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
            <h3 className="text-xl font-semibold mb-2">Community Events</h3>
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
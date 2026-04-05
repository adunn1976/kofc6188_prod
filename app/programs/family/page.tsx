import { client } from '@/lib/sanity.client'
import { singleProgramQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'

export default async function FamilyPage() {
  let program = null

  try {
    program = await client.fetch(singleProgramQuery, { slug: 'family' })
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

      <div className="bg-gray-100 p-4 rounded mt-8">
        <p>Program: <strong>{program?.title || 'Family'}</strong></p>
        <p>Last updated: {new Date().toISOString()}</p>
      </div>
    </article>
  )
}
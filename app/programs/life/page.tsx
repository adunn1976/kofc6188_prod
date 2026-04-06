import { client } from '@/lib/sanity.client'
import { singleProgramQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import ProgramPosts from '@/components/ProgramPosts'

export default async function LifePage() {
  let program = null

  try {
    program = await client.fetch(singleProgramQuery, { slug: 'life' })
  } catch (error) {
    console.error('Error fetching life program:', error)
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
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

      <h1 className="text-4xl font-bold mb-6">
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

      <div className="bg-gray-100 p-4 rounded mt-8">
        <p>Program: <strong>{program?.title || 'Life'}</strong></p>
        <p>Last updated: {new Date().toISOString()}</p>
      </div>
    </article>
  )
}
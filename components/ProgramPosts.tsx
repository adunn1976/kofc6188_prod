import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

export default function ProgramPosts({ posts }: { posts?: any[] }) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-semibold mb-6">Recent Program Posts</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-3xl shadow p-6 overflow-hidden">
            {post.image ? (
              <div className="mb-4 overflow-hidden rounded-3xl">
                <Image
                  src={urlFor(post.image).width(800).height(400).url()}
                  alt={post.image?.alt || post.title}
                  width={800}
                  height={400}
                  className="w-full h-52 object-cover"
                />
              </div>
            ) : null}
            <div>
              <p className="text-sm text-gray-500 mb-2">
                {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
              </p>
              <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt || 'No summary available.'}</p>
              <p className="text-right text-sm text-blue-600">Program update</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

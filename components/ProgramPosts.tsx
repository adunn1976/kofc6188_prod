import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

function renderProgramPostBlock(block: any, index: number) {
  if (!block || typeof block !== 'object') {
    return null
  }

  if (block._type === 'image' && block.asset) {
    return (
      <div key={index} className="mb-4 overflow-hidden rounded-3xl">
        <Image
          src={urlFor(block).width(800).height(400).url()}
          alt={block.alt || 'Program post image'}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
    )
  }

  if (block._type === 'block' && Array.isArray(block.children)) {
    const text = block.children.map((child: any) => child.text || '').join('')
    return (
      <p key={index} className="text-gray-700 mb-4">
        {text}
      </p>
    )
  }

  return null
}

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
              {post.excerpt ? (
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
              ) : null}
              {post.body ? (
                <div className="mb-4">
                  {post.body.map((block: any, index: number) => renderProgramPostBlock(block, index))}
                </div>
              ) : null}
              {!post.excerpt && !post.body ? (
                <p className="text-gray-700 mb-4">No summary available.</p>
              ) : null}
              <p className="text-right text-sm text-blue-600">Program update</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

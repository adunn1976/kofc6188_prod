import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

function renderInlineChildren(children: any[], markDefs: any[]) {
  return children.map((child: any, i: number) => {
    const text = child.text || ''
    const isBold = child.marks?.includes('strong')
    const isItalic = child.marks?.includes('em')

    const linkMarkKey = child.marks?.find((m: string) =>
      markDefs?.some((def: any) => def._key === m && def._type === 'link')
    )
    const linkDef = linkMarkKey
      ? markDefs?.find((def: any) => def._key === linkMarkKey)
      : undefined

    let node: React.ReactNode = text
    if (isBold && isItalic) node = <strong><em>{text}</em></strong>
    else if (isBold) node = <strong>{text}</strong>
    else if (isItalic) node = <em>{text}</em>
    else node = <span>{text}</span>

    if (linkDef?.href) {
      const isExternal = linkDef.href.startsWith('http')
      node = isExternal ? (
        <a
          key={i}
          href={linkDef.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {node}
        </a>
      ) : (
        <Link key={i} href={linkDef.href} className="text-blue-600 underline hover:text-blue-800">
          {node}
        </Link>
      )
    } else {
      node = <span key={i}>{node}</span>
    }

    return node
  })
}

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
    const plainText = block.children.map((child: any) => child.text || '').join('')
    if (!plainText.trim()) return null

    const children = renderInlineChildren(block.children, block.markDefs || [])
    const key = block._key || index
    const style = block.style || 'normal'

    if (style === 'h1') return <h1 key={key} className="mb-4 text-3xl font-bold text-gray-900">{children}</h1>
    if (style === 'h2') return <h2 key={key} className="mb-4 text-2xl font-bold text-gray-900">{children}</h2>
    if (style === 'h3') return <h3 key={key} className="mb-3 text-xl font-semibold text-gray-900">{children}</h3>
    if (style === 'h4') return <h4 key={key} className="mb-3 text-lg font-semibold text-gray-900">{children}</h4>
    if (style === 'blockquote') return <blockquote key={key} className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">{children}</blockquote>

    return (
      <p key={key} className="text-gray-700 mb-4">
        {children}
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
      <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Recent Program Posts</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post._id} className="overflow-hidden rounded-3xl bg-white p-5 shadow sm:p-6">
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
              <h3 className="mb-3 text-xl font-semibold sm:text-2xl">{post.title}</h3>
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

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

type ProgramChild = {
  _key?: string
  _type?: string
  text?: string
  marks?: string[]
}

type ProgramBlock = {
  _type?: string
  _key?: string
  style?: string
  asset?: unknown
  alt?: string
  children?: ProgramChild[]
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
}

type ProgramRichContentProps = {
  blocks?: ProgramBlock[]
  title: string
}

function renderBlock(block: ProgramBlock, index: number) {
  if (!block || typeof block !== 'object') {
    return null
  }

  if (block._type === 'image' && block.asset) {
    return (
      <div key={block._key || index} className="mb-4 overflow-hidden rounded-2xl">
        <Image
          src={urlFor(block).width(1000).height(560).url()}
          alt={block.alt || 'Program content image'}
          width={1000}
          height={560}
          className="h-auto w-full object-cover"
        />
      </div>
    )
  }

  if (block._type === 'block' && Array.isArray(block.children)) {
    const plainText = block.children.map((child) => child.text || '').join('')

    if (!plainText.trim()) {
      return null
    }

    const children = block.children.map((child, i) => {
      const text = child.text || ''
      const isBold = child.marks?.includes('strong')
      const isItalic = child.marks?.includes('em')

      // Find a link mark key if present
      const linkMarkKey = child.marks?.find((m) =>
        block.markDefs?.some((def) => def._key === m && def._type === 'link')
      )
      const linkDef = linkMarkKey
        ? block.markDefs?.find((def) => def._key === linkMarkKey)
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

    const key = block._key || index
    const style = block.style || 'normal'

    if (style === 'h1') return <h1 key={key} className="mb-4 text-3xl font-bold text-gray-900">{children}</h1>
    if (style === 'h2') return <h2 key={key} className="mb-4 text-2xl font-bold text-gray-900">{children}</h2>
    if (style === 'h3') return <h3 key={key} className="mb-3 text-xl font-semibold text-gray-900">{children}</h3>
    if (style === 'h4') return <h4 key={key} className="mb-3 text-lg font-semibold text-gray-900">{children}</h4>
    if (style === 'blockquote') return <blockquote key={key} className="mb-4 border-l-4 border-gray-300 pl-4 italic text-gray-600">{children}</blockquote>

    return (
      <p key={key} className="mb-4 text-gray-700">
        {children}
      </p>
    )
  }

  return null
}

export default function ProgramRichContent({ blocks, title }: ProgramRichContentProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div>{blocks.map((block, index) => renderBlock(block, index))}</div>
    </section>
  )
}

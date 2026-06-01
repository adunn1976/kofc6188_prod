import React from 'react'
import Image from 'next/image'
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
  asset?: unknown
  alt?: string
  children?: ProgramChild[]
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

    return (
      <p key={block._key || index} className="mb-4 text-gray-700">
        {block.children.map((child, i) => {
          const text = child.text || ''
          const isBold = child.marks?.includes('strong')
          const isItalic = child.marks?.includes('em')

          let node: React.ReactNode = text
          if (isBold && isItalic) node = <strong key={i}><em>{text}</em></strong>
          else if (isBold) node = <strong key={i}>{text}</strong>
          else if (isItalic) node = <em key={i}>{text}</em>
          else node = <span key={i}>{text}</span>

          return node
        })}
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

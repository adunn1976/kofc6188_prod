import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

type ProgramBlock = {
  _type?: string
  _key?: string
  asset?: unknown
  alt?: string
  children?: Array<{ text?: string }>
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
    const text = block.children.map((child) => child.text || '').join('')

    if (!text.trim()) {
      return null
    }

    return (
      <p key={block._key || index} className="mb-4 text-gray-700">
        {text}
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

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { ministryBySlugQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import RichText from '@/components/RichText'

type PortableTextChild = {
  text?: string
}

type PortableTextBlock = {
  _type?: string
  children?: PortableTextChild[]
  [key: string]: unknown
}

type MissionOutreachDetail = {
  title?: string
  image?: { alt?: string }
  summary?: string
  contactName?: string
  contactEmail?: string
  description?: PortableTextBlock[]
  pulpitHeading?: string
  pulpitContent?: PortableTextBlock[]
  vineHeading?: string
  vineContent?: PortableTextBlock[]
}

export default async function MissionOutreachDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let item: MissionOutreachDetail | null = null

  try {
    item = await client.fetch(ministryBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching mission and outreach detail:', error)
  }

  if (!item) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      {item.image ? (
        <div className="mb-6 overflow-hidden rounded-xl">
          <Image
            src={urlFor(item.image).width(1400).height(700).url()}
            alt={item.image?.alt || item.title || 'Mission and outreach image'}
            width={1400}
            height={700}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{item.title}</h1>

      {item.summary ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-700">{item.summary}</p>
      ) : null}

      {item.contactName || item.contactEmail ? (
        <p className="mt-4 text-sm text-slate-600">
          Contact: {item.contactName || 'Mission & Outreach Leader'}
          {item.contactEmail ? ` • ${item.contactEmail}` : ''}
        </p>
      ) : null}

      <div className="mt-8">
        <RichText value={item.description} />
      </div>

      {/* The Vine / Pulpit-style content (prefer vine-specific fields) */}
      {(() => {
        const heading = item.vineHeading || item.pulpitHeading
        const content = item.vineContent || item.pulpitContent
        const hasContent = Boolean(content && content.length > 0)

        if (!hasContent) return null

        return (
          <div className="mt-10">
            {heading ? <h2 className="mt-4 text-2xl font-bold text-slate-900">{heading}</h2> : null}
            <div className="mt-4">
              <RichText value={content} />
            </div>
          </div>
        )
      })()}
    </section>
  )
}

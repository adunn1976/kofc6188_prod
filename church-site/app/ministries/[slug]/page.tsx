import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { ministryBySlugQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import RichText from '@/components/RichText'

export default async function MinistryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let ministry: any = null

  try {
    ministry = await client.fetch(ministryBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching ministry detail:', error)
  }

  if (!ministry) {
    notFound()
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      {ministry.image ? (
        <div className="mb-6 overflow-hidden rounded-xl">
          <Image
            src={urlFor(ministry.image).width(1400).height(700).url()}
            alt={ministry.image?.alt || ministry.title}
            width={1400}
            height={700}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{ministry.title}</h1>

      {ministry.summary ? (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-700">{ministry.summary}</p>
      ) : null}

      {(ministry.contactName || ministry.contactEmail) ? (
        <p className="mt-4 text-sm text-slate-600">
          Contact: {ministry.contactName || 'Ministry Leader'}
          {ministry.contactEmail ? ` • ${ministry.contactEmail}` : ''}
        </p>
      ) : null}

      <div className="mt-8">
        <RichText value={ministry.description} />
      </div>
    </section>
  )
}

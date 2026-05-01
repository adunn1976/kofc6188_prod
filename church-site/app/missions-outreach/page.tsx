import { client } from '@/lib/sanity.client'
import { ministriesQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

type MissionOutreachItem = {
  _id: string
  title: string
  slug?: { current?: string }
  summary?: string
  contactName?: string
  contactEmail?: string
  image?: { alt?: string }
}

export default async function MissionsOutreachPage() {
  let items: MissionOutreachItem[] = []

  try {
    items = (await client.fetch(ministriesQuery)) || []
  } catch (error) {
    console.error('Error fetching missions and outreach items:', error)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Missions and Outreach</h1>
      <p className="mt-4 text-slate-700">Explore mission and outreach opportunities where you can connect, serve, and grow.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.length > 0 ? (
          items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(800).height(400).url()}
                  alt={item.image?.alt || item.title}
                  width={800}
                  height={400}
                  className="h-44 w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  <Link href={`/missions-outreach/${item.slug?.current || ''}`} className="hover:text-blue-700 hover:underline">
                    {item.title}
                  </Link>
                </h2>
                {item.summary ? <p className="mt-2 text-sm text-slate-600">{item.summary}</p> : null}
                {item.contactName || item.contactEmail ? (
                  <p className="mt-3 text-xs text-slate-500">
                    {item.contactName || ''}
                    {item.contactName && item.contactEmail ? ' • ' : ''}
                    {item.contactEmail || ''}
                  </p>
                ) : null}
                {item.slug?.current ? (
                  <Link href={`/missions-outreach/${item.slug.current}`} className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline">
                    Learn more →
                  </Link>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 md:col-span-2 lg:col-span-3">
            Mission and outreach opportunities will appear here once published in Sanity.
          </article>
        )}
      </div>
    </section>
  )
}

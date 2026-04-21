import { client } from '@/lib/sanity.client'
import { ministriesQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

export default async function MinistriesPage() {
  let ministries: any[] = []

  try {
    ministries = await client.fetch(ministriesQuery)
  } catch (error) {
    console.error('Error fetching ministries:', error)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Ministries</h1>
      <p className="mt-4 text-slate-700">Explore ministries where you can connect, serve, and grow.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ministries.length > 0 ? (
          ministries.map((ministry) => (
            <article key={ministry._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {ministry.image ? (
                <Image
                  src={urlFor(ministry.image).width(800).height(400).url()}
                  alt={ministry.image?.alt || ministry.title}
                  width={800}
                  height={400}
                  className="h-44 w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  <Link href={`/ministries/${ministry.slug?.current || ''}`} className="hover:text-blue-700 hover:underline">
                    {ministry.title}
                  </Link>
                </h2>
                {ministry.summary ? <p className="mt-2 text-sm text-slate-600">{ministry.summary}</p> : null}
                {ministry.contactName || ministry.contactEmail ? (
                  <p className="mt-3 text-xs text-slate-500">
                    {ministry.contactName || ''}
                    {ministry.contactName && ministry.contactEmail ? ' • ' : ''}
                    {ministry.contactEmail || ''}
                  </p>
                ) : null}
                {ministry.slug?.current ? (
                  <Link href={`/ministries/${ministry.slug.current}`} className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline">
                    Learn more →
                  </Link>
                ) : null}
              </div>
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 md:col-span-2 lg:col-span-3">
            Ministries will appear here once published in Sanity.
          </article>
        )}
      </div>
    </section>
  )
}

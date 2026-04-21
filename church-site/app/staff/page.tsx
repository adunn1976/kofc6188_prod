import { client } from '@/lib/sanity.client'
import { staffQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'

export default async function StaffPage() {
  let staff: any[] = []

  try {
    staff = await client.fetch(staffQuery)
  } catch (error) {
    console.error('Error fetching staff:', error)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Staff & Leaders</h1>
      <p className="mt-4 text-slate-700">Meet the team that serves and shepherds our church family.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.length > 0 ? (
          staff.map((person) => (
            <article key={person._id} className="rounded-xl border border-slate-200 bg-white p-5 text-center">
              {person.image ? (
                <Image
                  src={urlFor(person.image).width(200).height(200).url()}
                  alt={person.image?.alt || person.name}
                  width={96}
                  height={96}
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-2xl">👤</div>
              )}
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{person.name}</h2>
              <p className="text-sm text-blue-700">{person.role}</p>
              {person.bio ? <p className="mt-3 text-sm text-slate-600">{person.bio}</p> : null}
              {(person.email || person.phone) ? (
                <div className="mt-3 space-y-1 text-xs text-slate-500">
                  {person.email ? <p>{person.email}</p> : null}
                  {person.phone ? <p>{person.phone}</p> : null}
                </div>
              ) : null}
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600 md:col-span-2 lg:col-span-3">
            Staff profiles will appear here once published in Sanity Studio.
          </article>
        )}
      </div>
    </section>
  )
}

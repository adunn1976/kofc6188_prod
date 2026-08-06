import { client } from '@/lib/sanity.client'
import { staffQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'

type StaffMember = {
  _id: string
  name: string
  role?: string
  section?: string
  bio?: string
  email?: string
  phone?: string
  image?: { alt?: string }
}

function normalizeSectionName(section?: string) {
  const value = (section || '').trim()
  return value || 'Leaders'
}

function sectionSortValue(section: string) {
  const lower = section.toLowerCase()
  if (lower === 'leaders') return 0
  if (lower === 'staff') return 1
  return 2
}

export default async function StaffPage() {
  let staff: StaffMember[] = []

  try {
    staff = await client.fetch(staffQuery)
  } catch (error) {
    console.error('Error fetching staff:', error)
  }

  const sectionMap = new Map<string, StaffMember[]>()
  for (const person of staff) {
    const section = normalizeSectionName(person.section)
    const existing = sectionMap.get(section) || []
    existing.push(person)
    sectionMap.set(section, existing)
  }

  const sections = Array.from(sectionMap.entries())
    .sort(([sectionA], [sectionB]) => {
      const rankA = sectionSortValue(sectionA)
      const rankB = sectionSortValue(sectionB)
      if (rankA !== rankB) return rankA - rankB
      return sectionA.localeCompare(sectionB)
    })
    .map(([title, people]) => ({ title, people }))

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Staff & Leaders</h1>
      <p className="mt-4 text-slate-700">Meet the team that serves and shepherds our church family.</p>

      {sections.length > 0 ? (
        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.people.map((person) => (
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
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">{person.name}</h3>
                    <p className="text-sm text-blue-700">{person.role}</p>
                    {person.bio ? <p className="mt-3 text-sm text-slate-600">{person.bio}</p> : null}
                    {person.email || person.phone ? (
                      <div className="mt-3 space-y-1 text-xs text-slate-500">
                        {person.email ? <p>{person.email}</p> : null}
                        {person.phone ? <p>{person.phone}</p> : null}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <article className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Staff profiles will appear here once published in Sanity Studio.
          </article>
        </div>
      )}
    </section>
  )
}

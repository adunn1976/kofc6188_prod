import Image from 'next/image'
import RichText from '@/components/RichText'
import { client } from '@/lib/sanity.client'
import { aboutPageQuery, staffQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'

type RichContent = { _type?: string; [key: string]: unknown }[]

type AboutContent = {
  aboutImage?: any
  mission?: RichContent | string
  vision?: RichContent | string
}

export default async function AboutPage() {
  let staff: any[] = []
  let aboutContent: AboutContent = {}

  try {
    const [staffData, aboutData] = await Promise.all([client.fetch(staffQuery), client.fetch(aboutPageQuery)])
    staff = staffData || []
    aboutContent = aboutData || {}
  } catch (error) {
    console.error('Error fetching staff for about page:', error)
  }

  const hasMissionContent = Array.isArray(aboutContent.mission) && aboutContent.mission.length > 0
  const hasVisionContent = Array.isArray(aboutContent.vision) && aboutContent.vision.length > 0
  const missionContent: RichContent | undefined = Array.isArray(aboutContent.mission) ? aboutContent.mission : undefined
  const visionContent: RichContent | undefined = Array.isArray(aboutContent.vision) ? aboutContent.vision : undefined

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">About Our Church</h1>
      {aboutContent.aboutImage ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <Image
            src={urlFor(aboutContent.aboutImage).fit('max').auto('format').url()}
            alt={aboutContent.aboutImage?.alt || 'About our church'}
            width={1600}
            height={900}
            className="h-auto w-full object-contain"
          />
        </div>
      ) : null}
      <p className="mt-4 leading-7 text-slate-700">
        We are a Christ-centered congregation called to worship God, grow in faith, and serve our neighbors.
        Our mission is to help people know Jesus, find community, and live with purpose.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="h-full rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Our Mission</h2>
          <div className="mt-2 text-sm text-slate-600">
            {hasMissionContent ? (
              <RichText value={missionContent} />
            ) : (
              <p>Love God, love people, and make disciples in our community.</p>
            )}
          </div>
        </div>
        <div className="h-full rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Our Vision</h2>
          <div className="mt-2 text-sm text-slate-600">
            {hasVisionContent ? (
              <RichText value={visionContent} />
            ) : (
              <p>A welcoming church where every generation can grow in Christ.</p>
            )}
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">Leadership</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {(staff.length > 0 ? staff.slice(0, 4) : []).map((person) => (
          <article key={person._id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-semibold text-slate-900">{person.name}</h3>
            <p className="text-sm text-blue-700">{person.role}</p>
            {person.bio ? <p className="mt-2 text-sm text-slate-600">{person.bio}</p> : null}
          </article>
        ))}
        {staff.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 md:col-span-2">
            Staff profiles will appear here once published in Sanity Studio.
          </p>
        )}
      </div>
    </section>
  )
}

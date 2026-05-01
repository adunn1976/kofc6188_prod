import Link from 'next/link'
import { client } from '@/lib/sanity.client'
import RichText from '@/components/RichText'
import ContactInfoBlock from '@/components/ContactInfoBlock'
import { bayFellowshipHallRentalQuery } from '@/lib/sanity.queries'

type RentalPageContent = {
  pageTitle?: string
  introText?: string
  highlights?: string[]
  details?: { _type?: string; [key: string]: unknown }[]
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  ctaLabel?: string
  ctaUrl?: string
}

export default async function BayFellowshipHallRentalPage() {
  let content: RentalPageContent | null = null

  try {
    content = await client.fetch(bayFellowshipHallRentalQuery)
  } catch (error) {
    console.error('Error fetching Bay Fellowship Hall Rental content:', error)
  }

  const pageTitle = content?.pageTitle || 'Bay Fellowship Hall Rental'
  const introText =
    content?.introText ||
    'Our Bay Fellowship Hall is available for community gatherings, celebrations, and ministry events. We would be glad to help you explore availability and next steps.'
  const highlights =
    content?.highlights && content.highlights.length > 0
      ? content.highlights
      : ['Flexible gathering space', 'Convenient central location', 'Church-hosted and community-friendly environment']
  const contactName = content?.contactName || 'Church Office'
  const contactEmail = content?.contactEmail || 'office@pchdg.org'
  const contactPhone = content?.contactPhone || '(410) 939-3611'
  const ctaLabel = content?.ctaLabel || 'Request Rental Information'
  const ctaUrl = content?.ctaUrl || '/contact'

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{pageTitle}</h1>
      <p className="mt-4 leading-7 text-slate-700">{introText}</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Rental Highlights</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {highlights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Details</h2>
        {content?.details && content.details.length > 0 ? (
          <div className="mt-4">
            <RichText value={content.details} />
          </div>
        ) : (
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Share your event details with our team and we will follow up with availability, rental policies, and next steps.
          </p>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <ContactInfoBlock className="mt-3" name={contactName} phone={contactPhone} email={contactEmail} />

        <Link
          href={ctaUrl}
          className="mt-5 inline-block rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}

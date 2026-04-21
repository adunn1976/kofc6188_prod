export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Contact</h1>
      <p className="mt-4 text-slate-700">We’d love to connect with you. Reach out with questions, prayer requests, or next steps.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Church Office</h2>
          <p className="mt-2 text-sm text-slate-600">123 Church Street, Bel Air, MD</p>
          <p className="mt-1 text-sm text-slate-600">(410) 555-1234</p>
          <p className="mt-1 text-sm text-slate-600">hello@churchsite.org</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Office Hours</h2>
          <p className="mt-2 text-sm text-slate-600">Mon–Thu: 9:00 AM – 4:00 PM</p>
          <p className="mt-1 text-sm text-slate-600">Fri: 9:00 AM – Noon</p>
        </div>
      </div>
    </section>
  )
}

export default function GivePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Give</h1>
      <p className="mt-4 leading-7 text-slate-700">
        Thank you for your generosity. Your giving helps support worship, ministries, missions,
        and care for our local community.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Ways to Give</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Online giving platform</li>
          <li>In-person giving during worship services</li>
          <li>Mail checks to the church office</li>
        </ul>
        <a
          href="#"
          className="mt-6 inline-block rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Give Online
        </a>
      </div>
    </section>
  )
}

import { client } from '@/lib/sanity.client'
import { officersQuery } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.image'
import Image from 'next/image'

export default async function OfficersPage() {
  let officers = []

  try {
    officers = await client.fetch(officersQuery)
  } catch (error) {
    console.error('Error fetching officers:', error)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-center text-3xl font-bold sm:mb-6">Council Officers</h1>
      <p className="mx-auto mb-10 max-w-3xl text-center text-base text-gray-700 sm:mb-12 sm:text-lg">
        Meet our dedicated council officers who serve the Knights of Columbus community
        with leadership, guidance, and commitment to our Catholic values.
      </p>

      {officers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {officers.map((officer: any) => (
            <div key={officer._id} className="rounded-xl border p-5 text-center shadow transition-shadow hover:shadow-lg sm:p-6">
              {officer.image ? (
                <Image
                  src={urlFor(officer.image).width(112).height(112).url()}
                  alt={officer.name}
                  width={112}
                  height={112}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                />
              ) : (
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 sm:h-28 sm:w-28">
                  <span className="text-2xl text-gray-600">👤</span>
                </div>
              )}

              <h2 className="text-xl font-semibold mb-1">{officer.name}</h2>
              <p className="text-blue-600 font-medium mb-3">{officer.position}</p>

              {officer.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{officer.bio}</p>
              )}

              <div className="text-sm text-gray-600 space-y-1">
                {officer.email && (
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    <a href={`mailto:${officer.email}`} className="text-blue-600 hover:underline">
                      {officer.email}
                    </a>
                  </p>
                )}
                {officer.phone && (
                  <p>
                    <span className="font-medium">Phone:</span>{' '}
                    <a href={`tel:${officer.phone}`} className="text-blue-600 hover:underline">
                      {officer.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Fallback content when no officers in Sanity
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-5 text-center shadow sm:p-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 sm:h-28 sm:w-28">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <h2 className="text-lg font-semibold">Grand Knight</h2>
            <p className="text-sm text-gray-600">Leadership position</p>
            <p className="text-blue-600 text-sm mt-2">Contact information coming soon</p>
          </div>
          <div className="rounded-xl border p-5 text-center shadow sm:p-6">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 sm:h-28 sm:w-28">
              <span className="text-2xl text-gray-600">👤</span>
            </div>
            <h2 className="text-lg font-semibold">Deputy Grand Knight</h2>
            <p className="text-sm text-gray-600">Deputy leadership position</p>
            <p className="text-blue-600 text-sm mt-2">Contact information coming soon</p>
          </div>
        </div>
      )}

      {officers.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Officer profiles will be displayed here once configured in our content management system.
          </p>
        </div>
      )}
    </main>
  )
}

import Image from 'next/image'
import { client } from '../../lib/sanity'

export default async function OfficersPage() {
  const officers = await client.fetch('*[_type == "officer"] | order(role asc)')

  return (
    <div className="max-w-4xl mx-auto p-8 grid md:grid-cols-2 gap-6">
      <h1 className="col-span-full text-3xl font-bold mb-4">Council Officers</h1>
      {officers.map((officer:any) => (
        <div key={officer._id} className="text-center border rounded-xl p-4 shadow">
          {officer.photo?.asset?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={officer.photo.asset.url} alt={officer.name} className="mx-auto rounded-full w-28 h-28 object-cover" />
          )}
          <h2 className="text-lg font-semibold mt-2">{officer.name}</h2>
          <p className="text-sm text-gray-600">{officer.role}</p>
          {officer.email && (
            <a href={`mailto:${officer.email}`} className="text-blue-600 text-sm">{officer.email}</a>
          )}
        </div>
      ))}
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { client } from "@/lib/sanity.client"
import { homepageQuery, allProgramsQuery } from "@/lib/sanity.queries"
import { urlFor } from "@/lib/sanity.image"

export default async function HomePage() {
  let homepageData = null
  let programs = []

  try {
    homepageData = await client.fetch(homepageQuery)
    programs = await client.fetch(allProgramsQuery)
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    // Continue with fallback content
  }

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="relative w-full h-[500px] flex items-center justify-center">
        {homepageData?.heroImage && (
          <Image
            src={urlFor(homepageData.heroImage).width(1600).height(500).url()}
            alt={homepageData.heroTitle || "Knights of Columbus"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-6">
            {homepageData?.heroTitle || "Welcome to Knights of Columbus"}
          </h1>
          <p className="text-xl mb-4">
            {homepageData?.heroSubtitle || "Corpus Christi Council 6188"}
          </p>
          <p className="text-lg">
            {homepageData?.heroText || "Faith • Family • Community • Life"}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto p-6 text-center py-16">
        <h2 className="text-3xl font-bold mb-6">
          {homepageData?.missionTitle || "Our Mission"}
        </h2>
        <p className="text-lg text-gray-700">
          {homepageData?.missionText ||
            "The Knights of Columbus is a Catholic fraternal organization dedicated to serving our community through faith, family, and charitable works."
          }
        </p>
      </section>

      {/* Featured Programs */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.length > 0 ? (
            programs.slice(0, 3).map((program: any) => (
              <div key={program._id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link
                  href={`/programs/${program.slug?.current || program.title.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))
          ) : (
            // Fallback content if no programs in Sanity
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Faith</h3>
                <p className="text-gray-600 mb-4">Spiritual growth and development programs.</p>
                <Link href="/programs/faith" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Family</h3>
                <p className="text-gray-600 mb-4">Support for families in our community.</p>
                <Link href="/programs/family" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600 mb-4">Serving our local community through various initiatives.</p>
                <Link href="/programs/community" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
            </>
          )}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/programs"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View All Programs
          </Link>
        </div>
      </section>
    </main>
  )
}

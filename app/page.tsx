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
      <section className="relative flex h-[380px] w-full items-center justify-center sm:h-[440px] lg:h-[500px]">
        {homepageData?.heroImage && (
          <Image
            src={urlFor(homepageData.heroImage).width(1600).height(500).url()}
            alt={homepageData.heroTitle || "Knights of Columbus"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center text-white">
          <h1 className="mb-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:mb-6 lg:text-5xl">
            {homepageData?.heroTitle || "Welcome to Knights of Columbus"}
          </h1>
          <p className="mb-3 text-lg sm:text-xl">
            {homepageData?.heroSubtitle || "Corpus Christi Council 6188"}
          </p>
          <p className="max-w-2xl text-base sm:text-lg">
            {homepageData?.heroText || "Faith • Family • Community • Life"}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <h2 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
          {homepageData?.missionTitle || "Our Mission"}
        </h2>
        <p className="text-base leading-7 text-gray-700 sm:text-lg">
          {homepageData?.missionText ||
            "The Knights of Columbus is a Catholic fraternal organization dedicated to serving our community through faith, family, and charitable works."
          }
        </p>
      </section>

      {/* Featured Programs */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">Our Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.length > 0 ? (
            programs.map((program: any) => (
              <div key={program._id} className="rounded-2xl bg-white p-5 shadow sm:p-6">
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link
                  href={`/programs/${program.slug?.current || program.title.toLowerCase()}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))
          ) : (
            // Fallback content if no programs in Sanity
            <>
              <div className="rounded-2xl bg-white p-5 shadow sm:p-6">
                <h3 className="text-xl font-semibold mb-2">Faith</h3>
                <p className="text-gray-600 mb-4">Spiritual growth and development programs.</p>
                <Link href="/programs/faith" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow sm:p-6">
                <h3 className="text-xl font-semibold mb-2">Family</h3>
                <p className="text-gray-600 mb-4">Support for families in our community.</p>
                <Link href="/programs/family" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow sm:p-6">
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600 mb-4">Serving our local community through various initiatives.</p>
                <Link href="/programs/community" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow sm:p-6">
                <h3 className="text-xl font-semibold mb-2">Life</h3>
                <p className="text-gray-600 mb-4">Promoting and protecting the sanctity of human life.</p>
                <Link href="/programs/life" className="text-blue-600 hover:underline">Learn More →</Link>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/programs"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            View All Programs
          </Link>
        </div>
      </section>
    </main>
  )
}

import { client } from "@/lib/sanity.client"
import { homepageQuery } from "@/lib/sanity.queries"
import Hero from "@/components/Hero"
import Card from "@/components/Card"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

export default async function HomePage() {
  const data = await client.fetch(homepageQuery)

  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <Hero title={data?.title} image={data?.heroImage?.asset?._ref} />

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto p-6 text-center">
        <PortableText value={data?.introText} />
      </section>

      {/* Featured Programs */}
      {data?.featuredPrograms?.length > 0 && (
        <section className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Our Programs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.featuredPrograms.map((program: any) => (
              <Card key={program.slug.current} {...program} />
            ))}
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
      )}

      {/* News Section */}
      {data?.featuredNews?.length > 0 && (
        <section className="max-w-6xl mx-auto p-6 bg-gray-100 w-full">
          <h2 className="text-3xl font-bold text-center mb-6">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.featuredNews.map((news: any) => (
              <Link
                key={news.slug.current}
                href={`/news/${news.slug.current}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg"
              >
                {news.mainImage && (
                  <Image
                    src={news.mainImage}
                    alt={news.title}
                    width={400}
                    height={250}
                    className="rounded-t-lg object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm">{news.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

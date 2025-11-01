import { client } from "@/lib/sanity.client"
import { singleProgramQuery } from "@/lib/sanity.queries"
import { PortableText } from "@portabletext/react"
import Hero from "@/components/Hero"

export default async function ProgramDetail({ params }: { params: { slug: string } }) {
  const program = await client.fetch(singleProgramQuery, { slug: params.slug })
  if (!program) return <p>Program not found</p>

  return (
    <div>
      <Hero title={program.title} image={program.image?.asset?._ref} />
      <div className="max-w-3xl mx-auto p-6">
        <PortableText value={program.details} />
      </div>
    </div>
  )
}

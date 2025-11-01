import { client } from "@/lib/sanity.client"
import { allProgramsQuery } from "@/lib/sanity.queries"
import Card from "@/components/Card"

export default async function ProgramsPage() {
  const programs = await client.fetch(allProgramsQuery)
  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {programs.map((program: any) => (
        <Card key={program.slug.current} {...program} />
      ))}
    </div>
  )
}

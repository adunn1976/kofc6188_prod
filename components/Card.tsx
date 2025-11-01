import Image from "next/image"
import Link from "next/link"

export default function Card({ title, image, slug, summary }: any) {
  return (
    <Link href={`/programs/${slug.current}`} className="block bg-white rounded-lg shadow hover:shadow-lg">
      {image && (
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="rounded-t-lg object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{summary}</p>
      </div>
    </Link>
  )
}

import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

export default function RichText({ value }: { value?: any[] }) {
  if (!value || value.length === 0) {
    return null
  }

  return (
    <div className="prose prose-slate max-w-none">
      <PortableText
        value={value}
        components={{
          types: {
            image: ({ value }: any) => (
              <div className="my-6 overflow-hidden rounded-xl">
                <Image
                  src={urlFor(value).width(1200).height(700).url()}
                  alt={value?.alt || 'Content image'}
                  width={1200}
                  height={700}
                  className="h-auto w-full object-cover"
                />
              </div>
            ),
          },
        }}
      />
    </div>
  )
}

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
                <img
                  src={urlFor(value).fit('max').auto('format').url()}
                  alt={value?.alt || 'Content image'}
                  loading="lazy"
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            ),
          },
        }}
      />
    </div>
  )
}

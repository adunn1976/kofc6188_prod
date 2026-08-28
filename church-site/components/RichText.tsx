import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

function sanityFileUrlFromRef(ref?: string) {
  if (!ref) return null
  // expected form: file-<assetId>-<ext>
  const m = ref.match(/^file-([^-]+)-([a-z0-9]+)$/i)
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jjaqbqvi'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  if (m) {
    const assetId = m[1]
    const ext = m[2]
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${ext}`
  }
  return null
}

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
            file: ({ value }: any) => {
              // value.asset._ref is typical; fallback to value.asset.url
              const ref = value?.asset?._ref || value?.asset?.url
              const fileUrl = value?.asset?.url || sanityFileUrlFromRef(ref)
              const title = value?.title || value?.label || 'Document'

              if (!fileUrl) {
                return (
                  <div className="my-4 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <p>File attachment unavailable.</p>
                  </div>
                )
              }

              return (
                <div className="my-6 rounded-lg border border-slate-200 bg-white p-4">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium text-blue-700 hover:underline"
                  >
                    {title} (PDF)
                  </a>
                  <div className="mt-3">
                    <iframe src={fileUrl} className="w-full h-80 border" />
                  </div>
                </div>
              )
            },
          },
        }}
      />
    </div>
  )
}

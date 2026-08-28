"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  images?: string[]
  autoPlayMs?: number
}

export default function HallCarousel({ images, autoPlayMs = 0 }: Props) {
  const defaultImages = Array.from({ length: 7 }).map((_, i) => `/hall/${i + 1}.jpg`)
  const items = images && images.length > 0 ? images : defaultImages
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const mountedRef = useRef(false)

  // optional autoplay (disabled by default)
  useEffect(() => {
    if (!mountedRef.current) mountedRef.current = true
    if (autoPlayMs > 0) {
      const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), autoPlayMs)
      return () => window.clearInterval(id)
    }
    return
  }, [autoPlayMs, items.length])

  // lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
    return
  }, [lightboxOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, items.length])

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  function next() {
    setIndex((i) => (i + 1) % items.length)
  }

  if (!items || items.length === 0) return null

  return (
    <div className="mt-8">
      <div className="relative rounded-lg overflow-hidden bg-slate-100">
        <div className="relative h-64 md:h-72 lg:h-96">
          <Image src={items[index]} alt={`Hall image ${index + 1}`} fill sizes="100vw" className="object-cover" priority />
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
        >
          ›
        </button>

        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="Open lightbox"
          className="absolute right-12 top-3 z-10 rounded bg-white/80 px-3 py-1 text-sm font-medium shadow"
        >
          View
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto">
        {items.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIndex(i)}
            className={`flex-none rounded-md overflow-hidden ring-2 ${i === index ? 'ring-blue-600' : 'ring-transparent'}`}
          >
            <div className="w-20 h-14 bg-white">
              <Image src={src} alt={`thumb ${i + 1}`} width={160} height={112} className="object-contain" />
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded bg-white/90 p-2 text-xl"
          >
            ×
          </button>

          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            aria-label="Prev"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-2xl"
          >
            ‹
          </button>

          <div className="max-w-[90vw] max-h-[90vh]">
            <Image src={items[index]} alt={`Large ${index + 1}`} width={1600} height={900} className="object-contain" />
          </div>

          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-2xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

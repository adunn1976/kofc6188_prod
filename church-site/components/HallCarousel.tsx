"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  images?: string[]
  autoPlayMs?: number
}

export default function HallCarousel({ images, autoPlayMs = 4000 }: Props) {
  const defaultImages = Array.from({ length: 7 }).map((_, i) => `/hall/${i + 1}.jpg`)
  const items = images && images.length > 0 ? images : defaultImages
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (autoPlayMs > 0) {
      timerRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % items.length)
      }, autoPlayMs)
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [autoPlayMs, items.length])

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  function next() {
    setIndex((i) => (i + 1) % items.length)
  }

  return (
    <div className="mt-8">
      <div className="relative overflow-hidden rounded-lg bg-slate-100">
        <div
          className="flex transition-transform duration-500"
          style={{ width: `${items.length * 100}%`, transform: `translateX(-${index * (100 / items.length)}%)` }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-none w-full relative h-40 sm:h-56 md:h-64 flex items-center justify-center bg-slate-50"
            >
              <Image
                src={src}
                alt={`Hall image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
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
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-8 rounded-full ${i === index ? 'bg-blue-700' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

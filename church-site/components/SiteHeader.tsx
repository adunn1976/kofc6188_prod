"use client"

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/worship', label: 'Worship' },
  { href: '/bay-fellowship-hall-rental', label: 'Hall Rental' },
  { href: '/missions-outreach', label: 'Missions and Outreach' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/staff', label: 'Staff' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

const facebookUrl = 'https://www.facebook.com/presbyterianchurchhdg'

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.4-4.1 4.1v2.5H8v3.2h2.8V21h2.7Z" />
    </svg>
  )
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Facebook page"
            className="shrink-0 rounded-full border border-white/25 p-2 text-white transition-colors hover:bg-white/10"
          >
            <FacebookIcon />
          </a>

          <Link href="/" className="min-w-0 text-base font-semibold leading-tight text-white sm:text-xl">
            The Presbyterian Church of Havre de Grace
          </Link>

          <div className="w-9 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <nav className="hidden flex-1 items-center justify-center gap-1 overflow-x-auto md:flex lg:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-md px-2.5 py-2 text-xs font-medium transition-colors lg:px-3 lg:text-sm ${
                  isActiveLink(link.href)
                    ? 'bg-brand text-white'
                    : 'text-brand hover:bg-blue-50'
                }`}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex w-full items-center justify-between gap-3 md:hidden">
            <Link
              href="/"
              className={`rounded-md px-3 py-1.5 text-base font-semibold transition-colors ${
                pathname === '/'
                  ? 'bg-brand text-white'
                  : 'text-brand hover:bg-blue-50'
              }`}
            >
              Home
            </Link>

            <button
              className="rounded p-2.5 hover:bg-slate-100"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-116px)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'bg-brand text-white'
                    : 'text-brand hover:bg-blue-50'
                }`}
                onClick={() => setOpen(false)}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

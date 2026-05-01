"use client"

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/about', label: 'About' },
  { href: '/worship', label: 'Worship' },
  { href: '/bay-fellowship-hall-rental', label: 'Bay Fellowship Hall Rental' },
  { href: '/missions-outreach', label: 'Missions and Outreach' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/staff', label: 'Staff' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className={`rounded-md px-3 py-1.5 text-lg font-bold transition-colors sm:text-xl ${
            pathname === '/'
              ? 'bg-brand text-white'
              : 'text-brand hover:bg-blue-50'
          }`}
        >
          Home
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActiveLink(link.href)
                  ? 'bg-brand text-white'
                  : 'text-brand hover:bg-blue-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded p-2 hover:bg-slate-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className={`rounded px-2 py-2 text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-brand text-white'
                  : 'text-brand hover:bg-blue-50'
              }`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-2 py-2 text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? 'bg-brand text-white'
                    : 'text-brand hover:bg-blue-50'
                }`}
                onClick={() => setOpen(false)}
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

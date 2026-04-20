"use client"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

export default function Navbar() {
  const [programsOpen, setProgramsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const programLinks = ["Faith", "Family", "Community", "Life"]

  function closeMenus() {
    setProgramsOpen(false)
    setMobileOpen(false)
  }

  return (
    <nav className="bg-blue-900 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="max-w-[220px] text-lg font-bold leading-tight sm:max-w-none sm:text-2xl">
          KofC Corpus Christi Council 6188
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="transition hover:text-yellow-300">Home</Link>

          <div className="relative">
            <button
              onClick={() => setProgramsOpen(!programsOpen)}
              className="flex items-center gap-1 transition hover:text-yellow-300"
            >
              Programs <ChevronDown size={16} />
            </button>
            {programsOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 w-44 rounded-lg bg-white py-2 text-black shadow-lg">
                {programLinks.map((item) => (
                  <Link
                    key={item}
                    href={`/programs/${item.toLowerCase()}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProgramsOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/events" className="transition hover:text-yellow-300">Events</Link>
          <Link href="/officers" className="transition hover:text-yellow-300">Officers</Link>
          <Link href="/contact" className="transition hover:text-yellow-300">Contact</Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 transition hover:bg-blue-800 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            setMobileOpen(!mobileOpen)
            setProgramsOpen(false)
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-blue-800 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-3">
            <Link href="/" className="rounded px-3 py-2 hover:bg-blue-800" onClick={closeMenus}>Home</Link>
            <button
              type="button"
              onClick={() => setProgramsOpen(!programsOpen)}
              className="flex items-center justify-between rounded px-3 py-2 text-left hover:bg-blue-800"
            >
              <span>Programs</span>
              <ChevronDown size={16} className={programsOpen ? "rotate-180 transition" : "transition"} />
            </button>
            {programsOpen && (
              <div className="ml-3 flex flex-col gap-1">
                {programLinks.map((item) => (
                  <Link
                    key={item}
                    href={`/programs/${item.toLowerCase()}`}
                    className="rounded px-3 py-2 text-sm text-blue-100 hover:bg-blue-800"
                    onClick={closeMenus}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/events" className="rounded px-3 py-2 hover:bg-blue-800" onClick={closeMenus}>Events</Link>
            <Link href="/officers" className="rounded px-3 py-2 hover:bg-blue-800" onClick={closeMenus}>Officers</Link>
            <Link href="/contact" className="rounded px-3 py-2 hover:bg-blue-800" onClick={closeMenus}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

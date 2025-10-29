import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-xl font-bold text-blue-800">Knights of Columbus</h1>
            <p className="text-sm text-gray-600">Corpus Christi Council 6188</p>
          </Link>
        </div>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-700">Home</Link>
          <Link href="/events" className="text-gray-700">Events</Link>
          <Link href="/officers" className="text-gray-700">Officers</Link>
          <Link href="/contact" className="text-gray-700">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

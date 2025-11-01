import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-800 text-white p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between">
            <Link href="/" className="font-bold text-xl">
              KofC Corpus Christi Council 6188
            </Link>
            <nav className="space-x-4">
              <Link href="/">Home</Link> 
              <Link href="/programs">Programs</Link>
              <Link href="/news">News</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-blue-900 text-white text-center p-4 mt-12">
          © {new Date().getFullYear()} Knights of Columbus Council 6188
        </footer>
      </body>
    </html>
  )
}

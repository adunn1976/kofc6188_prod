import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <header>
          <Navbar />
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-12 bg-blue-900 px-4 py-5 text-center text-sm text-white sm:text-base">
          © {new Date().getFullYear()} Knights of Columbus Council 6188
        </footer>
      </body>
    </html>
  )
}

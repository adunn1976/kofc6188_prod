import './globals.css';
import "tailwindcss";

import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Knights of Columbus Corpus Christi Council 6188',
  description: 'Faith · Family · Fraternity · Service'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

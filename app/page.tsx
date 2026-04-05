import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full bg-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-6">Welcome to Knights of Columbus</h1>
          <p className="text-xl mb-8">Corpus Christi Council 6188</p>
          <p className="text-lg">Faith • Family • Community • Life</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto p-6 text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700">
          The Knights of Columbus is a Catholic fraternal organization dedicated to
          serving our community through faith, family, and charitable works.
        </p>
      </section>

      {/* Featured Programs */}
      <section className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Faith</h3>
            <p className="text-gray-600 mb-4">Spiritual growth and development programs.</p>
            <Link href="/programs/faith" className="text-blue-600 hover:underline">Learn More →</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Family</h3>
            <p className="text-gray-600 mb-4">Support for families in our community.</p>
            <Link href="/programs/family" className="text-blue-600 hover:underline">Learn More →</Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 mb-4">Serving our local community through various initiatives.</p>
            <Link href="/programs/community" className="text-blue-600 hover:underline">Learn More →</Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/programs"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View All Programs
          </Link>
        </div>
      </section>
    </main>
  )
}

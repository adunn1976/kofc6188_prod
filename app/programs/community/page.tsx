export default function CommunityPage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Community Program</h1>
      <p className="text-lg text-gray-700 mb-6">
        Our Community program serves the local community through various initiatives.
      </p>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Latest Community Event</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Community Event Title</h3>
          <div className="text-sm text-gray-600 mb-3">
            <p><strong>Date:</strong> Coming Soon</p>
            <p><strong>Location:</strong> To be announced</p>
          </div>
          <p className="text-gray-700">Event details will be displayed here once integrated with Sanity CMS.</p>
        </div>
      </section>

      <div className="bg-gray-100 p-4 rounded mt-6">
        <p>Program: <strong>Community</strong></p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </article>
  );
}
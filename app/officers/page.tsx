export default function OfficersPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Council Officers</h1>
      <p className="text-lg text-gray-700 mb-6">
        Meet our dedicated council officers who serve the Knights of Columbus community.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center border rounded-xl p-6 shadow">
          <div className="mx-auto rounded-full w-28 h-28 bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <h2 className="text-lg font-semibold">Grand Knight</h2>
          <p className="text-sm text-gray-600">Leadership position</p>
          <p className="text-blue-600 text-sm mt-2">Contact information coming soon</p>
        </div>
        <div className="text-center border rounded-xl p-6 shadow">
          <div className="mx-auto rounded-full w-28 h-28 bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <h2 className="text-lg font-semibold">Deputy Grand Knight</h2>
          <p className="text-sm text-gray-600">Deputy leadership position</p>
          <p className="text-blue-600 text-sm mt-2">Contact information coming soon</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600">Officer profiles will be displayed here once integrated with our content management system.</p>
      </div>
    </main>
  );
}

export default function FamilyPage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Family Program</h1>
      <p className="text-lg text-gray-700 mb-6">
        Our Family program supports families in our community.
      </p>
      <div className="bg-gray-100 p-4 rounded">
        <p>Program: <strong>Family</strong></p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </article>
  );
}
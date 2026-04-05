import Link from "next/link";

export default function ProgramsPage() {
  const programs = ["Faith", "Family", "Community", "Life"];

  return (
    <main className="max-w-5xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-8">Our Programs</h1>
      <p className="text-lg mb-12 text-gray-600">
        The Knights of Columbus council focuses on four key areas of charitable and spiritual growth.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((prog) => (
          <Link
            key={prog}
            href={`/programs/${prog.toLowerCase()}`}
            className="border rounded-xl p-6 hover:shadow-lg transition bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{prog}</h2>
            <p className="text-gray-600">
              Learn more about our {prog.toLowerCase()} initiatives.
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

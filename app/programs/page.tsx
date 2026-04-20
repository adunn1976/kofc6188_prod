import Link from "next/link";

export default function ProgramsPage() {
  const programs = ["Faith", "Family", "Community", "Life"];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
      <h1 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl">Our Programs</h1>
      <p className="mb-10 text-base text-gray-600 sm:mb-12 sm:text-lg">
        The Knights of Columbus council focuses on four key areas of charitable and spiritual growth.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((prog) => (
          <Link
            key={prog}
            href={`/programs/${prog.toLowerCase()}`}
            className="rounded-xl border bg-white p-5 transition hover:shadow-lg sm:p-6"
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

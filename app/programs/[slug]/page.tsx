// Remove generateStaticParams for now to test dynamic routing
// export async function generateStaticParams() {
//   return [
//     { slug: 'faith' },
//     { slug: 'family' },
//     { slug: 'community' },
//     { slug: 'life' }
//   ];
// }

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 16, params is a Promise
  const { slug } = await params;

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Program: {slug}</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the {slug} program page. If you can see this, the routing is working!
      </p>
    </article>
  );
}



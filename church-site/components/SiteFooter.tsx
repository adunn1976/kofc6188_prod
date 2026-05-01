export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 sm:px-6">
        <p className="font-medium text-slate-700">The Presbyterian Church of Havre de Grace</p>
        <p className="mt-1">551 Franklin St, Havre De Grace, MD 21078</p>
        <p className="mt-1">(410) 939-3611</p>
        <p className="mt-1">Sunday Worship: 9:00 AM &amp; 11:00 AM</p>
        <p className="mt-4">© {new Date().getFullYear()} The Presbyterian Church of Havre de Grace. All rights reserved.</p>
      </div>
    </footer>
  )
}

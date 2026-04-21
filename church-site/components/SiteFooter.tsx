export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 sm:px-6">
        <p className="font-medium text-slate-700">Church Site</p>
        <p className="mt-1">123 Church Street, Bel Air, MD</p>
        <p className="mt-1">Sunday Worship: 9:00 AM &amp; 11:00 AM</p>
        <p className="mt-4">© {new Date().getFullYear()} Church Site. All rights reserved.</p>
      </div>
    </footer>
  )
}

import ContactInfoBlock from '@/components/ContactInfoBlock'

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 sm:px-6">
        <ContactInfoBlock
          name="The Presbyterian Church of Havre de Grace"
          address="551 Franklin St, Havre De Grace, MD 21078"
          phone="(410) 939-3611"
          email="office@pchdg.org"
        />
        <p className="mt-4">© {new Date().getFullYear()} The Presbyterian Church of Havre de Grace. All rights reserved.</p>
      </div>
    </footer>
  )
}

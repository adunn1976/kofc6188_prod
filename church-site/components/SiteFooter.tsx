import ContactInfoBlock from '@/components/ContactInfoBlock'

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-blue-950/30 bg-brand text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <ContactInfoBlock
          name="The Presbyterian Church of Havre de Grace"
          address="551 Franklin St, Havre De Grace, MD 21078"
          phone="(410) 939-3611"
          email="office@pchdg.org"
          variant="inverse"
        />
        <div className="mt-6 border-t border-white/15 pt-4">
          <p className="text-sm text-blue-100">© {new Date().getFullYear()} The Presbyterian Church of Havre de Grace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

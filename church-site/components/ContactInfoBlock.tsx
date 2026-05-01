import { Mail, Phone } from 'lucide-react'

type ContactInfoBlockProps = {
  name?: string
  address?: string
  phone?: string
  email?: string
  directionsUrl?: string
  className?: string
}

export default function ContactInfoBlock({
  name,
  address,
  phone,
  email,
  directionsUrl,
  className,
}: ContactInfoBlockProps) {
  return (
    <div className={className}>
      {name ? <p className="font-medium text-slate-700">{name}</p> : null}
      {address ? <p className="mt-1 text-sm text-slate-600">{address}</p> : null}
      {phone ? (
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Phone size={14} aria-hidden="true" />
          <span>{phone}</span>
        </p>
      ) : null}
      {email ? (
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Mail size={14} aria-hidden="true" />
          <a href={`mailto:${email}`} className="hover:underline">{email}</a>
        </p>
      ) : null}
      {directionsUrl ? (
        <p className="mt-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Get Directions →
          </a>
        </p>
      ) : null}
    </div>
  )
}

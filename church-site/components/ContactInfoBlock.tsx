import { Mail, Phone } from 'lucide-react'

type ContactInfoBlockProps = {
  name?: string
  address?: string
  phone?: string
  email?: string
  directionsUrl?: string
  className?: string
  variant?: 'default' | 'inverse'
}

export default function ContactInfoBlock({
  name,
  address,
  phone,
  email,
  directionsUrl,
  className,
  variant = 'default',
}: ContactInfoBlockProps) {
  const isInverse = variant === 'inverse'
  const nameClassName = isInverse ? 'font-medium text-white' : 'font-medium text-slate-700'
  const bodyClassName = isInverse ? 'text-sm text-blue-100' : 'text-sm text-slate-600'
  const emailClassName = isInverse ? 'hover:text-white hover:underline' : 'hover:underline'
  const directionsClassName = isInverse
    ? 'text-sm font-semibold text-white hover:text-blue-100 hover:underline'
    : 'text-sm font-semibold text-blue-700 hover:underline'

  return (
    <div className={className}>
      {name ? <p className={nameClassName}>{name}</p> : null}
      {address ? <p className={`mt-1 ${bodyClassName}`}>{address}</p> : null}
      {phone ? (
        <p className={`mt-1 flex items-center gap-2 ${bodyClassName}`}>
          <Phone size={14} aria-hidden="true" />
          <span>{phone}</span>
        </p>
      ) : null}
      {email ? (
        <p className={`mt-1 flex items-center gap-2 ${bodyClassName}`}>
          <Mail size={14} aria-hidden="true" />
          <a href={`mailto:${email}`} className={emailClassName}>{email}</a>
        </p>
      ) : null}
      {directionsUrl ? (
        <p className="mt-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={directionsClassName}
          >
            Get Directions →
          </a>
        </p>
      ) : null}
    </div>
  )
}

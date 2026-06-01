import type { ReactNode } from 'react'

type FormattedTextProps = {
  text?: string | null
  className?: string
}

type FormattedInlineTextProps = {
  text?: string | null
  className?: string
}

const urlRegex = /(https?:\/\/[^\s]+)/g

function renderLinkedText(text: string): ReactNode[] {
  return text.split(urlRegex).map((part, index) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={`link-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      )
    }

    return <span key={`text-${index}`}>{part}</span>
  })
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  if (!text) {
    return null
  }

  return <p className={`${className} whitespace-pre-line break-words`}>{renderLinkedText(text)}</p>
}

export function FormattedInlineText({ text, className = '' }: FormattedInlineTextProps) {
  if (!text) {
    return null
  }

  return <span className={`${className} break-words`}>{renderLinkedText(text)}</span>
}
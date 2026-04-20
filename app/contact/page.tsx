'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState('')

  async function handleSubmit(e:any) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target) as any)
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) setStatus('Message sent — thank you!')
    else setStatus('Error sending message')
    e.target.reset()
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Your name" required className="rounded border p-3" />
        <input name="email" type="email" placeholder="Your email" required className="rounded border p-3" />
        <textarea name="message" placeholder="Message" required className="min-h-32 rounded border p-3" />
        <button className="rounded bg-blue-700 px-4 py-3 text-white">Send</button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  )
}

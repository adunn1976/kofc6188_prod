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
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Your name" required className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Your email" required className="border p-2 rounded" />
        <textarea name="message" placeholder="Message" required className="border p-2 rounded" />
        <button className="bg-blue-700 text-white px-4 py-2 rounded">Send</button>
      </form>
      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  )
}

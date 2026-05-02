"use client"

import Link from "next/link"
import { useState } from "react"

const agentReferralCode = "RHICKEY"
const preferredLocalCouncil = "6188"
const officialJoinUrl = "https://www.kofc.org/get-involved/join-kofc/"

export default function JoinPage() {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCouncil, setCopiedCouncil] = useState(false)

  async function copyText(value: string, type: "code" | "council") {
    try {
      await navigator.clipboard.writeText(value)
      if (type === "code") {
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 1800)
      } else {
        setCopiedCouncil(true)
        setTimeout(() => setCopiedCouncil(false), 1800)
      }
    } catch {
      // no-op fallback
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Join the Knights of Columbus</h1>
      <p className="mt-4 text-slate-700">
        The KofC form does not reliably prefill from external links. Use the values below, then continue to the official form.
      </p>

      <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">Agent Referral Code</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="rounded bg-slate-100 px-3 py-2 font-mono text-sm text-slate-900">{agentReferralCode}</span>
            <button
              type="button"
              onClick={() => copyText(agentReferralCode, "code")}
              className="rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {copiedCode ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Preferred Local Council</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="rounded bg-slate-100 px-3 py-2 font-mono text-sm text-slate-900">{preferredLocalCouncil}</span>
            <button
              type="button"
              onClick={() => copyText(preferredLocalCouncil, "council")}
              className="rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {copiedCouncil ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>Open the official KofC Join form.</li>
          <li>Check the “I have an Agent Referral Code” box.</li>
          <li>Paste the code and preferred council values above.</li>
        </ol>

        <a
          href={officialJoinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded bg-yellow-400 px-4 py-2 font-semibold text-blue-900 hover:bg-yellow-300"
        >
          Continue to Official Join Form
        </a>
      </div>

      <p className="mt-6 text-sm text-slate-600">
        Need help? <Link href="/contact" className="font-semibold text-blue-700 hover:underline">Contact our council</Link>.
      </p>
    </section>
  )
}

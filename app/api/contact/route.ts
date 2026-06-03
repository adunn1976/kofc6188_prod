import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { client } from '@/lib/sanity.client'
import { siteSettingsQuery } from '@/lib/sanity.queries'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing name, email, or message' }, { status: 400 })
    }

    // Fetch destination email from Sanity
    const settings = await client.fetch(siteSettingsQuery)
    const toEmail = settings?.contactEmail

    if (!toEmail) {
      console.error('No contactEmail configured in Sanity Site Settings')
      return NextResponse.json({ error: 'Contact email not configured' }, { status: 500 })
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP environment variables are not configured')
      return NextResponse.json({ error: 'Email server is not configured' }, { status: 500 })
    }

    await transporter.sendMail({
      from: `Website Contact <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

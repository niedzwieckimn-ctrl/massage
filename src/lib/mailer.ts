import { Resend } from 'resend'
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
export async function sendEmail(to: string, subject: string, html: string) {
  if (!resend) return
  const from = process.env.FROM_EMAIL || 'no-reply@example.com'
  try { await resend.emails.send({ to, from, subject, html }) } catch (e) { console.error('Email error:', e) }
}

import { Handler } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'

const prisma = new PrismaClient()
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const handler: Handler = async () => {
  const now = new Date()
  const in24 = new Date(now.getTime() + 24*60*60*1000)
  const upcoming = await prisma.booking.findMany({
    where: { status: 'CONFIRMED', slot: { start: { gte: now, lte: in24 } } },
    include: { customer: true, slot: true, service: true }
  })
  if (!resend) return { statusCode: 200, body: 'No RESEND_API_KEY, skipping' }
  for (const b of upcoming) {
    const when = b.slot.start.toISOString()
    await resend.emails.send({
      to: b.customer.email,
      from: process.env.FROM_EMAIL || 'no-reply@example.com',
      subject: 'Przypomnienie o wizycie',
      html: `<p>Przypomnienie: ${b.service.name} — ${when}</p>`
    })
  }
  return { statusCode: 200, body: `Reminders sent: ${upcoming.length}` }
}

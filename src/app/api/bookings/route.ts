import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { sendSMS } from '@/lib/sms'

export async function GET() {
  const items = await prisma.booking.findMany({ include: { service: true, customer: true, slot: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      serviceId: number, slotId: number, name: string, email: string, phone?: string, notes?: string
    }

    const slot = await prisma.slot.findUnique({ where: { id: body.slotId }, include: { booking: true } })
    if (!slot || !slot.isActive) return NextResponse.json({ error: 'Ten termin jest niedostępny' }, { status: 400 })
    if (slot.booking) return NextResponse.json({ error: 'Termin już zajęty' }, { status: 409 })

    const customer = await prisma.customer.upsert({
      where: { email: body.email },
      update: { name: body.name, phone: body.phone ?? undefined },
      create: { email: body.email, name: body.name, phone: body.phone }
    })

    const booking = await prisma.booking.create({
      data: { serviceId: body.serviceId, customerId: customer.id, slotId: body.slotId, notes: body.notes }
    })

    const admin = process.env.ADMIN_EMAIL
    const when = slot.start.toLocaleString()
    const subject = `Nowa rezerwacja #${booking.id}`
    const html = `<p>Dziękujemy za rezerwację.</p><p>Termin: <b>${when}</b></p><p>Usługa ID: ${body.serviceId}</p>`
    await sendEmail(customer.email, subject, html)
    if (admin) await sendEmail(admin, `Nowa rezerwacja #${booking.id}`, `Klient: ${customer.name} (${customer.email})<br/>Termin: ${when}`)
    if (customer.phone) await sendSMS(customer.phone, `Rezerwacja potwierdzona: ${when}`)

    return NextResponse.json({ ok: true, id: booking.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const body = await req.json() as { id: number, status: 'PENDING'|'CONFIRMED'|'CANCELLED' }
  const upd = await prisma.booking.update({ where: { id: body.id }, data: { status: body.status } })
  return NextResponse.json(upd)
}

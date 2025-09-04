import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const items = await prisma.slot.findMany({ where: { isActive: true }, orderBy: { start: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json() as { date: string, startHour: number, endHour: number, intervalMin: number, staffId?: number }
  const date = new Date(body.date)
  const start = new Date(date); start.setHours(body.startHour, 0, 0, 0)
  const end = new Date(date); end.setHours(body.endHour, 0, 0, 0)

  const toCreate = []
  for (let t = new Date(start); t < end; t = new Date(t.getTime() + body.intervalMin * 60000)) {
    const s = new Date(t)
    const e = new Date(t.getTime() + body.intervalMin * 60000)
    toCreate.push({ start: s, end: e, staffId: body.staffId ?? null, isActive: true })
  }
  await prisma.slot.createMany({ data: toCreate, skipDuplicates: true })
  return NextResponse.json({ ok: true, created: toCreate.length })
}

export async function DELETE(req: Request) {
  const { slotId } = await req.json()
  await prisma.slot.update({ where: { id: slotId }, data: { isActive: false } })
  return NextResponse.json({ ok: true })
}

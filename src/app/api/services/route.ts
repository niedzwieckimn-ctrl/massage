import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const items = await prisma.service.findMany({ orderBy: { id: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const body = await req.json()
  const item = await prisma.service.create({ data: { name: body.name, durationMin: body.durationMin, price: body.price, active: true } })
  return NextResponse.json(item)
}

export async function PUT(req: Request) {
  const body = await req.json()
  const item = await prisma.service.update({ where: { id: body.id }, data: { name: body.name, durationMin: body.durationMin, price: body.price, active: body.active } })
  return NextResponse.json(item)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

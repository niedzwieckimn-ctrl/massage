// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // �eby unikn�� wielu instancji w trybie dev
  var prisma: PrismaClient | undefined
}

const client = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = client

export default client

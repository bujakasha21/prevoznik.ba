// u Next.js dev modu, server se restartuje pri svakoj promjeni fajla. Bez ovog koda, svaki restart bi kreirao
// novu konekciju na bazu i brzo bi potrosio sve dostupne konekcije.
// ako vec postoji prisma client, radi sa tim - ne pravi novi

import { PrismaClient } from "@prisma/client/extension";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
globalForPrisma.prisma ?? new PrismaClient()

if(process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password, role, phone, city } = body

        if (!name || !email || !password || !role ) {
            return NextResponse.json(
                { error: "Sva obavezna polja moraju biti popunjena" },
                { status: 400 }
            )
        }

        if (role === "ADMIN") {
            return NextResponse.json(
                { error: "Nije dozvoljeno kreirati admin nalog" },
                { status: 403 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Korisnik s ovim emailom već postoji"},
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                phone: phone || null,
                city: city || null,
            },
        })

        return NextResponse.json(
            { message: "Nalog uspješno kreiran", userId: user.id },
            { status: 201 } 
        )
    } catch (error) {
        console.error("Signup error:", error)
        return NextResponse.json(
            { error: "Došlo je do greške, pokušajte ponovo" },
            { status: 500 }
        )
    }
}
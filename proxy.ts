import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")

    if (isDashboard && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url ))
    }

    if (isAuthPage && isLoggedIn) {
        const role = req.auth?.user?.role
        if(role === "PREVOZNIK") {
            return NextResponse.redirect(new URL("/dashboard/prevoznik", req.url))
        }
        else if (role === "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard/admin", req.url))
        }
        return NextResponse.redirect(new URL("/dashboard/korisnik", req.url))
    }
    return NextResponse.next()
})

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
}
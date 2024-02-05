// export { default } from "next-auth/middleware"

// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/upload")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/dashboard")
            && (request.nextauth.token.role === "pnp admin" || request.nextauth.token.role === "pnp user")) {
            return NextResponse.redirect(
                new URL("/achievement", request.url)
            )
        }

        // if (request.nextauth.token?.role !== "PNP Admin") {
        //     return NextResponse.redirect(
        //         new URL("/achievement", request.url)
        //     )
        // }

        // if (request.nextUrl.pathname.startsWith("/client")
        //     && request.nextauth.token?.role !== "admin"
        //     && request.nextauth.token?.role !== "manager") {
        //     return NextResponse.rewrite(
        //         new URL("/denied", request.url)
        //     )
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)


export const config = { matcher: ["/settings", "/dashboard", "/target", "/map", "/upload", "/outlet/:id*", "/achievement"] }
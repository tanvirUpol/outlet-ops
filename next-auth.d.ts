import { DefaultSession,DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt"


declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string,
            outlets: Array,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string,
        outlets: Array
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        role: string,
        outlets: Array,
    }
}
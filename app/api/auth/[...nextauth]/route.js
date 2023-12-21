
import NextAuth from "next-auth/next";
import { authOptions } from "./option";
// import bcrypt from "bcryptjs";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { connectMongoDB } from "@/lib/mongodb";
import UserSchemaModel from "@/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
  
        async authorize(credentials) {
          const { email, vcode } = credentials;
  
          try {
            await connectMongoDB();
            const user = await UserSchemaModel.findOne({ email });
  
            const storedVerificationCode = user.vcode
  
            if (!storedVerificationCode ||  storedVerificationCode != vcode ) {
              return null;
            }
  
            await UserSchemaModel.findOneAndUpdate({email}, {vcode: ""});
  
            return user;
          } catch (error) {
            console.log("Error", error);
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if(user) token.role = user.role
        return token
      },
      async session({ session, token }) {
        if(session?.user) session.user.role = token.role
        return session
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
    },
  };
import { connectMongoDB } from "@/lib/mongodb";
import UserSchemaModel from "@/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      // async authorize(credentials) {
      //   // const { email, vcode } = credentials;

      //   try {
      //     await connectMongoDB();
      //     const user = await UserSchemaModel.findOne({ email });

      //     const storedVerificationCode = user.vcode

      //     if (!storedVerificationCode ||  storedVerificationCode != vcode ) {
      //       return null;
      //     }

      //     await UserSchemaModel.findOneAndUpdate({email}, {vcode: ""});

      //     return user;
      //   } catch (error) {
      //     console.log("Error", error);
      //   }
      // },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          if (!email || !password) {
            return Promise.resolve(null, {
              message: "Invalid email or password",
            });
          }

          await connectMongoDB();
          const user = await UserSchemaModel.findOne({ email });

          if (!user) {
            return Promise.resolve(null, {
              message: "User does not exist",
            });
          }

          const valid = await bcrypt.compare(password, user.password);

          if (!valid) {
            return Promise.resolve(null, {
              message: "Wrong password",
            });
          }

          // const storedVerificationCode = user.vcode;

          // if (!storedVerificationCode || storedVerificationCode != vcode) {
          //   return null;
          // }

          // await UserSchemaModel.findOneAndUpdate({ email }, { vcode: "" });

          return user;
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.outlets = user.outlets;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.outlets = token.outlets
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

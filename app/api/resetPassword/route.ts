import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import UserSchemaModel from "@/models/userModel";
import { getToken } from "next-auth/jwt"




export async function POST(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log(token);
    try {
        await connectMongoDB();
        const { password, newPassword } = await req.json();
        // console.log(email,password,newPassword);

        const email = token?.email

        if (!email || !password || !newPassword) {
            return NextResponse.json({ message: "Please enter password and new password" }, { status: 409 })
        }
        if (email && password) {
            const user = await UserSchemaModel.findOne({ email }).select('_id email password');
            if (!user) {
                return NextResponse.json({ message: "User does not exist" }, { status: 409 })
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return NextResponse.json({ message: "Invalid Password" }, { status: 409 })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
         
            const updatedUser = await UserSchemaModel.findOneAndUpdate({email}, {password: hashedPassword}, {
                new: true, // Return the modified document rather than the original
                projection: '_id email', // Specify the fields to return in the result
            });
            // return NextResponse.json({ message:`Password changed successfully!`, email:updatedUser.email }, { status: 200 })
            return NextResponse.json({ message:`Password changed successfully!` }, { status: 200 })
        }



    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while changing password!" }, { status: 500 })
    }
}

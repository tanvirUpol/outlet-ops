import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import UserSchemaModel from "@/models/userModel";

export async function POST(req: Request) {
    try {
        const { email, password, name, role, outlets } = await req.json();
        await connectMongoDB();
        const user = await UserSchemaModel.findOne({ email }).select("_id");
        if (user) {
            return NextResponse.json({ message: "User already exists!" }, { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await UserSchemaModel.create({ email, password: hashedPassword, name, role, outlets })
        return NextResponse.json({ message: "User Registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user!." }, { status: 500 })
    }
}


export async function GET() {
    await connectMongoDB();
    const data = await UserSchemaModel.find();
    return NextResponse.json(data);
}
  
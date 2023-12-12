import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import keyStoreModel from "@/models/keyStoreModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // console.log(data);
        // console.log(data);
        await connectMongoDB();
        await keyStoreModel.deleteMany({})
        await keyStoreModel.create(data) 
        return NextResponse.json({message: "Data Submitted"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}



export async function GET() {
    await connectMongoDB();
    const data = await keyStoreModel.find();
    return NextResponse.json(data);
  }
  
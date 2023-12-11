import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import storeLevelModel from "@/models/storeLevelModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await connectMongoDB();
        await storeLevelModel.deleteMany({})
        await storeLevelModel.create(data) 
        return NextResponse.json({message: "Data Submitted"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}



export async function GET() {
    await connectMongoDB();
    const data = await storeLevelModel.find();
    return NextResponse.json(data);
  }
  
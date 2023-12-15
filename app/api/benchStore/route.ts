import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import benchStoresModel from "@/models/BenchStoresModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await connectMongoDB();
        await benchStoresModel.deleteMany({})
        await benchStoresModel.create(data) 
        return NextResponse.json({message: "Data Submitted"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}



export async function GET() {
    try {
        await connectMongoDB();
        const data = await benchStoresModel.find();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
  }
  
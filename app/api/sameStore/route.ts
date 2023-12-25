import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import sameStoreModel from "@/models/sameStoreModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // console.log(data);
        const resultArray = data.map(item => item.code);
        // console.log(resultArray);
        await connectMongoDB();
        await sameStoreModel.deleteMany()
        await sameStoreModel.create({outlet_code: resultArray}) 
        return NextResponse.json({message: "Data Submitted"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}



export async function GET() {
    await connectMongoDB();
    const data = await sameStoreModel.find();
    console.log(data[0].outlet_code);
    return NextResponse.json(data[0].outlet_code);
  }
  
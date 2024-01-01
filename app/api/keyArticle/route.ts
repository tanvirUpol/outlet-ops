import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
// import keyStoreModel from "@/models/keyStoreModel";
import keyArticleModel from "@/models/keyArticle";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        // console.log(data);
        console.log(data);
        await connectMongoDB();
        await keyArticleModel.deleteMany({})
        await keyArticleModel.create(data) 
        return NextResponse.json({message: "Data Submitted"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}



export async function GET() {
    await connectMongoDB();
    const data = await keyArticleModel.find();
    return NextResponse.json(data);
  }
  
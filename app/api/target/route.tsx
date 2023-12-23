import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import UserSchemaModel from "@/models/userModel";
import TargetShemaModel from "@/models/targetModel";


export async function POST(req) {
    try {
        await connectMongoDB();
        const data = await req.json();
        await TargetShemaModel.deleteMany({})
        await TargetShemaModel.create(data)
        return NextResponse.json({ message: "Data Submitted" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while submitting the data!." }, { status: 500 })
    }
}



export async function GET(req) {
    // const session = await getServerSession(authOptions)
    // console.log(process.env.NEXTAUTH_SECRET );
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    await connectMongoDB();

    if(token.role === "admin"){
        const targetLevelData = await TargetShemaModel.find().lean();
        return NextResponse.json(targetLevelData);
    }else if(token.role === "zonal") {
        // console.log(token.name);
        const targetLevelData =  await TargetShemaModel.findOne({ zonal: token.name })
        // console.log(targetLevelData);
        return NextResponse.json([targetLevelData]);
    }
}
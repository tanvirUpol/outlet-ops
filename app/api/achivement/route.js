import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import AchievementModel from "@/models/PnpAchivement";
// import bcrypt from "bcryptjs"

export async function POST(req) {
    try {
        const dataArray = await req.json();
        await connectMongoDB();
        // await AchievementModel.createOrUpdateDataArray(data);

        try {
            await AchievementModel.deleteMany({month: dataArray[0].month})
            await AchievementModel.insertMany(dataArray);
            
            return NextResponse.json({message: "Data Submitted"}, {status: 201})
        } catch (error) {
            console.error('Error creating or updating data array:', error);
            return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
        }

        
    } catch (error) {
    return NextResponse.json({message: "An error occurred while submitting the data!."}, {status: 500})
    }
}


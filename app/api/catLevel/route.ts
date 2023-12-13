import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
// import storeLevelModel from "@/models/storeLevelModel";
import keyStoreModel from "@/models/keyStoreModel";
import catLevelModel from "@/models/catLevelModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // console.log(data);
        await connectMongoDB();
        await catLevelModel.deleteMany({})
        await catLevelModel.insertMany(data)
        return NextResponse.json({ message: "Data Submitted" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while submitting the data!." }, { status: 500 })
    }
}



export async function GET() {
    await connectMongoDB();
    const catLevelData = await catLevelModel.find().lean();
    const keyStoreData = await keyStoreModel.find().lean();

    // Merge arrays A and B based on outlet_code
    const updatedA = catLevelData.map(objA => {
        const matchingObjectInB = keyStoreData.find(objB => objB.outlet_code === objA.outlet_code);
    
        if (matchingObjectInB) {
        // Create a new object with added properties
        return {
            ...objA,
            outlet_division: matchingObjectInB.outlet_division,
            outlet_zone: matchingObjectInB.outlet_zone,
            outlet_status: matchingObjectInB.outlet_status
        };
        }
    
        // If no match is found, return the original object
        return objA;
    });

    // console.log(updatedA);
    return NextResponse.json(updatedA);
}

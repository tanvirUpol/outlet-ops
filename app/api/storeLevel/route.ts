import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import storeLevelModel from "@/models/storeLevelModel";
import keyStoreModel from "@/models/keyStoreModel";
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await connectMongoDB();
        await storeLevelModel.deleteMany({})
        await storeLevelModel.create(data)
        return NextResponse.json({ message: "Data Submitted" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while submitting the data!." }, { status: 500 })
    }
}



export async function GET() {
    await connectMongoDB();
    const storeLevelData = await storeLevelModel.find().lean();
    const keyStoreData = await keyStoreModel.find().lean();

    // Merge arrays A and B based on outlet_code
    const updatedA = storeLevelData.map(objA => {
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
    return NextResponse.json(updatedA);
}

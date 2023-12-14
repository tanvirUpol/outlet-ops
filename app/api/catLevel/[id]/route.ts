import { connectMongoDB } from "@/lib/mongodb";
import catLevelModel from "@/models/catLevelModel";
import keyStoreModel from "@/models/keyStoreModel";
import { NextResponse } from "next/server";


export async function GET(req:Request, {params}: { params: { id:string } }) {

    console.log(params);

    const {id} = params
    await connectMongoDB();
    const keyStoreData = await keyStoreModel.find({outlet_code: id}).lean()
    const catLevelData = await catLevelModel.find({outlet_code: id}).lean();

    console.log(catLevelData);



    const updatedA = catLevelData.map(objA => {
        const matchingObjectInB = keyStoreData.find(objB => objB.outlet_code === objA.outlet_code);
    
        if (matchingObjectInB) {
        // Create a new object with added properties
        return {
            ...objA,
            outlet_division: matchingObjectInB.outlet_division,
            outlet_zone: matchingObjectInB.outlet_zone,
            outlet_status: matchingObjectInB.outlet_status,
            outlet_format: matchingObjectInB.outlet_format
        };
        }

        console.log(objA);
    
        // If no match is found, return the original object
        return objA;
    });



    return NextResponse.json(updatedA)

}
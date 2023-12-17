import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import storeLevelModel from "@/models/storeLevelModel";
import keyStoreModel from "@/models/keyStoreModel";
import benchStoresModel from "@/models/BenchStoresModel";


const findBencOutlets = (data:any[]): any[] => {
    // Create an object to store the oldest item for each outlet_format
    const benchObj: { [any: string]: any } = {};
  
    // Loop through the array of data to find the oldest item for each outlet_format
    data.forEach((item: any) => {
      const { outlet_code, outlet_name , outlet_format, gp_percent } = item;
      // If the outlet_format is not already in the object or the current item is older
      if (!benchObj[outlet_format] || parseFloat(gp_percent) > parseFloat(benchObj[outlet_format].gp_percent)) {
        benchObj[outlet_format] = { outlet_code, outlet_name , outlet_format };
      }
    });
  
    // Convert the object values (oldest data per outlet_format) to an array
    const benchObjArr = Object.values(benchObj);
  
    return benchObjArr;
  };
// import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        await connectMongoDB();
        await storeLevelModel.deleteMany({})
        
        const keyStoreData = await keyStoreModel.find().lean();
        const data = await req.json();

        // console.log(data);

        const updatedA = data.map((objA: { outlet_code: any; }) => {
            const matchingObjectInB = keyStoreData.find(objB => objB.outlet_code === objA.outlet_code);
    
            if (matchingObjectInB) {
                // Create a new object with added properties
                return {
                    ...objA,
                    outlet_division: matchingObjectInB.outlet_division || "not available",
                    outlet_zone: matchingObjectInB.outlet_zone || "not available",
                    outlet_status: matchingObjectInB.outlet_status || "not available",
                    outlet_format: matchingObjectInB.outlet_format || "not available",
                };
            }else{
                return {
                    ...objA,
                    outlet_division:  "not available",
                    outlet_zone:  "not available",
                    outlet_status:  "not available",
                    outlet_format:  "not available"
                    
                };
            }

        });




        // console.log(updatedA);

        
        await benchStoresModel.create(findBencOutlets(updatedA))
        await storeLevelModel.create(updatedA)
        return NextResponse.json({ message: "Data Submitted" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while submitting the data!." }, { status: 500 })
    }
}



export async function GET() {
    await connectMongoDB();
    const storeLevelData = await storeLevelModel.find().lean();
    // const keyStoreData = await keyStoreModel.find().lean();

    // // Merge arrays A and B based on outlet_code
    // const updatedA = storeLevelData.map(objA => {
    //     const matchingObjectInB = keyStoreData.find(objB => objB.outlet_code === objA.outlet_code);

    //     if (matchingObjectInB) {
    //         // Create a new object with added properties
    //         return {
    //             ...objA,
    //             outlet_division: matchingObjectInB.outlet_division,
    //             outlet_zone: matchingObjectInB.outlet_zone,
    //             outlet_status: matchingObjectInB.outlet_status
    //         };
    //     }

    //     // If no match is found, return the original object
    //     return objA;
    // });
    return NextResponse.json(storeLevelData);
}

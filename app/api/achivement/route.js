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
            // Extract unique months and outlet names from the array
            // const uniqueCombos = new Set(dataArray.map(data => `${data.outlet_name}_${data.month}`));
            // console.log(uniqueCombos);
            // Iterate through unique combinations
            // for (const data of dataArray) {
            //     // const [outletName, month] = combo.split('_');

            //     // console.log(outletName, month);
    
            //     // Check if data with the same month and outlet_name already exists
            //     const existingData = await AchievementModel.findOne({  month:data.month });
    
            //     if (existingData) {
            //         // If data with the same month and outlet_name exists, delete it
            //         // console.log(existingData);
            //         await AchievementModel.deleteOne({ outlet_name: outletName, month });
            //     }
    
            //     // Create new data
            //     const newDataArray = dataArray
            //         .filter(data => data.outlet_name === outletName && data.month === month)
            //         .map(data => ({
            //             outlet_name: data.outlet_name,
            //             month: data.month,
            //             achievement_target: data.achievement_target,
            //             total_target: data.total_target,
            //             outlet_division: data.outlet_division,
            //             outlet_format: data.outlet_format,
            //             outlet_code: data.outlet_code,
            //             cat_3: data.cat_3,
            //             // Add other properties as needed
            //         }));
    
            //     }
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


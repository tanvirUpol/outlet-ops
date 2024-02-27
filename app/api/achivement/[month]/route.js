import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import AchievementModel from "@/models/PnpAchivement"
import InvoiceModel from "@/models/InvoiceModel"
import { getToken } from "next-auth/jwt"
import UserSchemaModel from "@/models/userModel";




export async function GET(req, { params } ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // console.log(token);
    try {
        // console.log(params);
        const { month  } = params;
        await connectMongoDB();

        let InvData;
        let achData;

        
        if(token?.outlets?.length > 0){
            // console.log("asas");
            const today = new Date()
            const user = await UserSchemaModel.findOne({email: token.email})
            console.log(today, user.lastActive);
            const updatedUser = await UserSchemaModel.findOneAndUpdate({email: token.email}, { lastActive:today } , {new: true})
            InvData = await InvoiceModel.find({ month , outlet_code:{ $in: token?.outlets} }).lean();
            achData = await AchievementModel.find({ month, outlet_code:{ $in: token?.outlets} }).lean();
        }else{
            const today = new Date()
            const user = await UserSchemaModel.findOne({email: token.email})
            const timeDiff = (today.getMinutes() - user.lastActive.getMinutes());
            const updatedUser = await UserSchemaModel.findOneAndUpdate({email: token.email}, { lastActive:today, activityCount: timeDiff >=3? user.activityCount + 1 : user.activityCount } , {new: true})
            achData = await AchievementModel.find({ month }).lean();
            // Extract outlet codes from fetched data
            const outletCodesArray = achData.map(data => data.outlet_code);
            // console.log(outletCodesArray);

            InvData = await InvoiceModel.find({ month, outlet_code: { $in: outletCodesArray } }).lean();
        }

        // console.log();
         
        // const catLevelData = await catLevelModel.find({ outlet_code: id }).lean();

        return NextResponse.json({achData,InvData})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while getting the data!."}, {status: 500})
    }
}

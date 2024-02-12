import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import AchievementModel from "@/models/PnpAchivement"
import InvoiceModel from "@/models/InvoiceModel"
import { getToken } from "next-auth/jwt"


export async function GET(req, { params } ) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log(token);
    try {
        console.log(params);
        const { month  } = params;
        await connectMongoDB();

        let InvData;
        let achData;

        
        if(token?.outlets?.length > 0){
            console.log("asas");
            InvData = await InvoiceModel.find({ month , outlet_code:{ $in: token?.outlets} }).lean();
            achData = await AchievementModel.find({ month, outlet_code:{ $in: token?.outlets} }).lean();
        }else{
            InvData = await InvoiceModel.find({ month }).lean();
            achData = await AchievementModel.find({ month }).lean();
        }

        // console.log();
         
        // const catLevelData = await catLevelModel.find({ outlet_code: id }).lean();

        return NextResponse.json({achData,InvData})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "An error occurred while getting the data!."}, {status: 500})
    }
}

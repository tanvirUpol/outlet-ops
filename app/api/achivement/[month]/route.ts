import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import AchievementModel from "@/models/PnpAchivement"
import InvoiceModel from "@/models/InvoiceModel"

export async function GET(req: Request, { params }: { params: { month: string } }) {
    try {
        console.log(params);
        const { month  } = params;
        await connectMongoDB();
        
        const InvData = await InvoiceModel.find({ month }).lean();

        // console.log();
        const achData = await AchievementModel.find({ month }).lean();
        // const catLevelData = await catLevelModel.find({ outlet_code: id }).lean();

        return NextResponse.json({achData,InvData})

    } catch (error) {
        return NextResponse.json({message: "An error occurred while getting the data!."}, {status: 500})
    }
}

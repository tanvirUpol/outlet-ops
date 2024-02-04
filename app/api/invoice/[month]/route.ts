import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import InvoiceModel from "@/models/InvoiceModel"

export async function GET(req: Request, { params }: { params: { month: string } }) {
    try {
        console.log(params);
        const { month  } = params;
        await connectMongoDB();
        
        const invData = await InvoiceModel.find({ month }).lean();
        // const catLevelData = await catLevelModel.find({ outlet_code: id }).lean();

        return NextResponse.json(invData)

    } catch (error) {
        return NextResponse.json({message: "An error occurred while getting the data!."}, {status: 500})
    }
}

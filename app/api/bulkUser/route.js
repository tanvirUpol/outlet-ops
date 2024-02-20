import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import UserSchemaModel from "@/models/userModel";

function convertOutletsAndPasswordToString(users) {
    for (let user of users) {
        if (user.outlets && typeof user.outlets === 'string') {
            user.outlets = user.outlets.split(',');
        }
        if (user.password !== undefined) {
            user.password = user.password.toString();
        }
    }
    return users;
}


export async function POST(req) {
    try {


        const users = await req.json();
        const usersWithConvertedOutlets = convertOutletsAndPasswordToString(users);
        // console.log(usersWithConvertedOutlets);
        await connectMongoDB();

        for (let item of usersWithConvertedOutlets) {
            const user = await UserSchemaModel.findOne({ email: item.email }).select("_id");
            if (user) {
               console.log(`${item.email} already exists!`)
            }else{
                const hashedPassword = await bcrypt.hash(item.password, 10)
                await UserSchemaModel.create({ email: item.email, password: hashedPassword, name: item.name, role:item.role, outlets:item.outlets })
                console.log(`${item.email} Registered!`)
            }
        }
        // const user = await UserSchemaModel.findOne({ email }).select("_id");
        // if (user) {
        //     return NextResponse.json({ message: "User already exists!" }, { status: 409 })
        // }
        // const hashedPassword = await bcrypt.hash(password, 10)
        // await UserSchemaModel.create({ email, password: hashedPassword, name, role, outlets })
        return NextResponse.json({ message: `Registered!` }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occurred while registering the user!." }, { status: 500 })
    }
}


export async function GET() {
    await connectMongoDB();
    const data = await UserSchemaModel.find();
    return NextResponse.json(data);
}
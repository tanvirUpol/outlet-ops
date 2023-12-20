import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import UserSchemaModel from "@/models/userModel";
const nodemailer = require("nodemailer");


// Generate a random verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store temporary verification codes in memory
const verificationCodes = new Map();

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    // secure: false,
    auth: {
        user: "tanvirrahmanupol@gmail.com",
        pass: "qI5gr8JDZ37TambK",
    },
});



export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please enter a valid email and password" }, { status: 409 })
        }
        if (email && password) {
            const user = await UserSchemaModel.findOne({ email }).select('_id email password');
            if (!user) {
                return NextResponse.json({ message: "User does not exist" }, { status: 409 })
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                return NextResponse.json({ message: "Invalid Password" }, { status: 409 })
            }

            // Generate a new verification code
            const verificationCode = generateVerificationCode();

            const mailOptions = {
                from: "tanvirrahmanupol@gmail.com",
                to: email.toLowerCase(),
                subject: "Verification Code",
                text: `Your verification code is: ${verificationCode}`,
            };

            // res.status(200).json({ email, token });
            transporter.sendMail(mailOptions, (error: any) => {
                // console.log(mailOptions);
                if (error) {
                    console.log(error);
                    return NextResponse.json({ message: "Error sending verification code!" }, { status: 500 })
                }

                // Store the verification code in memory temporarily
                verificationCodes.set(email.toLowerCase(), verificationCode);
            });
            const updatedUser = await UserSchemaModel.findOneAndUpdate({email}, {vcode: verificationCode}, {
                new: true, // Return the modified document rather than the original
                projection: '_id email', // Specify the fields to return in the result
              });
            return NextResponse.json({ message:`Verification code sent successfully to:${updatedUser.email}`, email:updatedUser.email }, { status: 200 })
        }



    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured while logging in!" }, { status: 500 })
    }
}

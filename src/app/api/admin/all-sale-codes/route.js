import Code from "@/models/code";
import { NextResponse } from "next/server";
import connectToDB from "@/databse";


export const dynamic = "force-dynamic";

export async function GET(req) {

    try {
        await connectToDB();


        const extractAllCodes = await Code.find({})
        if (extractAllCodes) {
            return NextResponse.json({
                success: true,
                data: extractAllCodes
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "Aucun codes trouvés !",
            })
        }

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong ! Please try again later'
        })
    }


}
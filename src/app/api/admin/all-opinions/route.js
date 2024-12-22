import Opinion from "@/models/opinion";
import { NextResponse } from "next/server";
import connectToDB from "@/databse";


export const dynamic = "force-dynamic";

export async function GET(req) {

    try {
        await connectToDB();


        const extractAllOpinions= await Opinion.find({})
        if (extractAllOpinions) {
            return NextResponse.json({
                success: true,
                data: extractAllOpinions
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "Aucun avis trouvés !",
            })
        }

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Something went wrong ! Please try again later'
        })
    }


}
import connectToDB from "@/databse";
import Code from "@/models/code";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";



export async function GET(req) {
   
    try {
      
        await connectToDB();
        

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id')
        console.log(id)
        if (!id) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: 'Please provide a code'

            })
        }
        const getData = await Code.find({ code: id })

        if (getData && getData.length) {
            return NextResponse.json({
                message: "Réduction ajoutée correctement",
                success: true,
                data: getData[0],

            })

        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "Ce code n'existe pas"

            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went really wrong ! Please try again later'
        })
    }
}
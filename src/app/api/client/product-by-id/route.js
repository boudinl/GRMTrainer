import connectToDB from "@/databse";
import Product from "@/models/product";
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
                message: 'Please provide the id product'

            })
        }
        const getData = await Product.find({ _id: id })

        if (getData && getData.length) {
            return NextResponse.json({
                success: true,
                data: getData[0],

            })

        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "Pas de produits trouvés"

            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went really wrong ! Please try again later'
        })
    }
}
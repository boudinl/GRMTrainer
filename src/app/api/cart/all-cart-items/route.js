import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";




export const dynamic = "force-dynamic";


export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {

            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Vous devez vous connecter"
                })
            }

            const extractAllCartItems = await Cart.find({ userID: id }).populate('productID').populate('size')
            if (extractAllCartItems) {
                return NextResponse.json({
                    success: true,
                    data: extractAllCartItems
                })
            } else {

                return NextResponse.json({
                    success: false,
                    status: 204,
                    message: "Aucun produits trouvés"
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "VOus n'êtes pas autorisé"
            })
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went really wrong ! Please try again later'
        })
    }
}
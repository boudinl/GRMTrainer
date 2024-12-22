import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";




export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: 'Cart item id is required'
                })
            }

            const deletedCartItem = await Cart.findByIdAndDelete(id);

            if (deletedCartItem) {
                return NextResponse.json({
                    success: true,
                    message: 'Produit supprimé du panier'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de la suppression de l'article du panier ! Veuillez réessayer plus tard "
                })
            }
        }else{
            return NextResponse.json({
                success: false,
                message: "Vous n'êtes pas connecté"
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong ! Please try again later'
        })
    }
}
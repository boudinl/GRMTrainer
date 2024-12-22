import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";


export async function DELETE(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);
        if (isAuthUser?.role === 'admin') {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Il faut l'ID du produit a supprimer (code)"
                })
            }

            const deletedProduct = await Product.findByIdAndDelete(id);

            if (deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Produit supprimé correctement"
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de la suppression du produit ! Réessaye plus tard" 
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
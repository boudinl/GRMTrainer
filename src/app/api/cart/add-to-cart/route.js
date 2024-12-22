import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";



export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
    userID : Joi.string().required(),
    productID : Joi.string().required(),
    size : Joi.string()
})

export async function POST(req){
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser){

            const data = await req.json();
            console.log(data)
            const {productID, userID, size} = data;
            
            const {error} = AddToCart.validate({userID, productID, size})

            if(error){
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                }) 
            }
            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID : productID,
                userID : userID,
                ...(size && { size: size }),
            })
            if(isCurrentCartItemAlreadyExists?.length > 0){
                return NextResponse.json({
                    success: false,
                    message: "Ce produit est déjà dans le panier"
                }) 
            }

            const saveProductToCart = await Cart.create(data);
            if (saveProductToCart){
                return NextResponse.json({
                    success: true,
                    message: "Produit ajouté au panier"
                }) 
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de l'ajout au panier ! Veuillez réessayer plus tard "
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
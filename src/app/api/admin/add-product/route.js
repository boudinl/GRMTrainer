import AdminAddNewProduct from "@/app/admin-view/add-product/page";
import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().optional(),
    sizes: Joi.array().optional(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
    productType: Joi.string().valid('vetement', 'coaching', 'ebook').required(),  // Ajout du champ 'type'
    duration: Joi.number().optional(), // Optionnel, uniquement pour le type 'coaching'
    ebookFile: Joi.string().optional(),   // Optionnel, uniquement pour le type 'ebook'
});


export const dynamic = "force-dynamic";


export async function POST(req) {
    try {
        await connectToDB();

   
        const isAuthUser = await AuthUser(req);

      console.log(req)
        
        if (isAuthUser?.role === 'admin') {
            const extractData = await req.json()
            console.log(extractData);
            const {
                name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop, productType, duration, ebookFile
            } = extractData;
            const { error } = AddNewProductSchema.validate({
                name, description, price, imageUrl, category, sizes, deliveryInfo, onSale, priceDrop, productType, duration, ebookFile
            })
            console.log(extractData);
            if (error) {
                console.log(error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            const newlyCreatedProduct = await Product.create(extractData);
            if(newlyCreatedProduct){
                return NextResponse.json({
                    success: true,
                    message: 'Nouveau produit ajouté correctement'
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de l'ajout du nouveau produit ! Réessaye plus tard"
                })
            }
        } else {
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
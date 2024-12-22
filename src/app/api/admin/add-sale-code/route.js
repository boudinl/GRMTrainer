import AdminAddNewProduct from "@/app/admin-view/add-product/page";
import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Code from "@/models/code";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewSaleCode = Joi.object({
    code: Joi.string().required(),
    priceDrop: Joi.number().required(),
   
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
                code, priceDrop
            } = extractData;
            const { error } = AddNewSaleCode.validate({
                code, priceDrop
            })
            console.log(extractData);
            if (error) {
                console.log(error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            const newlyCreatedCode = await Code.create(extractData);
            if(newlyCreatedCode){
                return NextResponse.json({
                    success: true,
                    message: 'Nouveau code ajouté correctement'
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de l'ajout du nouveau code ! Réessaye plus tard"
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
import AdminAddNewProduct from "@/app/admin-view/add-product/page";
import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Opinion from "@/models/opinion";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewOpinion = Joi.object({
    description: Joi.string().required(),
    signature: Joi.string().required(),
   
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
                description, signature
            } = extractData;
            const { error } = AddNewOpinion.validate({
                description, signature
            })
            console.log(extractData);
            if (error) {
                console.log(error)
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message,
                })
            }

            const newlyCreatedOpinion = await Opinion.create(extractData);
            if(newlyCreatedOpinion){
                return NextResponse.json({
                    success: true,
                    message: 'Nouvel avis ajouté correctement'
                })
            }else{
                return NextResponse.json({
                    success: false,
                    message: "Echec lors de l'ajout du nouvel avis ! Réessaye plus tard"
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
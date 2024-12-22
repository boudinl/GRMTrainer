import connectToDB from "@/databse";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";


const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
})

export const dynamic = "force-dynamic";

export async function POST(req) {
    await connectToDB();
    console.log('connect to db')
    const { name, email, password, role } = await req.json();
    //validate the schema
    const { error } = schema.validate({ name, email, password, role })

    if (error) {
        console.log('errorAPI', error)
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        })
    }


    try {
        const isUserAlreadyExists = await User.findOne({ email })
        if (isUserAlreadyExists) {
            return NextResponse.json({
                success: false,
                message: 'Cet email est déjà utilisé pour un autre compte. Veuilliez vérifier votre email.'
            })
        } else {
            const hashPassword = await hash(password, 12);
            const newlyCreatedUser = await User.create({
                name, email, password: hashPassword, role
            })
            console.log('Lutilisateur', newlyCreatedUser);
            
            if (newlyCreatedUser) {
                return NextResponse.json({
                    success: true,
                    message: 'Compte créé correctement !'
                })
            }
        }
    } catch (error) {
        console.log('Error while new user registration ! Please try again')

        return NextResponse.json({
            success: false,
            message: 'Something went wrong ! Please try again later'
        })
    }
}
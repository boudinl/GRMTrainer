import connectToDB from "@/databse";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { compare } from "bcryptjs";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

})

export const dynamic = "force-dynamic";


export async function POST(req) {
    await connectToDB();

    const { email, password } = await req.json();

    const { error } = schema.validate({ email, password });

    if (error) {
        console.log('errorAPI', error)
        return NextResponse.json({
            success: false,
            message: error.details[0].message,
        })
    }

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return NextResponse.json({
                success: false,
                message: 'Pas de compte trouvé avec cet adresse'
            })
        }
        const checkPassword = await compare(password, checkUser.password);
        if (!checkPassword) {
            return NextResponse.json({
                success: false,
                message: 'Mot de passe incorrect. Veuillez réessayer'
            })
        }

        const token = jwt.sign({
            id: checkUser._id, email: checkUser?.email, role: checkUser?.role
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        const finalData = {
            token,
            user: {
                email: checkUser.email,
                name: checkUser.name,
                _id: checkUser._id,
                role: checkUser.role,
            }
        }
        return NextResponse.json({
            success: true,
            message: 'Connexion réussie',
            finalData,
        })

    } catch (error) {
        console.log('Error while logging In. Please try again')

        return NextResponse.json({
            success: false,
            message: 'Something went wrong ! Please try again later'
        })

    }


}

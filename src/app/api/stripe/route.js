import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST)
export const dynamic = 'force-dynamic'



export async function POST(req) {
    try {
        const isAuthUser = await AuthUser(req);
        if (isAuthUser) {
            const res = await req.json();
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: "http://localhost:3000/checkout" + "?status=success",
                cancel_url: "http://localhost:3000/checkout" + "?status=cancel",
            })

            return NextResponse.json({
                success: true,
                id: session.id,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Vous n'êtes pas connecté",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: 'Something went wrong during the paiement ! Please try again .'
        })

    }
}
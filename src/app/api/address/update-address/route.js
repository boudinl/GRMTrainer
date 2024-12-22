import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { _id, fullName, city, address, country, postalCode } = data;

      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );

      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "L'adresse a été modifiée correctement !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Echec lors de la modification de l'adresse ! Veuillez réessayer plus tard",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Vous n'êtes pas connecté",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const getAllOrders = await Order.find({})
        .populate("orderItems.product")
        .populate("user");

      if (getAllOrders) {
        return NextResponse.json({
          success: true,
          data: getAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "Echec lors de la récupérations des commandes ! Réessaye plus tard ",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Vous n'êtes pas autorisé !",
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
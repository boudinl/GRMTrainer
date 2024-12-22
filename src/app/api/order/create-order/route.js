import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { user } = data;
      console.log('data',data)
      const order = new Order(data);
console.log('Order avant save:', order);
      const saveNewOrder = await Order.create(data);
      console.log('saveNew', saveNewOrder)
      if (saveNewOrder) {
        await Cart.deleteMany({ userID: user });

        return NextResponse.json({
          success: true,
          message: "La commande est prise en compte !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Echec lors de la création de la commande ! ",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Vous n'êtes pas connecté",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
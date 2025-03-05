import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
// ✅ FONCTION POUR ENVOYER L'EMAIL
async function sendOrderEmail(order) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER, // Ton adresse e-mail
      pass: process.env.EMAIL_PASS, // Ton mot de passe (ou App Password)
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER, // Remplace par l'adresse du destinataire
    subject: "Nouvelle commande reçue",
    text: `Une nouvelle commande a été passée :
    - ID : ${order._id}
    - Montant : ${order.totalPrice} €
    - Méthode de paiement : ${order.paymentMethod}
    - Date : ${new Date(order.paidAt).toLocaleString()}
    - Informations client : ${order.shippingAddress}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'e-mail :", error);
  }
}
export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { user } = data;
      console.log("data", data);
      const order = new Order(data);
      console.log("Order avant save:", order);
      const saveNewOrder = await Order.create(data);
      await sendOrderEmail(saveNewOrder);
      console.log("saveNew", saveNewOrder);
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

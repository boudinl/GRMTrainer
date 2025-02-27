import connectToDB from "@/databse";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const extractData = await req.json();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser?.role === "admin") {
      const {
        _id,
        name,
        description,
        price,
        imageUrl,
        optionalImagesUrl,
        category,
        sizes,
        content,
        deliveryInfo,
        devis,
        onSale,
        priceDrop,
        productType,
        duration,
        ebookFile,
      } = extractData;

      const upDatedProduct = await Product.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          name,
          description,
          price,
          imageUrl,
          optionalImagesUrl,
          category,
          sizes,
          content,
          deliveryInfo,
          devis,
          onSale,
          priceDrop,
          productType,
          duration,
          ebookFile,
        },
        { new: true }
      );

      if (upDatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Produit modifié correctement ! ",
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "Echec de la modification du produit ! Veuillez réessayer plus tard",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Vous n'êtes pas autorisé !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went  wrong ! Please try again later",
    });
  }
}

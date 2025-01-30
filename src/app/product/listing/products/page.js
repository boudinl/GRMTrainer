import CommonListing from "@/components/CommonListing";
import DisplaySaleCodes from "@/components/DisplaySaleCodes";
import { productByProductType } from "@/services/product";

export const dynamic = "force-dynamic";
export default async function productsAllProducts() {
  const getAllProducts = await productByProductType("product");
  return (
    <div>
      <DisplaySaleCodes></DisplaySaleCodes>

      {/* Affichage des produits */}
      <CommonListing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}

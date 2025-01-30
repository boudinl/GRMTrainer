import CommonListing from "@/components/CommonListing";
import DisplaySaleCodes from "@/components/DisplaySaleCodes";
import { getAllAdminProducts } from "@/services/product";

export const dynamic = "force-dynamic";
export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();

  return (
    <div>
      <DisplaySaleCodes />
      {/* Affichage des produits */}
      <CommonListing data={getAllProducts && getAllProducts.data} />
    </div>
  );
}

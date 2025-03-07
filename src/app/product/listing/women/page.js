import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export const dynamic = "force-dynamic";
export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("women");

  return (
    <CommonListing data={getAllProducts && getAllProducts.data}></CommonListing>
  );
}

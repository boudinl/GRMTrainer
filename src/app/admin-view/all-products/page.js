import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";

export const dynamic = "force-dynamic";
export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts(); // Appel à la fonction asynchrone

  return (
    <CommonListing
      data={allAdminProducts && allAdminProducts.data}
    ></CommonListing>
  );
}

import CommonListing from "@/components/CommonListing";
import DisplaySaleCodes from "@/components/DisplaySaleCodes";
import { getAllAdminProducts } from "@/services/product";



export default async function AllProducts() {

    const getAllProducts = await getAllAdminProducts('http://localhost:3000')

    return (
        <div>
            <DisplaySaleCodes/>
            {/* Affichage des produits */}
            <CommonListing data={getAllProducts && getAllProducts.data} />
        </div>
    )
}

import CommonListing from "@/components/CommonListing";
import DisplaySaleCodes from "@/components/DisplaySaleCodes";
import { productByProductType } from "@/services/product";


export default async function coachingAllProducts() {

    const getAllProducts = await productByProductType('coaching')
   
    return (
        <div>
           <DisplaySaleCodes></DisplaySaleCodes>

            {/* Affichage des produits */}
            <CommonListing data={getAllProducts && getAllProducts.data} />
        </div>
    )
}

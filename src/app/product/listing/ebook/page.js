import CommonListing from "@/components/CommonListing";
import DisplaySaleCodes from "@/components/DisplaySaleCodes";
import { productByProductType } from "@/services/product";


export default async function eBookAllProducts() {

    const getAllProducts = await productByProductType('ebook')
    return (
        <div>
           <DisplaySaleCodes></DisplaySaleCodes>

            {/* Affichage des produits */}
            <CommonListing data={getAllProducts && getAllProducts.data} />
        </div>
    )
}

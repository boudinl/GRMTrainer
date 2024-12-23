import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/services/product";
import { getAllSaleCodes } from "@/services/saleCode";


export default async function AllProducts(){

const getAllProducts = await getAllAdminProducts('http://localhost:3000')
const saleCodes = await getAllSaleCodes()

    return (
        <div>
        {/* Bandeau des codes de réduction */}
        {saleCodes && saleCodes.data && saleCodes.data.length > 0 && (
            <div className="bg-gray-100 text-red-600 p-1 text-center ">
                <ul className="list-none p-0">
                    {saleCodes.data.map((code, index) => (
                        <li className="my-2" key={index}>
                             - {code.priceDrop}% de réduction avec le code : <strong>{code.code}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* Affichage des produits */}
        <CommonListing data={getAllProducts && getAllProducts.data} />
    </div>
    )
}

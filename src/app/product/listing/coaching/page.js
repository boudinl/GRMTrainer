import CommonListing from "@/components/CommonListing";
import { productByProductType } from "@/services/product";
import { getAllSaleCodes } from "@/services/saleCode";


export default async function coachingAllProducts() {

    const getAllProducts = await productByProductType('coaching')
    const saleCodes = await getAllSaleCodes()
    return (
        <div>
            {/* Bandeau des codes de réduction */}
            {saleCodes && saleCodes.data && saleCodes.data.length > 0 && (
                <div className="bg-or text-bordeaux p-1 text-center ">
                    <ul className="list-none p-0">
                        {saleCodes.data.map((code, index) => (
                            <li className="my-2" key={index}>
                                - {code.priceDrop}% de réduction avec le code : <strong>{code.code}</strong>
                                {code.sponsor && code.sponsor.trim() !== '' && (
                                    <span> grâce au partenaire <strong>{code.sponsor}</strong> </span>
                                )}
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

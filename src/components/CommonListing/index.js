"use client"

import { useRouter } from "next/navigation"
import ProductButtons from "./ProductButtons"
import ProductTile from "./ProductTile"
import { useEffect } from "react";
import Notification from "../Notification";




export default function CommonListing({data}) {
const router = useRouter();


const groupedProducts = data && data.length ? data.reduce((groups, product) => {
    const productType = product.productType || 'other'; // Valeur par défaut au cas où le type est manquant
    if (!groups[productType]) {
      groups[productType] = [];
    }
    groups[productType].push(product);
    return groups;
  }, {}) : {};

  // Si les données sont vides ou inexistantes
  if (!data || data.length === 0) {
    return <div>No products available</div>;
  }
useEffect(()=> {
router.refresh();
}, [])

    return <section className="bg-white py-5 sm:py-2">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-5">
          {Object.keys(groupedProducts).map((type) => (
            <div key={type} className="mb-5">
              <h2 className="text-3xl font-semibold mb-2 capitalize">
                {type === 'coaching' ? 'Coaching' : type === 'vetement' ? 'Vêtements' : type === 'ebook' ? 'Ebooks' : 'Autres'}
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-8">
                {groupedProducts[type].map((item) => (
                  <article
                    className="relative flex flex-col overflow-hidden border cursor-pointer"
                    key={item._id}
                  >
                    <ProductTile item={item} />
                    <ProductButtons item={item} />
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
<Notification></Notification>
    </section>
}



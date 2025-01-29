"use client";

import CommonListing from "@/components/CommonListing";
import ProductTile from "@/components/CommonListing/ProductTile";
import ProductButtons from "@/components/CommonListing/ProductButtons";
import { productByProductType } from "@/services/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Notification from "@/components/Notification";

export default function Home() {
  const [hovered, setHovered] = useState(null); // Etat pour savoir quelle image est survolée

  const handleMouseEnter = (index) => {
    setHovered(index); // Met à jour l'état lorsque l'on survole une image
  };

  const handleMouseLeave = () => {
    setHovered(null); // Réinitialise l'état quand le survol est terminé
  };
  const router = useRouter();

  const [physicalProducts, setPhysicalProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % physicalProducts.length);
    console.log(physicalProducts);
  };

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + physicalProducts.length) % physicalProducts.length
    );
  };
  async function getListOfProducts() {
    const res = await productByProductType("product");

    if (res.success) {
      setPhysicalProducts(res.data);
    }
    console.log(physicalProducts);
  }

  useEffect(() => {
    getListOfProducts();
  }, []);
  return (
    <div className=" py-8 px-16  sm:px-6 lg:px-16">
      <div className="max-w-screen  text-center ">
        <section className="m-8 w-full  max-w-screen max-h-screen  justify-center items-center ">
          <h1 className="text-4xl font-extrabold  mb-4 ">
            Découvre une nouvelle façon de t’entraîner !
          </h1>
          <div className="w-full h-full max-w-[1400px] flex flex-col xl:flex-row   ">
            <div className=" w-full xl:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
              <video
                className=" h-full object-contain rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 "
                autoPlay
                loop
                muted
                playsInline
                src="/accueilVideo.mov"
              />
            </div>

            <div className="flex xl:w-1/2  xl:p-8">
              <p>
                Ces offres sont minutieusement conçues pour répondre à vos
                besoins, que vous soyez débutant ou expert, et quels que soient
                vos objectifs. Spécialisé dans la perte de poids, j’accompagne
                également celles et ceux qui souhaitent développer leur masse
                musculaire, augmenter leur force, améliorer leur endurance ou
                exceller dans une discipline spécifique. La culture physique,
                lorsqu’elle est pratiquée de manière structurée et encadrée par
                un professionnel, peut non seulement offrir des résultats
                durables mais aussi de profondes satisfactions personnelles. Je
                vous propose une organisation optimisée de votre temps
                d’entraînement, avec des programmes parfaitement adaptés à vos
                besoins. Cette approche personnalisée vous permettra d’éviter de
                gaspiller votre énergie sur des exercices inefficaces,
                préservant ainsi votre motivation et accélérant vos progrès.
                Ensemble, nous maximiserons votre efficacité pour atteindre vos
                objectifs de manière rapide, durable et en toute sécurité.
              </p>
            </div>
          </div>
        </section>

        {/* Les services */}
        <section className="mb-16 mt-32 ">
          <h2
            className="text-4xl text-left font-bold text-stone-100 mb-4 cursor-pointer hover:text-bordeaux transition duration-300 ease-in-out"
            onClick={() => router.push(`/product/listing/all-products`)}
          >
            Mes prestations
          </h2>

          <div
            className="w-full relative md:w-full flex flex-wrap  justify-between border-4 border-bordeaux rounded-lg overflow-hidden max-w-full md:max-w-[80%] lg:max-w-[70%] mx-auto "
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300 ${
                hovered === 1
                  ? "transform md:translate-x-[+200%] translate-y-[-0%] md:translate-y-0 "
                  : ""
              } ${
                hovered === null || hovered === 1
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onMouseEnter={() => handleMouseEnter(1)}
              onClick={() => handleMouseEnter(1)}
            >
              <img
                src="/MesSuivis.jpg" // Remplacez par le chemin réel de l'image
                alt="Mes suivis"
                className="w-full h-auto max-h-[500px] object-cover object-top cursor-pointer"
              />
            </div>

            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300 ${
                hovered === 2
                  ? "transform md:translate-x-[-100%] translate-y-[-100%] md:translate-y-0"
                  : ""
              } ${
                hovered === null || hovered === 2
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onMouseEnter={() => handleMouseEnter(2)}
              onClick={() => handleMouseEnter(2)}
            >
              <img
                src="MethodeGrem.jpg" // Remplacez par le chemin réel de l'image
                alt="La méthode GRM"
                className="w-full h-auto max-h-[500px] object-cover cursor-pointer object-top"
              />
            </div>

            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300 ${
                hovered === 3
                  ? "transform md:translate-x-[-200%] translate-y-[-200%] md:translate-y-0 "
                  : ""
              } ${
                hovered === null || hovered === 3
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onMouseEnter={() => handleMouseEnter(3)}
              onClick={() => handleMouseEnter(3)}
            >
              <img
                src="MesProgrammes.jpg" // Remplacez par le chemin réel de l'image
                alt="Mes programmes"
                className="object-top w-full h-auto max-h-[500px] object-cover cursor-pointer"
              />
            </div>
            {hovered === 1 && (
              <div className="absolute inset-0 flex left-0 top-1/3 md:top-0 md:right-1/3 md:w-2/3 items-center justify-center bg-black  z-10">
                <div className="w-full h-full flex  items-center justify-center space-x-8 px-4 text-center">
                  <div className="text-white w-full max-w-4xl md:max-h-[600px] overflow-y-auto">
                    <h1 className="text-or text-4xl font-bold mt-4">
                      Mes suivis
                    </h1>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                      <div className="flex-1">
                        <p className="text-lg m-2">SUIVI EN LIGNE</p>
                        <ul className="list-disc list-inside marker:text-white text-white text-left pl-6">
                          <li>1 accès à l’application</li>
                          <li>1 programme personnalisé</li>
                          <li> 1 plan alimentaire</li>
                          <li>1 BOOSTBOX </li>
                          <li>Des séances et exercices vidéo</li>
                          <li>Des documents explicatifs</li>
                          <li>Suivi de la progression</li>
                          <li>Echanges quotidien via WhatsApp</li>
                          <li> Devis</li>
                        </ul>
                      </div>

                      <div className="flex-1">
                        <p className="text-lg m-2">SUIVI EN PRESENTIEL</p>
                        <ul className="list-disc list-inside marker:text-white text-white text-left pl-6">
                          <li>X séances en présentiel</li>
                          <li>1 accès à l’application</li>
                          <li> 1 programme personnalisé</li>
                          <li>1 plan alimentaire</li>
                          <li>1 BOOSTBOX</li>
                          <li>Des séances et exercices vidéo</li>
                          <li> Des documents explicatifs</li>
                          <li>Suivi de la progression</li>
                          <li>Echanges quotidien via WhatsApp</li>
                          <li>Devis</li>
                        </ul>
                      </div>
                    </div>
                    <a
                      href="mailto:trainer.grm@gmail.com?subject=Demande%20de%20devis&body=Bonjour,%20je%20souhaite%20demander%20un%20devis."
                      className="mt-1.5 inline-block bg-button rounded-md px-5 py-3 text-sm font-medium  tracking-wide text-or mb-4 text-center"
                    >
                      Me contacter
                    </a>
                  </div>
                </div>
              </div>
            )}
            {hovered === 2 && (
              <div className="absolute inset-0 flex left-0 top-1/3 md:top-0 md:left-1/3 md:w-2/3 items-center justify-center bg-black z-10">
                <div className="w-full h-full flex items-center justify-center space-x-8 px-4 text-center">
                  <div className="text-white w-full max-w-4xl md:max-h-[400px] overflow-y-auto">
                    <h1 className="text-or text-4xl font-bold mt-4">
                      La méthode GRM
                    </h1>
                    <p className="text-lg text-white mb-4"></p>
                    <ul className="list-disc list-inside marker:text-white text-white text-left lg:pl-32">
                      <li>1 accès à l’application</li>
                      <li> 1 programme perte de poids 12 SEMAINES</li>
                      <li>1 plan alimentaire</li>
                      <li>1 BOOSTBOX</li>
                      <li>Des séances et exercices vidéo</li>
                      <li> Des documents explicatifs</li>
                      <li>Suivi de la progression</li>
                      <li>Echanges quotidien via WhatsApp</li>
                      <li>150 €</li>
                    </ul>
                    <button
                      className={
                        "mt-1.5 inline-block bg-button rounded-md px-5 py-3 text-sm font-medium upprcase tracking-wide text-or mb-4"
                      }
                      onClick={() => router.push("/product/listing/coaching")}
                    >
                      Accèder à la boutique
                    </button>
                  </div>
                </div>
              </div>
            )}
            {hovered === 3 && (
              <div className="absolute inset-0 flex left-0 top-1/3 md:top-0 md:left-1/3 md:w-2/3 items-center justify-center bg-black z-10">
                <div className="w-full h-full flex items-center justify-center space-x-8 px-4 text-center">
                  <div className="text-white w-full max-w-4xl md:max-h-[400px] overflow-y-auto">
                    <h1 className="text-or text-4xl font-bold mt-4">
                      Mes programmes
                    </h1>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                      <div className="flex-1">
                        <p className="text-lg m-2">
                          PROGRAMMES 8 SEMAINES PERSONNALISÉ
                        </p>
                        <ul className="list-disc list-inside marker:text-white text-white text-left pl-6">
                          <li>1 accès à l’application</li>
                          <li> 1 programme 8 SEMAINES personnalisé </li>

                          <li>Des séances et exercices vidéo</li>
                          <li> Des documents explicatifs</li>
                          <li>Suivi de la progression</li>
                          <li>Echanges hebdomadaire via WhatsApp</li>
                          <li>50€ </li>
                        </ul>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg m-2">PROGRAMMES 8 SEMAINES</p>
                        <ul className="list-disc list-inside marker:text-white text-white text-left pl-6">
                          <li>1 accès à l’application</li>
                          <li> 1 programme 8 SEMAINES type </li>
                          <li>Des séances et exercices vidéo</li>
                          <li> Des documents explicatifs</li>
                          <li>Suivi de la progression</li>
                          <li>Echanges hebdomadaire via WhatsApp</li>
                          <li>30€ </li>
                        </ul>
                      </div>
                    </div>
                    {/* <ul className="list-disc text-lg text-white ml-6">
                      <li>EBook prise de masse musculaire : 59€</li>
                      <li>EBook perte de poids : 59€</li>
                      <li>EBook Force : 59€</li>
                      <li>EBook Hybride (force et endurance) : 59€</li>
                      <li>EBook Endurance : 59€</li>
                    </ul> */}
                    <button
                      className={
                        "mt-1.5 inline-block bg-button rounded-md px-5 py-3 text-sm font-medium upprcase tracking-wide text-or mb-4"
                      }
                      onClick={() => router.push("/product/listing/ebook")}
                    >
                      Accèder à la boutique
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="py-4 flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="w-full text-left px-4">
            <h3 className="text-4xl font-bold text-stone-100 mb-8">
              Mes produits
            </h3>

            {physicalProducts && physicalProducts.length > 0 ? (
              <div>
                <p>
                  <i>Livraison gratuite sur tous les produits ! </i>
                </p>
                <div className="grid grid-cols-3 gap-4 justify-center items-center ">
                  <button
                    onClick={prevProduct}
                    className="bg-stone-100 text-gray-900 p-2 text-2xl rounded-full justify-self-end z-10 border-2 border-or"
                  >
                    &lt;
                  </button>
                  <div className=" flex justify-center items-center ">
                    <article
                      className="bg-black border-or rounded-md relative flex flex-col overflow-hidden border-2 cursor-pointer "
                      key={currentIndex}
                    >
                      {/* Assurez-vous que l'élément actuel existe avant d'afficher le produit */}
                      <ProductTile item={physicalProducts[currentIndex]} />
                      <ProductButtons item={physicalProducts[currentIndex]} />
                    </article>
                  </div>

                  <button
                    onClick={nextProduct}
                    className="bg-stone-100 text-gray-900 text-2xl p-2 rounded-full justify-self-start z-10 border-2 border-or"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-stone-100">
                Aucun produit disponible en ce moment !
              </p>
            )}

            {/* Affichage des points de navigation, seulement si il y a des produits */}
            {physicalProducts.length > 0 && (
              <div className="flex justify-center mt-4">
                {physicalProducts.map((_, index) => (
                  <span
                    key={index}
                    className={`mx-2 w-2 h-2 rounded-full ${
                      index === currentIndex ? "bg-gray-300" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section contact ou appel à l'action */}
        {/* <section className="mt-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Prêt à commencer votre transformation ?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Que vous choisissiez le coaching en ligne ou en présentiel, ou que vous optiez pour nos eBooks, je suis là pour vous guider dans votre transformation physique et mentale. N'attendez plus pour atteindre vos objectifs et révéler le meilleur de vous-même !
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Contactez-moi maintenant
          </button>
        </section> */}
        <Notification></Notification>
      </div>
    </div>
  );
}

// import { GlobalContext } from "@/context";
// import { getAllAdminProducts } from "@/services/product";
// import { useRouter } from "next/navigation";
// import { useContext, useEffect, useState } from "react";

// export default function Home() {
//   const { isAuthUser } = useContext(GlobalContext);

//   const [products, setProducts] = useState([]);
//   const router = useRouter();

//   async function getListOfProducts() {
//     const res = await getAllAdminProducts('');

//     if (res.success) {
//       setProducts(res.data);
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getListOfProducts();
//         console.log(res);  // Ajoutez un log pour voir la réponse de l'API
//       } catch (error) {
//         console.error('Erreur dans useEffect:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(products);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <section className="">
//         <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
//           <div className="mr-auto place-self-center lg:col-span-7">
//             <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
//               Best Fashion Collection
//             </h1>
//             <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
//               Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
//               lacus meleifend menean diverra loremous.
//             </p>

//             <button
//               type="button"
//               onClick={() => router.push("/product/listing/all-products")}
//               className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
//             >
//               Explore Shop Collection
//             </button>
//           </div>
//           <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
//             <img
//               src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
//               alt="Explore Shop Collection"
//             />
//           </div>
//         </div>
//         <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
//             <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
//               <div className="max-w-md mx-auto text-center lg:text-left">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
//                     Summer Sale Collection
//                   </h2>
//                 </div>
//                 <button
//                   onClick={() => router.push("/product/listing/all-products")}
//                   className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
//                 >
//                   Shop ALL
//                 </button>
//               </div>
//             </div>
//             <div className="lg:col-span-2 lg:py-8">
//               <ul className="grid grid-cols-2 gap-4">
//                 {products && products.length
//                   ? products
//                       .filter((item) => item.onSale === "yes")
//                       .splice(0, 2)
//                       .map((productItem) => (
//                         <li
//                           onClick={() =>
//                             router.push(`/product/${productItem._id}`)
//                           }
//                           className="cursor-pointer"
//                           key={productItem._id}
//                         >
//                           <div>
//                             <img
//                               src={productItem.imageUrl}
//                               alt="Sale Product Item"
//                               className="object-cover w-full rounded aspect-square"
//                             />
//                           </div>
//                           <div className="mt-3">
//                             <h3 className="font-medium text-gray-900">
//                               {productItem.name}
//                             </h3>
//                             <p className="mt-1 text-sm text-gray-800">
//                               ${productItem.price}{" "}
//                               <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
//                             </p>
//                           </div>
//                         </li>
//                       ))
//                   : null}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
//               SHOP BY CATEGORY
//             </h2>
//           </div>
//           <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
//             <li>
//               <div className="relative block group">
//                 <img
//                   src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
//                   className="object-cover w-full aspect-square"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
//                   <h3 className="text-xl font-medium text-white">KIDS</h3>
//                   <button
//                     onClick={() => router.push("/product/listing/kids")}
//                     className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             </li>
//             <li>
//               <div className="relative block group">
//                 <img
//                   src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
//                   className="object-cover w-full aspect-square"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
//                   <h3 className="text-xl font-medium text-white">WOMEN</h3>
//                   <button
//                     onClick={() => router.push("/product/listing/women")}
//                     className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             </li>
//             <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
//               <div className="relative block group">
//                 <img
//                   src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
//                   className="object-cover w-full aspect-square"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
//                   <h3 className="text-xl font-medium text-white">MEN</h3>
//                   <button
//                     onClick={() => router.push("/product/listing/men")}
//                     className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
//                   >
//                     Shop Now
//                   </button>
//                 </div>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </section>
//     </main>
//   );
// }

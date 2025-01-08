"use client";

export default function Home() {
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Que vous souhaitiez transformer votre physique, booster votre énergie ou retrouver un équilibre durable.
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Je suis là pour vous accompagner à chaque étape. Avec un coaching personnalisé, en ligne ou en présentiel, et des eBooks conçus pour vous guider vers l'excellence, vous avez toutes les clés en main pour réussir. 
          Ensemble, nous repousserons vos limites, surmonterons chaque obstacle et atteindrons vos objectifs de façon efficace et motivante. C’est le moment de révéler le meilleur de vous-même et de vivre la transformation que vous méritez.
        </p>

        {/* Coaching en ligne */}
        <section className="mb-16 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/path/to/online-coaching-photo.jpg" // Remplacez par le chemin réel de l'image
              alt="Coaching en ligne"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-left px-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Coaching en ligne</h3>
            <p className="text-lg text-gray-700 mb-4">
              Suivi 3 mois à 90€/mois : Débutez votre transformation physique avec notre programme intensif de 3 mois. Recevez un plan d'entraînement personnalisé, un suivi nutritionnel adapté, et des conseils d'experts pour commencer à voir des résultats concrets et atteindre vos premiers objectifs. Ce programme est idéal pour ceux qui souhaitent initier un changement rapide et significatif.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Suivi 6 mois à 80€/mois : Amplifiez votre transformation avec notre programme de 6 mois, conçu pour renforcer vos progrès et maximiser vos résultats. Bénéficiez d'un plan d'entraînement avancé, d'un suivi nutritionnel précis et de conseils d'experts pour affiner votre condition physique. Ce programme vous permettra de développer une routine solide et d'obtenir des résultats durables.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Suivi 12 mois pour 70€/mois : Atteignez votre meilleure forme avec notre programme de transformation complète de 12 mois. Profitez d'un accompagnement personnalisé, d'un suivi nutritionnel détaillé et de conseils d'experts pour transformer votre corps et votre mode de vie en profondeur. Ce programme est conçu pour ceux qui cherchent une transformation totale, durable et à long terme.
            </p>
          </div>
        </section>

        {/* Coaching en présentiel */}
        <section className="bg-white py-12 flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/path/to/in-person-coaching.jpg" // Remplacez par le chemin réel de l'image
              alt="Coaching en présentiel"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-left px-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Coaching en présentiel</h3>
            <p className="text-lg text-gray-700 mb-4">
              Le coaching en présentiel que je propose est entièrement personnalisé et conçu pour s’adapter à vos préférences et objectifs. Vous avez le choix de vous entraîner en extérieur pour profiter du plein air, en salle de sport partenaire pour bénéficier d'un cadre équipé, ou en groupe pour une motivation collective, ou en individuel pour un suivi sur mesure.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Je propose une large gamme de séances, allant du renforcement musculaire, au stretching, Pilates, HIIT (entraînement fractionné de haute intensité), CAF (cuisses, abdos, fessiers), Body Sculpt et bien d’autres types d'entraînements sur demande. Chaque programme est adapté à vos besoins spécifiques pour garantir des résultats optimaux. Pour un accompagnement personnalisé et des séances sur mesure, un devis est disponible sur demande.
            </p>
          </div>
        </section>

        {/* eBooks */}
        <section className="py-12 flex flex-col md:flex-row items-center justify-between">
         
          <div className="w-full md:w-1/2 text-left px-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">eBooks</h3>
            <p className="text-lg text-gray-700 mb-4">
              Grâce à nos eBooks, vous avez la possibilité de vous entraîner de manière autonome tout en suivant une programmation détaillée et efficace. Chaque eBook propose un plan structuré sur 5 séances par semaine, avec des exercices progressifs pour vous accompagner dans votre transformation physique, que vous cherchiez à prendre du muscle, perdre du poids, gagner en force ou améliorer votre endurance.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              En plus des séances détaillées, vous trouverez de précieuses informations sur la nutrition, les bonnes techniques d'entraînement, et des conseils pratiques pour maximiser vos résultats tout en évitant les erreurs courantes. Ces eBooks sont conçus pour vous donner tous les outils nécessaires afin de progresser seul, tout en bénéficiant d'un programme complet et adapté à vos besoins.
            </p>
            <ul className="list-disc text-lg text-gray-700 ml-6">
              <li>EBook prise de masse musculaire : 59€</li>
              <li>EBook perte de poids : 59€</li>
              <li>EBook Force : 59€</li>
              <li>EBook Hybride (force et endurance) : 59€</li>
              <li>EBook Endurance : 59€</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/path/to/ebooks-photo.jpg" // Remplacez par le chemin réel de l'image
              alt="eBooks"
              className="w-full rounded-lg shadow-lg"
            />
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
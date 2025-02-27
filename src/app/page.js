"use client";
import { motion } from "framer-motion";

import ProductTile from "@/components/CommonListing/ProductTile";
import ProductButtons from "@/components/CommonListing/ProductButtons";
import { productByProductType } from "@/services/product";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Notification from "@/components/Notification";
import { TiArrowDownThick } from "react-icons/ti";
import PcDisplay from "@/components/MainPageDisplay/PcDisplay";
import PhoneDisplay from "@/components/MainPageDisplay/PhoneDisplay";
import { productsPointsDetails } from "@/utils";

export default function Home() {
  const router = useRouter();

  const [physicalProducts, setPhysicalProducts] = useState([]);
  const [coachings, setCoachings] = useState([]);
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
    const resCoach = await productByProductType("coaching");

    if (resCoach.success) {
      setCoachings(resCoach.data);
    }
    console.log(coachings);
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  return (
    <div className=" xl:py-2 md:px-16 lg:px-16">
      <div className="max-w-screen  text-center ">
        <section className=" w-full  max-w-screen  flex flex-col items-center ">
          <div className="relative w-full max-w-screen-lg flex justify-center items-center mb-4 ">
            <video
              className="w-full  max-h-[80vh] h-full object-contain aspect-video rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto"
              autoPlay
              loop
              muted
              playsInline
              src="/accueilVideo.mov"
            />
          </div>
          <h1 className=" sm:text-6xl text-lg font-extrabold text-gray-100 mb-4 flex items-center">
            Découvre une nouvelle façon de t’entraîner !
          </h1>
          <div className="flex space-x-4 ">
            <TiArrowDownThick className="text-or text-xl sm:text-4xl animate-bounce " />
            <TiArrowDownThick className="text-or text-xl sm:text-4xl animate-bounce " />
          </div>

          <div className="flex xl:p-8 m-4">
            <p className="text-sm md:text-2xl text-justify">
              Ces offres sont conçues pour répondre à vos besoins, que vous
              soyez débutant ou expert. Spécialisé dans la perte de poids,
              j’accompagne également ceux qui souhaitent développer leur masse
              musculaire, améliorer leur force, endurance ou exceller dans une
              discipline. La culture physique, encadrée par un professionnel,
              offre des résultats durables et des satisfactions personnelles. Je
              vous propose un programme optimisé, évitant les exercices
              inefficaces, préservant votre motivation et accélérant vos progrès
              pour atteindre vos objectifs rapidement et en toute sécurité.
            </p>
          </div>
        </section>

        {/* Les prestations */}
        <section className="m-8 md:m-16  ">
          <h2
            className="text-4xl text-left font-bold text-stone-100 mb-4 cursor-pointer hover:text-bordeaux transition duration-300 ease-in-out"
            onClick={() => router.push(`/product/listing/all-products`)}
          >
            Mes prestations
          </h2>
          {/* Version PC */}

          <div className="hidden md:flex">
            <PcDisplay coachings={coachings} />
          </div>

          {/* Version Mobile */}
          <div className="flex md:hidden">
            <PhoneDisplay coachings={coachings} />
          </div>
        </section>

        <section className="mt-16 px-4 py-10">
          {/* Titre principal avec animation */}
          <motion.h2
            className="text-3xl font-bold text-center text-or mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Titre de section à trouver
          </motion.h2>

          {/* Liste des éléments */}
          <div className="space-y-6">
            {productsPointsDetails.map((point, index) => (
              <motion.div
                key={index}
                className="text-lg leading-relaxed text-left text-justify"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Titre en plus gros, suivi directement du texte */}
                <span className="font-bold text-xl text-or">
                  {point.title} :
                </span>{" "}
                {point.description}
              </motion.div>
            ))}
          </div>
        </section>

        {/* <section className="py-4 flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="w-full text-left px-4 ">
            <h3 className="text-4xl font-bold text-stone-100 mb-8">
              Mes produits
            </h3>

            {physicalProducts && physicalProducts.length > 0 ? (
              <div>
                <p>
                  <i>Livraison gratuite sur tous les produits ! </i>
                </p>
                <div className="relative flex justify-center items-center w-full">
         
                  <div className="flex items-center w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 relative">
                    <button
                      onClick={prevProduct}
                      className="absolute left-0  bg-stone-100 text-gray-900 p-2 text-2xl rounded-full justify-self-end z-10 border-2 border-or"
                    >
                      &lt;
                    </button>
                    <div className=" flex justify-center items-center w-full ">
                      <article
                        className="bg-black border-or rounded-md  flex flex-col overflow-hidden border-2 cursor-pointer "
                        key={currentIndex}
                      >
                        <ProductTile item={physicalProducts[currentIndex]} />
                        <ProductButtons item={physicalProducts[currentIndex]} />
                      </article>
                    </div>

                    <button
                      onClick={nextProduct}
                      className="absolute right-0 bg-stone-100 text-gray-900 text-2xl p-2 rounded-full justify-self-start z-10 border-2 border-or"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-stone-100">
                Aucun produit disponible en ce moment !
              </p>
            )}

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
        </section> */}

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

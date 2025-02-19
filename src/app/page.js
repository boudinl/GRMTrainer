"use client";

import ProductTile from "@/components/CommonListing/ProductTile";
import ProductButtons from "@/components/CommonListing/ProductButtons";
import { productByProductType } from "@/services/product";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Notification from "@/components/Notification";
import { TiArrowDownThick } from "react-icons/ti";

export default function Home() {
  const [hovered, setHovered] = useState(1); // Etat pour savoir quelle image est survolée

  const textRef = useRef(null);

  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 768) {
      setHovered(index);
    }
    // Met à jour l'état lorsque l'on survole une image
  };
  const handleClick = (index) => {
    setHovered((prev) => (prev === index ? null : index));
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setHovered(null);
    }
    // Réinitialise l'état quand le survol est terminé
  };
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
  function goToSpecigicCoaching(coachingName) {
    const coaching = coachings.find((c) => c.name === coachingName);

    if (coaching) {
      router.push(`/product/${coaching._id}`);
    } else {
      console.error("Coaching not found");
    }
  }
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
  const getVisibilityClass = (index) => {
    return hovered === null || hovered === index
      ? "opacity-100"
      : "opacity-0 pointer-events-none";
  };

  const getTransformClass = (index) => {
    const hoverClasses = {
      1: "transform md:translate-x-[+200%] translate-y-[-0%] md:translate-y-0",
      2: "transform md:translate-x-[-100%] translate-y-[-100%] md:translate-y-0",
      3: "transform md:translate-x-[-200%] translate-y-[-200%] md:translate-y-0",
    };
    return hovered === index ? hoverClasses[index] : "";
  };

  useEffect(() => {
    getListOfProducts();
  }, []);
  useEffect(() => {
    // Vérifier si le texte est monté et si l'élément est visible avant de faire défiler
    if (window.innerWidth < 768 && hovered !== null) {
      console.log("Fenetre inférieur");
      console.log(textRef.current);
      if (textRef.current) {
        textRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // Centrer l'élément dans la fenêtre
        });
      }
    }
  }, [hovered]);
  // useEffect(() => {
  //   if (hovered !== null && textRefs[hovered]?.current) {
  //     textRefs[hovered].current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [hovered]);
  return (
    <div className=" xl:py-2 md:px-16 lg:px-16">
      <div className="max-w-screen  text-center ">
        <section className=" w-full  max-w-screen  flex flex-col items-center ">
          <div className="relative w-full max-w-screen-lg flex justify-center items-center mb-10 ">
            <h1 className="absolute text-outline sm:text-6xl text-4xl font-extrabold text-gray-100 mb-4 bottom-[-15%] sm:bottom-[-10%] transform  flex items-center">
              Découvre une nouvelle façon de t’entraîner !
            </h1>

            <video
              className="w-full  max-h-[80vh] h-full object-contain aspect-video rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto"
              autoPlay
              loop
              muted
              playsInline
              src="/accueilVideo.mov"
            />
          </div>
          <div className="flex space-x-4 ">
            <TiArrowDownThick className="text-or text-4xl animate-bounce " />
            <TiArrowDownThick className="text-or text-4xl animate-bounce " />
          </div>

          <div className="flex xl:p-8 mt-4">
            <p className="text-lg md:text-2xl">
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

          <div
            ref={textRef}
            className={`w-full relative md:w-full flex flex-wrap  justify-between border-4 border-bordeaux rounded-lg overflow-hidden max-w-full md:max-w-[80%] md:max-h-[450px] mx-auto
              ${hovered === 2 ? "max-h-[400px] " : ""} ${
              hovered === 3 ? "max-h-[650px] " : ""
            } `}
            //onMouseLeave={handleMouseLeave}
          >
            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300  ${getTransformClass(
                1
              )}
          ${getVisibilityClass(1)}`}
              onMouseEnter={() => handleMouseEnter(1)}
              onClick={() => handleClick(1)}
            >
              <img
                src="/MesSuivis.jpg" // Remplacez par le chemin réel de l'image
                alt="Mes suivis"
                className="w-full h-auto max-h-[500px] object-cover object-top cursor-pointer"
              />
            </div>

            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300  ${getTransformClass(
                2
              )}
          ${getVisibilityClass(2)}`}
              onMouseEnter={() => handleMouseEnter(2)}
              onClick={() => handleClick(2)}
            >
              <img
                src="MethodeGrem.jpg" // Remplacez par le chemin réel de l'image
                alt="La méthode GRM"
                className="w-full h-auto max-h-[500px] object-cover cursor-pointer object-top"
              />
            </div>

            <div
              className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300  ${getTransformClass(
                3
              )}
          ${getVisibilityClass(3)}`}
              onMouseEnter={() => handleMouseEnter(3)}
              onClick={() => handleClick(3)}
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
              <div
                className={`absolute inset-0 flex left-0 top-2/3 md:top-0 md:left-1/3 md:w-2/3 items-center justify-center bg-black z-10
              `}
              >
                <div className="w-full h-full flex items-center justify-center space-x-8 px-4 text-center">
                  <div className="text-white w-full max-w-4xl md:max-h-[400px] overflow-y-auto">
                    <h1 className="text-or text-2xl md:text-4xl font-bold mt-6">
                      La méthode GRM
                    </h1>
                    <p className="text-lg text-white mb-4"></p>

                    <button
                      className={
                        "mt-1.5 inline-block bg-button rounded-md px-5 md:py-3 py-2 text-sm font-medium upprcase tracking-wide text-or mb-4"
                      }
                      onClick={() => goToSpecigicCoaching("La méthode GRM")}
                    >
                      En savoir plus <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {hovered === 3 && (
              <div className="absolute inset-0 flex left-0 top-2/3 md:top-0 md:left-1/3 md:w-2/3 items-center justify-center bg-black z-10">
                <div className="w-full h-full flex items-center justify-center space-x-8 px-4 text-center">
                  <div className="text-white w-full max-w-4xl md:max-h-[400px] overflow-y-auto">
                    <h1 className="text-or text-2xl md:text-4xl font-bold mt-4 mb-2">
                      Mes programmes
                    </h1>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                      <div className="flex-1 flex flex-col justify-between items-center text-center">
                        <p className="text-sm md:text-lg m-1 md:m-2">
                          PROGRAMMES 8 SEMAINES PERSONNALISÉ
                        </p>

                        <button
                          className={
                            "mt-1.5 inline-block bg-button rounded-md px-5 md:py-3 py-2 text-sm font-medium upprcase tracking-wide text-or md:mb-4 mb-2"
                          }
                          onClick={() => goToSpecigicCoaching("Programme type")}
                        >
                          En savoir plus <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col justify-between items-center text-center">
                        <p className="text-sm md:text-lg m-1 md:m-2">
                          PROGRAMMES 8 SEMAINES
                        </p>

                        <button
                          className={
                            "mt-1.5 inline-block bg-button rounded-md px-5 md:py-3 py-2 text-sm font-medium upprcase tracking-wide text-or mb-4"
                          }
                          onClick={() =>
                            goToSpecigicCoaching("Programme personnalisé")
                          }
                        >
                          En savoir plus <span aria-hidden="true">&rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="py-4 flex flex-col md:flex-row items-center justify-between mb-4">
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
                  {/* Conteneur qui garde les éléments alignés et centrés */}
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
                        {/* Assurez-vous que l'élément actuel existe avant d'afficher le produit */}
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

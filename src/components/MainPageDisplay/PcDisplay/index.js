"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PcDisplay({ coachings }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(null); // Etat pour savoir quelle image est survolée

  const handleMouseEnter = (index) => {
    setHovered(index);

    // Met à jour l'état lorsque l'on survole une image
  };

  const handleMouseLeave = () => {
    setHovered(null);

    // Réinitialise l'état quand le survol est terminé
  };

  function goToSpecigicCoaching(coachingName) {
    const coaching = coachings.find((c) => c.name === coachingName);

    if (coaching) {
      router.push(`/product/${coaching._id}`);
    } else {
      console.error("Coaching not found");
    }
  }
  const getVisibilityClass = (index) => {
    return hovered === null || hovered === index
      ? "opacity-100"
      : "opacity-0 pointer-events-none";
  };

  const getTransformClass = (index) => {
    const hoverClasses = {
      1: "transform translate-x-[+200%]",
      2: "transform translate-x-[-100%]",
      3: "transform translate-x-[-200%] ",
    };
    return hovered === index ? hoverClasses[index] : "";
  };
  return (
    <div
      className={`w-full relative flex flex-wrap  justify-between border-4 border-bordeaux rounded-lg overflow-hidden max-w-full md:max-w-[80%] md:max-h-[450px] mx-auto
      `}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex flex-col items-center w-full md:w-1/3 relative transition-all duration-300  ${getTransformClass(
          1
        )}
  ${getVisibilityClass(1)}`}
        onMouseEnter={() => handleMouseEnter(1)}
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
      >
        <img
          src="MesProgrammes.jpg" // Remplacez par le chemin réel de l'image
          alt="Mes programmes"
          className="object-top w-full h-auto max-h-[500px] object-cover cursor-pointer"
        />
      </div>
      {hovered === 1 && (
        <div className="absolute inset-0 flex right-1/3 w-2/3 items-center justify-center bg-black  z-10">
          <div className="w-full h-full flex  items-center justify-center space-x-8 px-4 text-center">
            <div className="text-white w-full max-w-4xl md:max-h-[600px] overflow-y-auto">
              <h1 className="text-or text-4xl font-bold mt-4">Mes suivis</h1>
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
          className={`absolute inset-0 flex left-1/3 w-2/3 items-center justify-center bg-black z-10
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
        <div className="absolute inset-0 flex left-1/3 w-2/3 items-center justify-center bg-black z-10">
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
  );
}

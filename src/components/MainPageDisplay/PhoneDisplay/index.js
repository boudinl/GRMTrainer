"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PhoneDisplay({ coachings }) {
  const router = useRouter();

  function goToSpecificCoaching(coachingName) {
    const coaching = coachings.find((c) => c.name === coachingName);
    if (coaching) {
      router.push(`/product/${coaching._id}`);
    } else {
      console.error("Coaching not found");
    }
  }

  const images = [
    {
      src: "/MesSuivis.jpg",
      alt: "Mes suivis",
      descriptions: [
        "Suivi personnalisé et approfondi pour une progression constante et efficace.",
      ],
      names: ["Suivis personnalisé"],
    },
    {
      src: "/MethodeGrem.jpg",
      alt: "La méthode GRM",
      descriptions: [
        "Méthode approuvée sur 12 semaines pour une perte de poids rapide et durable.",
      ],
      names: ["La méthode GRM"],
    },
    {
      src: "/MesProgrammes.jpg",
      alt: "Mes programmes",
      descriptions: [
        "Programme sur 8 semaines standard ou sur mesure pour une évolution rapide.\n Standard : ",
        "Sur mesure",
      ],
      names: ["Programme type", "Programme personnalisé"],
    },
  ];

  return (
    <div className="flex flex-col gap-8 px-4">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Animation de l'image */}
          <motion.img
            src={image.src}
            alt={image.alt}
            className="w-4/5 max-h-[300px] object-cover rounded-lg shadow-lg object-top"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Itération sur les descriptions et les boutons */}
          {image.descriptions.map((desc, i) => (
            <div key={i} className="text-center mt-4">
              <motion.p
                className="text-white px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {desc.split("\n").map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </motion.p>
              <motion.button
                className="mt-2 bg-button rounded-md px-5 py-3 text-sm font-medium tracking-wide text-or shadow-md hover:bg-bordeaux transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => goToSpecificCoaching(image.names[i])}
              >
                En savoir plus <span aria-hidden="true">&rarr;</span>
              </motion.button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

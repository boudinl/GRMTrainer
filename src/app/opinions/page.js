import CommonBubble from "@/components/CommonBubble";
import { getAllOpinions } from "@/services/opinion";
import { PulseLoader } from "react-spinners";
export const dynamic = "force-dynamic";
export default async function Opinions() {
  const extractedOpinions = await getAllOpinions();
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="px-4">
        <h1 className="font-bold text-3xl mb-8 text-center">Mes Avis</h1>
        <div className="space-y-6 ">
          {extractedOpinions &&
          extractedOpinions.data &&
          extractedOpinions.data.length ? (
            extractedOpinions.data.map((item, index) => (
              <CommonBubble
                key={item._id}
                text={item.description} // Assure-toi que "description" existe dans la réponse
                signature={item.signature} // Assure-toi que "signature" existe aussi
                direction={index % 2 === 0 ? "left" : "right"} // Alterne les bulles entre gauche et droite
              />
            ))
          ) : (
            <div className="text-gray-600 text-center">Aucun avis.</div>
          )}
        </div>
      </div>
    </div>
  );
}

import { getAllOpinions } from "@/services/opinion"
import { PulseLoader } from "react-spinners"

export default async function Opinions() {
    const extractedOpinions = await getAllOpinions()
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                {/* Affichage des codes promo existants */}
                <div className="px-4 pt-8">
                    <p className="font-medium text-xl">Mes Avis</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {extractedOpinions && extractedOpinions.data && extractedOpinions.data.length ? (
                            extractedOpinions.data.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between space-x-4 rounded-lg bg-white sm:flex-row"
                                >
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">{item.description}</span>
                                        <span className="font-bold">{`- ${item.signature}`}</span>
                                    </div>
                                   
                                </div>
                            ))
                        ) : (
                            <div>Aucun avis.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
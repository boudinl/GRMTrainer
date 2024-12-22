

"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import TextAreaComponent from "@/components/FormElements/TextAreaComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addOpinion, deleteOpinion, getAllOpinions } from "@/services/opinion";
import { addSaleCode, deleteSaleCode, getAllSaleCodes } from "@/services/saleCode"
import { addNewOpinionForm, addNewSaleCodeForm } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";




export default function AdminManageOpinions() {
    const [opinions, setOpinions] = useState(null);
    const {
        user,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,

    } = useContext(GlobalContext);


    const [newOpinion, setNewOpinion] = useState({
        description:'',
        signature:''

    });

    async function extractAllOpinions() {
        setPageLevelLoader(true);
        const res = await getAllOpinions();

        if (res.success) {
            setPageLevelLoader(false);
            setOpinions(res.data);
            console.log(res.data)
        } else {
            setPageLevelLoader(false);
        }
    }

    // Fonction pour ajouter un nouveau code promo
    async function handleAddOpinion() {
        setComponentLevelLoader({loading:true,id:""})
        console.log(newOpinion)
        const res = await addOpinion(newOpinion)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
              position: "top-right",
            });
            setNewOpinion({
              description: "",  
              signature:''       
            });
            extractAllOpinions();
         
          } else {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.error(res.message, {
              position: "top-right",
            });
            setNewOpinion({
                description:'', 
                signature: ''
               
              });
          }
       
    }
    async function handleDeleteOpinion(opinionId) {
        console.log(opinionId)
        setComponentLevelLoader({ loading: true, id: opinionId });

        const res = await deleteOpinion(opinionId);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });

            toast.success(res.message, {
                position: "top-right",
            });
            extractAllOpinions();
        } else {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.error(res.message, {
                position: "top-right",
            });
        }
    }
    useEffect(() => {
        if (user !== null) extractAllOpinions();
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                {/* Affichage des codes promo existants */}
                <div className="px-4 pt-8">
                    <p className="font-medium text-xl">Avis Existants</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {pageLevelLoader ? (
                            <PulseLoader
                                color={"#000000"}
                                loading={pageLevelLoader}
                                size={15}
                                data-testid="loader"
                            />
                        ) : opinions && opinions.length ? (
                            opinions.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between space-x-4 rounded-lg bg-white sm:flex-row"
                                >
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-semibold">{item.description}</span>
                                        <span className="font-bold">{`- ${item.signature}`}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteOpinion(item._id)}
                                        className="bg-red-600 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide rounded"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>Aucun avis.</div>
                        )}
                    </div>
                </div>

                {/* Formulaire pour ajouter un nouveau code promo */}
                <div className="mt-5 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Ajouter un nouvel avis</p>
                    <div className="flex flex-col mt-1 justify-center pt-1 items-center">
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                            {addNewOpinionForm.map((controlItem) => (
                                 controlItem.componentType === "input" ? (
                                <InputComponent
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    value={newOpinion[controlItem.id]}
                                    onChange={(event) =>
                                        setNewOpinion({
                                            ...newOpinion,
                                            [controlItem.id]: event.target.value,
                                        })
                                    }
                                />
                                 ) : controlItem.componentType === "textArea" ? (
                                                             <TextAreaComponent
                                                                 label={controlItem.label}
                                                                 placeholder={controlItem.placeholder}
                                                                rows={4}
                                                                 value={newOpinion[controlItem.id]}
                                                                 onChange={(event) => {
                                                                    setNewOpinion({
                                                                        ...newOpinion,
                                                                        [controlItem.id]: event.target.value,
                                                                     })
                                                                 }}
                                                             />
                                                         ) : null
                            ))}
                            <button
                                onClick={handleAddOpinion}
                                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                {componentLevelLoader && componentLevelLoader.loading ? (
                                    <ComponentLevelLoader
                                        text={"Ajout en cours"}
                                        color={"#ffffff"}
                                        loading={
                                            componentLevelLoader && componentLevelLoader.loading
                                        }
                                    />
                                ) : (
                                    "Ajouter l'avis"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}
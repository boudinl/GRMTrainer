"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addSaleCode, deleteSaleCode, getAllSaleCodes } from "@/services/saleCode"
import { addNewSaleCodeForm } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";




export default function AdminManageSaleCodes() {
    const [saleCodes, setSaleCodes] = useState(null);
    const {
        user,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,

    } = useContext(GlobalContext);


    const [newCode, setNewCode] = useState({
        code: "",
        priceDrop: "",

    });

    async function extractAllSaleCodes() {
        setPageLevelLoader(true);
        const res = await getAllSaleCodes();

        if (res.success) {
            setPageLevelLoader(false);
            setSaleCodes(res.data);
            console.log(res.data)
        } else {
            setPageLevelLoader(false);
        }
    }

    // Fonction pour ajouter un nouveau code promo
    async function handleAddSaleCode() {
        setComponentLevelLoader({loading:true,id:""})
        console.log(newCode)
        const res = await addSaleCode(newCode)
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
              position: "top-right",
            });
            setNewCode({
              code: "",
              priceDrop: "",
             
            });
            extractAllSaleCodes();
         
          } else {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.error(res.message, {
              position: "top-right",
            });
            setNewCode({
                code: "",
                priceDrop: "",
               
              });
          }
       
    }
    async function handleDeleteSaleCode(codeId) {
        console.log(codeId)
        setComponentLevelLoader({ loading: true, id: codeId });

        const res = await deleteSaleCode(codeId);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });

            toast.success(res.message, {
                position: "top-right",
            });
            extractAllSaleCodes();
        } else {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.error(res.message, {
                position: "top-right",
            });
        }
    }
    useEffect(() => {
        if (user !== null) extractAllSaleCodes();
    }, []);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                {/* Affichage des codes promo existants */}
                <div className="px-4 pt-8">
                    <p className="font-medium text-xl">Codes Promo Existants</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {pageLevelLoader ? (
                            <PulseLoader
                                color={"#000000"}
                                loading={pageLevelLoader}
                                size={15}
                                data-testid="loader"
                            />
                        ) : saleCodes && saleCodes.length ? (
                            saleCodes.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between space-x-4 rounded-lg bg-white sm:flex-row"
                                >
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span className="font-bold">{item.code}</span>
                                        <span className="font-semibold">{`Réduction : ${item.priceDrop} %`}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSaleCode(item._id)}
                                        className="bg-red-600 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide rounded"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>Aucun code promo disponible.</div>
                        )}
                    </div>
                </div>

                {/* Formulaire pour ajouter un nouveau code promo */}
                <div className="mt-5 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Ajouter un Nouveau Code Promo</p>
                    <div className="flex flex-col mt-1 justify-center pt-1 items-center">
                        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                            {addNewSaleCodeForm.map((controlItem) => (
                                <InputComponent
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    value={newCode[controlItem.id]}
                                    onChange={(event) =>
                                        setNewCode({
                                            ...newCode,
                                            [controlItem.id]: event.target.value,
                                        })
                                    }
                                />
                            ))}
                            <button
                                onClick={handleAddSaleCode}
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
                                    "Ajouter le code"
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
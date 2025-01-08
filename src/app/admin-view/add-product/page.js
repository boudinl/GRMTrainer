'use client'

import InputComponent from "@/components/FormElements/InputComponent"
import SelectComponent from "@/components/FormElements/SelectComponent"
import TileComponent from "@/components/FormElements/TileComponent"
import ComponentLevelLoader from "@/components/Loader/ComponentLevel"
import Notification from "@/components/Notification"
import { addNewProduct, updateAProduct } from "@/services/product"
import { GlobalContext } from "@/context"
import { adminAddProductformControls, AvailableSizes, firebaseConfig, firebaseStorageURL } from "@/utils"
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useState, useContext, useEffect } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL)

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);
    return `${getFile.name}-${timeStamp}-${randomStringValue}`
}
async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `grem/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapchot) => { }, (error) => {
            console.log(error); reject(error)
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref)
                .then((downloadUrl) => resolve(downloadUrl))
                .catch((error) => reject(error));
        })
    })
}
const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "mixte",
    sizes: [], // pour les vêtements, tailles possibles
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    optionalImagesUrl : [],
    priceDrop: 0,
    productType: "product",  // Nouveau champ pour le type de produit
    // Si le type est "coaching" ou "ebook", d'autres champs peuvent être initialisés par défaut.
    duration: 0, // pour le coaching, durée de la session
    format: "", // pour ebook, format du livre (PDF, EPUB, etc.)
};

export default function AdminAddNewProduct() {

    const [formData, setFormData] = useState(initialFormData);
    const { componentLevelLoader, setComponentLevelLoader, currentUpdatedProduct, setCurrentUpdatedProduct } = useContext(GlobalContext)
    const router = useRouter();

    useEffect(() => {
        if (currentUpdatedProduct !== null) {
            setFormData(currentUpdatedProduct)
        }
    }, [currentUpdatedProduct])
    console.log(currentUpdatedProduct);

    async function handleImage(event) {
        const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0])
        console.log(extractImageUrl)
        if (extractImageUrl !== "") {

            setFormData({
                ...formData,
                imageUrl: extractImageUrl
            })

        }

    }
    async function handleOptionalImages(event) {
        const files = event.target.files;
        let uploadedImages = [];

        // Pour chaque fichier, uploader l'image sur Firebase et récupérer l'URL
        for (let i = 0; i < files.length; i++) {
            const imageUrl = await helperForUploadingImageToFirebase(files[i]);
            if (imageUrl) {
                uploadedImages.push(imageUrl);
            }
        }
        setFormData(prevState => ({
            ...prevState,
            optionalImagesUrl: [...prevState.optionalImagesUrl, ...uploadedImages]
        }));
    }
    function handleTileClick(getCurrentItem) {
        console.log(getCurrentItem);
        let cpySizes = [...formData.sizes];
        const index = cpySizes.findIndex(item => item.id === getCurrentItem.id)
        if (index === -1) {
            cpySizes.push(getCurrentItem)
        } else {
            cpySizes = cpySizes.filter(item => item.id !== getCurrentItem.id)
        }
        setFormData({
            ...formData,
            sizes: cpySizes
        })

    }

    async function handleAddProduct() {
        console.log(formData)
        setComponentLevelLoader({ loading: true, id: '' })
        const res =
            currentUpdatedProduct !== null
                ? await updateAProduct(formData)
                : await addNewProduct(formData);


        console.log(res);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: "top-right",
            });
            setFormData(initialFormData);
            setCurrentUpdatedProduct(null)
            setTimeout(() => {
                router.push('/admin-view/all-products')
            }, 2000)
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: "top-right",
            });
        }
    }

    const filteredFormControls = adminAddProductformControls.filter(controlItem => {
        if (controlItem.visibleFor) {
            return controlItem.visibleFor.includes(formData.productType);
        }
        return true;
    });

    console.log('FormData',formData)
    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                <input
                        type="file"
                        accept="image/*"
                        max="10000000"
                        onChange={handleImage}
                    />
                    <div className="flex gap-4 mt-4">
                        {/* Affichage de l'image principale (imageUrl) */}
                        {formData.imageUrl && (
                            <div className="w-24 h-24 relative">
                                <img
                                    src={formData.imageUrl}  // Affichage de l'image principale
                                    alt="main-image"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <label>Images supplémentaires</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleOptionalImages}
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        {formData.optionalImagesUrl.length > 0 && formData.optionalImagesUrl.map((imageUrl, index) => (
                            <div key={index} className="w-24 h-24 relative">
                                <img
                                    src={imageUrl}
                                    alt={`image-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => {
                                        // Supprimer l'image
                                        setFormData({
                                            ...formData,
                                            optionalImagesUrl: formData.optionalImagesUrl.filter((_, idx) => idx !== index)
                                        });
                                    }}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <label>Type de produit</label>
                        <SelectComponent
                            label="Type"
                            options={[  {
                                id: "product",
                                label: "produit",
                              },
                              {
                                id: "coaching",
                                label: "coaching",
                              },
                              {
                                id: "ebook",
                                label: "e-book",
                              }]}
                            value={formData.productType}
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    productType: event.target.value,
                                });
                            }}
                        />
                    </div>
                    {formData.productType === "product" ? 
                    <div className="felx gap-2 flex-col">
                        <label >Tailles possibles</label>
                        <TileComponent selected={formData.sizes} onClick={handleTileClick} data={AvailableSizes}></TileComponent>
                    </div> : null}
                   
                    {/* Afficher les champs conditionnels */}
                    {filteredFormControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                label={controlItem.label}
                                options={controlItem.options}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                        ) : null
                    )}
                    <button onClick={handleAddProduct}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide ">
                        {componentLevelLoader && componentLevelLoader.loading ? (
                            <ComponentLevelLoader
                                text={currentUpdatedProduct !== null ? 'Modification du produit' : "Ajout du produit"}
                                color={"#ffffff"}
                                loading={
                                    componentLevelLoader && componentLevelLoader.loading
                                }
                            />
                        ) : currentUpdatedProduct !== null ? (
                            "Modifier le produit"
                        ) : (
                            "Ajouter le produit"
                        )}
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    )

}
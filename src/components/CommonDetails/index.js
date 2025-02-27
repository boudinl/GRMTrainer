"use client";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/ComponentLevel";

import Notification from "../Notification";
import { addToCart } from "@/services/cart";
import TileComponent from "../FormElements/TileComponent";
import { useRouter } from "next/navigation";

export default function CommonDetails({ item }) {
  const router = useRouter();
  // State pour suivre l'image actuellement affichée en grand
  const [selectedImage, setSelectedImage] = useState(item.imageUrl);
  const [activeTab, setActiveTab] = useState(
    item.description?.trim()
      ? "description"
      : item.content?.length > 0
      ? "content"
      : null
  );

  // Fonction pour changer l'image affichée en grand lors du clic sur une petite vignette
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const [selectedSize, setSelectedSize] = useState([]);
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  function handleTileClick(getCurrentItem) {
    console.log(getCurrentItem);

    // Créez une copie du tableau sizes
    let cpySizes = [...selectedSize];

    // Vérifiez si l'élément est déjà sélectionné
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    // Si l'élément est déjà sélectionné, on le retire
    if (index !== -1) {
      cpySizes = [];
    } else {
      // Si l'élément n'est pas sélectionné, on l'ajoute et on vide les autres sélections
      cpySizes = [getCurrentItem];
    }

    // Mettre à jour l'état avec la nouvelle sélection
    setSelectedSize(cpySizes);
  }

  async function handleAddToCart(getItem) {
    if (
      getItem.sizes &&
      getItem.sizes.length > 0 &&
      selectedSize &&
      selectedSize.length === 0
    ) {
      toast.error("Vous devez selectionner une taille de vetement", {
        position: "top-right",
      });
    } else {
      let res = null;
      setComponentLevelLoader({ loading: true, id: "" });
      if (getItem.sizes && getItem.sizes.length > 0) {
        console.log(selectedSize);
        console.log("Tailles disponible");
        res = await addToCart({
          productID: getItem._id,
          userID: user._id,
          size: selectedSize[0].id,
        });
      } else {
        console.log("Pas de Tailles disponible");
        res = await addToCart({ productID: getItem._id, userID: user._id });
      }

      if (res.success) {
        toast.success(res.message, {
          position: "top-right",
        });
        setComponentLevelLoader({ loading: false, id: "" });

        setShowCartModal(true);
      } else {
        toast.error(res.message, {
          position: "top-right",
        });
        setComponentLevelLoader({ loading: false, id: "" });
        if ((res.message = "Vous n'êtes pas connecté")) {
          setShowCartModal(false);
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          setShowCartModal(true);
        }
      }

      console.log(res);
    }
  }
  const renderAdditionalInfo = () => {
    if (item.productType === "coaching" && item.duration !== 0) {
      return (
        <div>
          <h3 className="text-xl font-semibold mt-4">
            Durée de l'engagement :
          </h3>
          <p>{item.duration} mois</p>
        </div>
      );
    }

    if (item.productType === "product") {
      return (
        <div>
          <h3 className="text-xl font-semibold mt-4">Tailles disponibles :</h3>
          <ul className="list-disc pl-5 mb-4">
            {item.sizes && item.sizes.length > 0 ? (
              <TileComponent
                selected={selectedSize}
                onClick={handleTileClick}
                data={item.sizes}
              ></TileComponent>
            ) : (
              // item.sizes.map((size) => (
              //   <li key={size.id}>{size.label}</li>
              // ))
              <p>Aucune taille disponible.</p>
            )}
          </ul>
        </div>
      );
    }

    if (item.productType === "ebook") {
      return (
        <div>
          <h3 className="text-xl font-semibold mt-4">Nombre de pages :</h3>
          <p>{item.format || "Non spécifié"}</p>
        </div>
      );
    }

    return null; // Si aucun type ne correspond, rien n'est affiché
  };
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={selectedImage}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {/* Vignette pour l'image principale */}
                  <button
                    type="button"
                    className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg  ${
                      selectedImage === item.imageUrl
                        ? "border-or border-4"
                        : "border-gray-100 border-2"
                    } text-center`}
                    onClick={() => handleThumbnailClick(item.imageUrl)}
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Main Image"
                    />
                  </button>

                  {/* Vérification que optionalImagesUrl existe et est un tableau non vide */}
                  {Array.isArray(item.optionalImagesUrl) &&
                    item.optionalImagesUrl.length > 0 &&
                    item.optionalImagesUrl.map((imageUrl, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg  ${
                          selectedImage === imageUrl
                            ? "border-or border-4"
                            : "border-gray-100 border-2"
                        } text-center`}
                        onClick={() => handleThumbnailClick(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          className="h-full w-full object-cover"
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-or">{item && item.name}</h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                {item.devis === "yes" ? (
                  <h1 className="text-3xl font-bold ">Sur devis</h1>
                ) : (
                  <h1
                    className={`text-3xl font-bold mr-2 ${
                      item.onSale === "yes" ? "line-through" : ""
                    }`}
                  >
                    {item && item.price}€
                  </h1>
                )}
                {item.onSale === "yes" ? (
                  <h1 className="text-3xl font-bold text-red-700">{`${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}€`}</h1>
                ) : null}
              </div>
              {item.devis === "yes" ? (
                <a
                  href={`mailto:trainer.grm@gmail.com?subject=Demande%20de%20devis&body=Bonjour,%20je%20souhaite%20demander%20un%20devis%20pour%20${encodeURIComponent(
                    item.name
                  )}.`}
                  className="mt-1.5 inline-block bg-button rounded-lg px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                >
                  Me contacter
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="mt-1.5 inline-block bg-button rounded-lg px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Ajout au panier"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Ajouter au panier"
                  )}
                </button>
              )}
            </div>
            {item.productType === "product" && (
              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-xl font-medium text-white">
                  Livraison : {item && item.deliveryInfo}
                </li>
              </ul>
            )}
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  {/* Afficher l'onglet "Description" uniquement si elle n'est pas vide */}
                  {item.description && item.description.trim() !== "" && (
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`py-4 text-xl font-medium mt-8 ${
                        activeTab === "description"
                          ? "border-b-2 border-gray-900 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Description
                    </button>
                  )}

                  {/* Afficher l'onglet "Contenu" uniquement si le tableau n'est pas vide */}
                  {item.content && item.content.length > 0 && (
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`py-4 text-xl font-medium mt-8 ${
                        activeTab === "content"
                          ? "border-b-2 border-gray-900 text-white"
                          : "text-gray-400"
                      }`}
                    >
                      Contenu
                    </button>
                  )}
                </nav>
              </div>

              {/* Afficher la section en fonction de l'onglet actif */}
              <div className="mt-4 flow-root sm:mt-8">
                {activeTab === "description" && item.description && (
                  <p>{item.description}</p>
                )}

                {activeTab === "content" &&
                  item.content &&
                  item.content.length > 0 && (
                    <ul className="list-disc pl-5">
                      {item.content.map((phrase, index) => (
                        <li key={index}>{phrase}</li>
                      ))}
                    </ul>
                  )}
              </div>
            </div>

            {/* Affichage des informations supplémentaires selon le type */}
            {renderAdditionalInfo()}
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}

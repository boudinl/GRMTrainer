"use client";

import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: "top-right",
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleAddToCart(getItem) {
    console.log("On ajoute au panier", getItem);
    if (getItem.sizes && getItem.sizes.length > 0) {
      toast.error("Vous devez ajouter une taille au vetement", {
        position: "top-right",
      });
      setTimeout(() => {
        router.push(`/product/${getItem._id}`);
      }, "1000");
    } else {
      console.log("Ce nest pas un vetement");
      setComponentLevelLoader({ loading: true, id: getItem._id });

      const res = await addToCart({
        productID: getItem._id,
        userID: user?._id,
      });

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
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          router.push("/admin-view/add-product");
          setCurrentUpdatedProduct(item);
        }}
        className="mt-1.5 flex w-full justify-center bg-button px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Modifier
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-button px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Supprimer"
        )}
      </button>
    </>
  ) : (
    <button
      onClick={() => handleAddToCart(item)}
      className="mt-1.5 flex w-full justify-center bg-button px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
    >
      {componentLevelLoader &&
      componentLevelLoader.loading &&
      componentLevelLoader.id === item._id ? (
        <ComponentLevelLoader
          text={"Ajout au panier"}
          color={"#ffffff"}
          loading={componentLevelLoader && componentLevelLoader.loading}
        />
      ) : (
        "Ajouter au panier"
      )}
    </button>
  );
}

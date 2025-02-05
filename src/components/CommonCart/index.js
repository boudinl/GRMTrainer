"use client";

import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader/ComponentLevel";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {
  const router = useRouter();

  return (
    <section className="min-h-screen ">
      <div className="mx-auto  sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl sm:px-6 lg:px-8">
          <div className="bg-black shadow rounded-lg my-8">
            <div className="px-4  sm:px-8 py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="-my-8">
                    {cartItems.map((cartItem) => (
                      <li
                        className=" flex  md:space-y-3 py-6 text-left flex-row md:space-x-5 sm:space-y-0 "
                        key={cartItem.id}
                      >
                        <div
                          className="shrink-0 cursor-pointer"
                          onClick={() =>
                            router.push(`/product/${cartItem.productID._id}`)
                          }
                        >
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="h-24 w-25 max-w-full rounded-lg object-cover pr-1"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold ">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                              <p>{cartItem.size ? cartItem.size : ""}</p>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold  sm:order-1 sm:ml-8 sm:text-right">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price}
                                €
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Suppression de l'article"}
                                    color={"#0000000"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Supprimer"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Votre panier est vide !</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Sous-total</p>
                  <p className="text-lg  font-semibold">
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                    €
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Frais de livraison</p>
                  <p className="text-lg  font-semibold">Gratuit</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg  font-semibold">
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                    €
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    onClick={() => router.push("/checkout")}
                    disabled={cartItems && cartItems.length === 0}
                    className="disabled:opacity-50 group inline-flex w-full items-center justify-center bg-button px-6 py-4 text-lg rounded-md text-white font-medium uppercase tracking-wide"
                  >
                    Passer commande
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

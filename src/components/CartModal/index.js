'use client'

import { Fragment, useContext, useEffect } from "react"
import CommonModal from "../CommonModal"
import { GlobalContext } from "@/context"
import { deleteFromCart, getAllCartItems } from "@/services/cart"
import ComponentLevelLoader from "../Loader/ComponentLevel"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";


export default function CartModal() {
    const router = useRouter()
    const { showCartModal, setShowCartModal,
        user,
        cartItems, setCartItems,
        componentLevelLoader, setComponentLevelLoader, } = useContext(GlobalContext);

    async function extractAllCartItems() {
        const res = await getAllCartItems(user?._id);

        if (res.success) {
            const updatedData =
              res.data && res.data.length
                ? res.data.map((item) => ({
                    ...item,
                    productID: {
                      ...item.productID,
                      price:
                        item.productID.onSale === "yes"
                          ? parseFloat (
                              (
                                item.productID.price -
                                item.productID.price * (item.productID.priceDrop / 100)
                              ).toFixed(2)
                            )
                          : item.productID.price,
                    },
                  }))
                : [];
            setCartItems(updatedData);
            localStorage.setItem("cartItems", JSON.stringify(updatedData));
          }
      
          console.log(res);
        }

    useEffect(() => {
        if (user !== null) {
            extractAllCartItems()
        }
    }, [user])
    
    async function handleDeleteCartItem(getCartItemID) {
        setComponentLevelLoader({ loading: true, id: getCartItemID })
        console.log(getCartItemID)
        const res = await deleteFromCart(getCartItemID);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: "top-right",
            });
            extractAllCartItems();
        } else {
            toast.error(res.message, {
                position: "top-right",
            });
            setComponentLevelLoader({ loading: false, id: '' })
        }
    }
    return (
        <CommonModal
            showButtons={true}
            show={showCartModal}
            setShow={setShowCartModal}
            mainContent={
                cartItems && cartItems.length ?
                    <ul role="list" className="my-6 divide-y divide-gray-300">
                        {
                            cartItems.map(cartItem =>
                                <li key={cartItem._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                                     onClick={() => router.push(`/product/${cartItem.productID._id}`)}>
                                        <img src={cartItem && cartItem.productID && cartItem.productID.imageUrl}
                                            alt="Cart item"
                                            className="h-full w-full object-cover object-center" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href="">{cartItem && cartItem.productID && cartItem.productID.name}</a>
                                                </h3>
                                                <p>{cartItem.size  ? cartItem.size : ''}</p>

                                            </div>
                                            <p
                                                className="mt-1 text-sm text-gray-600"
                                            >{cartItem && cartItem.productID && cartItem.productID.price}€</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <button type="button" className="font-medium text-yellow-600 sm-order-2"
                                                onClick={() => handleDeleteCartItem(cartItem._id)}>
                                                {componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === cartItem._id  ? (
                                        <ComponentLevelLoader
                                            text={"Suppression de l'article"}
                                            color={"#000000"}
                                            loading={
                                                componentLevelLoader && componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        "Supprimer"
                                    )}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    : null
            }
            buttonComponent={
                <Fragment>
                    <button
                    onClick={() =>{setShowCartModal(false); router.push('/cart')}}
                        type="button"
                        className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                        Aller au panier
                    </button>
                    <button
                        disabled={cartItems && cartItems.length === 0}
                        type="button"
                        onClick={()=>{ router.push('/checkout'); setShowCartModal(false)}}
                        className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
                    >
                        Passer commande
                    </button>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                        <button type="button" className="font-medium text-gray">
                            Continuer le Shopping
                            <span aria-hidden="true">
                                &rarr;
                            </span>
                        </button>
                    </div>
                </Fragment>
            }

        />
    )
}

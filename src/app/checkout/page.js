"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { applySaleCode } from "@/services/saleCode";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Checkout() {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
    discount,
    setDiscount,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // État pour le code promo
  const [promoCode, setPromoCode] = useState("");

  const router = useRouter();
  const [params, setParams] = useState(null);
  // const params = useSearchParams();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search); // Récupérer les paramètres
    const paramsObject = {};

    queryParams.forEach((value, key) => {
      paramsObject[key] = value;
    });

    setParams(paramsObject); // Mettre à jour l'état avec les paramètres récupérés
  }, []);

  const publishableKey = process.env.STRIPE_PUBLIC_KEY_TEST;
  const stripePromise = loadStripe(publishableKey);

  const totalBeforeDiscount = cartItems.reduce(
    (total, item) => item.productID.price + total,
    0
  );

  const discountAmount = totalBeforeDiscount * (discount / 100);

  const totalPrice = parseFloat(
    (totalBeforeDiscount - discountAmount).toFixed(2)
  );

  console.log(cartItems);

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setAddresses(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) {
      getAllAddresses();
      setCheckoutFormData({
        ...checkoutFormData,
        orderPrice: totalPrice,
        totalPrice: totalPrice + 4.19,
      });
    }
  }, [user]);
  useEffect(() => {
    setCheckoutFormData({
      ...checkoutFormData,
      orderPrice: totalPrice,
      totalPrice: totalPrice + 4.19,
    });
  }, [discount]);
  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.status === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            size: item.size,
            product: item.productID,
          })),
          paymentMethod: "Stripe",
          deliveryFee: 4.19,
          orderPrice: getCheckoutFormData.orderPrice,
          totalPrice: getCheckoutFormData.totalPrice,
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };
        console.log("creatre final chekout ", createFinalCheckoutFormData);
        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: "top-right",
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: "top-right",
          });
        }
      }
    }

    createFinalOrder();
  }, [params.status, cartItems]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });

      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => {
      const itemPrice = item.productID.price;

      // Calculer la réduction pour chaque produit
      const discountAmount = itemPrice * (discount / 100);

      // Calculer le prix après réduction pour chaque produit
      const discountedPrice = Math.round((itemPrice - discountAmount) * 100);

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.productID.name,
            images: [item.productID.imageUrl], // Ajouter l'image du produit
          },
          unit_amount: discountedPrice, // Prix après réduction (en centimes)
        },
        quantity: 1, // Chaque produit est pris en quantité 1
      };
    });
    createLineItems.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "Frais de livraison",
        },
        unit_amount: Math.round(4.19 * 100), // Prix après réduction (en centimes)
      },
      quantity: 1, // Chaque produit est pris en quantité 1
    });
    console.log(createLineItems);

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }

  console.log(checkoutFormData);

  async function handleApplySaleCode() {
    const res = await applySaleCode(promoCode);

    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
      });
      console.log(res.data.priceDrop);
      setDiscount(res.data.priceDrop);

      console.log("TJE CHECKOUT", checkoutFormData);
    } else {
      toast.error(res.message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        setOrderSuccess(false);
        router.push("/orders");
      }, [2000]);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Votre paiement est réussi vous allez être redirigé vers vos
                  commandes dans 2 secondes !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 bg-white m-8 rounded-lg text-black">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Résumé de la commande</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="Cart Item"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className="font-semibold">
                      {item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Votre panier est vide</div>
            )}
          </div>
          {/* Champ de code promo */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-900">
              Code Promo
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="mt-2 block w-full p-2 border border-gray-300 rounded"
              placeholder="Entrez votre code promo"
            />
            {discount ? (
              <p className="mr-3 text-sm font-semibold">{`-(${discount}%)de réduction`}</p>
            ) : null}
            <button
              onClick={() => {
                handleApplySaleCode();
              }}
              className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            >
              Appliquer
            </button>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Détails de la commande</p>

          <p className="text-gray-400 font-bold">
            Complétez votre commande en selectionnant une adresse
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Nom : {item.fullName}</p>
                  <p>Adresse : {item.address}</p>
                  <p>Code Postal : {item.postalCode}</p>
                  <p>Ville : {item.city}</p>
                  <p>Pays : {item.country}</p>

                  <button className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                    {item._id === selectedAddress
                      ? "Adresse selectionnée"
                      : "Selectionner cette adresse"}
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune adresse renseignée</p>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Ajouter une nouvelle adresse
          </button>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Sous-total</p>
              <p
                className={`text-lg font-bold text-gray-900 ${
                  discount ? "line-through" : ""
                }`}
              >
                {cartItems && cartItems.length ? totalBeforeDiscount : "0"}€
              </p>
              {discount ? (
                <p className="mr-3 text-sm font-semibold text-red-700">
                  {`${totalPrice}€`}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Frais de livraison
              </p>
              <p className="text-lg font-bold text-gray-900">Gratuit</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className={`text-lg font-bold text-gray-900 `}>
                {cartItems && cartItems.length
                  ? parseFloat(totalPrice.toFixed(2))
                  : "0"}
                €
              </p>
            </div>
            <div className="pb-10">
              <button
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 mt-5 mr-5 w-full  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                Procéder au paiement
              </button>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}

"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: "top-right",
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

  console.log(allOrdersForUser);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto  sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl  sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4 text-black">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex flex-col sm:flex-row">
                          <h1 className="font-bold text-sm sm:text-lg mb-3 sm:mb-0 sm:mr-3 flex-1">
                            #commande: {item._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="m-1 sm:mr-3 text-sm font-medium text-gray-900">
                              Montant total payé
                            </p>
                            <p className="sm:mr-3 text-sm md:text-2xl font-semibold text-gray-900">
                              {item.totalPrice}€
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover bg-black"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5">
                          <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white p-2 sm:px-5 sm:py-3 text-xs font-medium uppercase tracking-wide">
                            {item.isProcessing
                              ? "Commande en cours"
                              : "Commande reçu"}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className=" mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            Voir le détail de la commande
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>Vous n'avez pas de commandes </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}

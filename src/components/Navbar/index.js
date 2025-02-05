"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import "font-awesome/css/font-awesome.min.css";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";

// const isAuthUser = true;

function NavItems({ isModalView = false, isAdminView, router }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const toggleDropdown = (id) => {
    if (openDropdown === id) {
      setOpenDropdown(null); // Ferme le sous-menu si on clique sur le même
    } else {
      setOpenDropdown(id); // Ouvre le sous-menu correspondant
    }
  };

  // Gestion du clic extérieur pour fermer le dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null); // Ferme le menu si on clique en dehors
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`items-center justify-between w-full lg:flex lg:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex p-4 md:p-0 mt-4 font-medium rounded-lg md:border-0 bg-black ${
          isModalView
            ? "border-none flex-col "
            : "border border-gray-100 flex-row md:space-x-8 xl:space-x-8 lg:space-x-2 md:mt-0"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                onClick={() => router.push(item.path)}
                className="cursor-pointer block py-3 pl-3 pr-4 text-white rounded md:p-0"
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) =>
              item.subItems ? (
                // Si l'élément a des sous-éléments (par exemple "Tous les produits")
                <li
                  key={item.id}
                  className="relative dropdown-container flex items-center"
                >
                  <button
                    className="cursor-pointer block py-3 pl-3 pr-4 text-white rounded md:p-0"
                    onClick={() => {
                      setShowNavModal(false);
                      router.push(item.path);
                    }} // Lien pour la page "Tous les produits"
                  >
                    {item.label}
                  </button>

                  {/* Icône de menu déroulant */}
                  <span
                    className="ml-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Empêche le clic sur l'icône de fermer le menu
                      toggleDropdown(item.id);
                    }}
                  >
                    {/* Flèche ou chevron */}
                    {openDropdown === item.id ? (
                      <i className="fa fa-chevron-up text-white"></i>
                    ) : (
                      <i className="fa fa-chevron-down text-white"></i>
                    )}
                  </span>

                  {/* Menu déroulant sous "Tous les produits" */}
                  <ul
                    className={`absolute left-0 w-full bg-black border border-gray-100 mt-2 rounded-lg shadow-md  ${
                      openDropdown === item.id ? "block" : "hidden"
                    }`}
                    style={{ top: "100%", zIndex: 50 }}
                  >
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        onClick={() => {
                          setShowNavModal(false);
                          router.push(subItem.path);
                        }}
                        className="py-2 px-4 cursor-pointer hover:bg-gray-600 rounded-lg "
                      >
                        {subItem.label}
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                // Autres liens dans le menu
                <li
                  onClick={() => {
                    router.push(item.path);
                    setShowNavModal(false);
                  }}
                  className="cursor-pointer block py-3 pl-3 pr-4 text-white rounded md:p-0 z-30"
                  key={item.id}
                >
                  {item.label}
                </li>
              )
            )}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        pathName !== "/admin-view/add-product" &&
        currentUpdatedProduct !== null
      ) {
        setCurrentUpdatedProduct(null);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }
  const isAdminView = pathName.includes("admin-view");
  return (
    <>
      <nav className="bg-black fixed w-full z-20 top-0 left-0 border-b-4 border-or ">
        <div className="max-w-screen-full flex flex-wrap items-center justify-between mx-auto py-2 md:p-4">
          <div
            onClick={() => {
              setShowNavModal(false);
              router.push("/");
            }}
            className="flex items-center cursor-pointer"
          >
            <img src="/logo.png" alt="Logo" className="h-14 w-14 mr-2" />
            <span className="self-center text-2xl text-or font-semibold whitespace-nowrap">
              GRM Trainer
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => {
                    setShowNavModal(false);
                    router.push("/account");
                  }}
                >
                  Compte
                </button>
                <button
                  className={
                    "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => {
                    setShowNavModal(false);
                    router.push("/cart");
                  }}
                >
                  Panier
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => {
                    setShowNavModal(false);
                    router.push("/");
                  }}
                >
                  Client View
                </button>
              ) : (
                <button
                  className={
                    "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                  }
                  onClick={() => {
                    setShowNavModal(false);
                    router.push("/admin-view");
                  }}
                >
                  Admin View
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                Déconnexion
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowNavModal(false);
                  router.push("/login");
                }}
                className={
                  "mt-1.5 inline-block bg-button rounded-md md:px-5 md:py-3 px-2 md:text-sm text-xs font-medium upprcase tracking-wide text-white"
                }
              >
                Connexion
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} router={router}></NavItems>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      ></CommonModal>
      {showCartModal && <CartModal />}
    </>
  );
}

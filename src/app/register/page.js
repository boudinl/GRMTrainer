"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import Notification from "@/components/Notification";
import ComponentLevelLoader from "@/components/Loader/ComponentLevel";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [isRegistred, setIsRegistered] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  console.log(formData);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
      });
      //Variable locale à mettre dans le contexte ???
      //setIsRegistered(true);
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: "top-right",
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }
    console.log(data);
  }
  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-between pt-0 md:px-10 pb-0  mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full p-5 md:px-10   lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif text-black">
                {isRegistred
                  ? "Création du compte réussie ! "
                  : "Création du compte"}
              </p>
              {isRegistred ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                                "
                  onClick={() => router.push("/login")}
                >
                  Se connecter
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 ml-0 mb-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        key={controlItem.id}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        key={controlItem.id}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Enregistrement"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "S'enregistrer"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}

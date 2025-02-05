"use-client";
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Navbar() {
  return (
    <footer className="bg-black py-6 border-t-4 border-or flex justify-start items-center">
      <div className="flex  flex-row items-center max-w-4xl w-full">
        <div className="flex  items-center md:mr-6">
          <img
            src="/image8.jpg"
            alt="Jérémy Triaud"
            className="h-40 w-40  rounded-full object-cover object-top"
          />
        </div>
        <div className="flex-1 text-center  max-w-xl md:text-left pl-4 ">
          <h2 className=" font-bold text-white md:text-lg text-md">
            JÉRÉMY TRIAUD
          </h2>
          <p className="text-xs md:text-sm text-white mb-4">
            FONDATEUR DE GRM TRAINER
          </p>
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-white flex items-center gap-2">
              <FaEnvelope className="text-white" /> trainer.grm@gmail.com
            </p>
            <p className="text-xs md:text-sm text-gray-700 flex items-center gap-2">
              <FaInstagram className="text-white" />
              <a
                href="https://www.instagram.com/grmtrainer_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:underline"
              >
                grmtrainer_
              </a>
            </p>
            <p className="text-xs md:text-sm text-white flex items-center gap-2">
              <FaFacebook className="text-white" />
              <a
                href="https://www.facebook.com/GRMTRAINER"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:underline"
              >
                GRM TRAINER
              </a>
            </p>
            <p className=" text-xs md:text-sm text-white flex items-center gap-2">
              <FaPhone className="text-white" /> 06 67 70 42 30
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

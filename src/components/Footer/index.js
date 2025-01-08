'use-client'
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Navbar() {
    return (
        <footer className="bg-bordeaux py-6 border-t-4 border-or flex justify-start items-center">
            <div className="flex flex-col md:flex-row items-center max-w-4xl w-full">
                <div className="flex flex-col items-center md:mr-6">
                    <img
                        src="/image8.jpg" // Remplace par le chemin réel de l'image
                        alt="Jérémy Triaud"
                        className="w-40 h-40 rounded-full object-cover object-top"
                    />

                </div>
                <div className="flex-1 text-center md:text-left pl-4">
                    <h2 className="text-lg font-bold text-white">JÉRÉMY TRIAUD</h2>
                    <p className="text-sm text-white mb-4">FONDATEUR DE GRM TRAINER</p>
                    <div className="space-y-2">
                        <p className="text-white flex items-center gap-2">
                            <FaEnvelope className="text-white" /> trainer.grm@gmail.com
                        </p>
                        <p className="text-gray-700 flex items-center gap-2">
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
                        <p className="text-white flex items-center gap-2">
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
                        <p className="text-white flex items-center gap-2">
                            <FaPhone className="text-white" /> 06 67 70 42 30
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
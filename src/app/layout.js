import { Merriweather } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//const inter = Merriweather({subsets:['latin'], weight: ['300', '400', '700', '900']})

export const metadata = {
  title: "GRM TRAINER",
  description:
    "Coaching sportif à Clermont-Ferrand et en ligne. Programmes personnalisés, entraînements en présentiel ou à distance, vente de t-shirts et box fitness.",
  keywords: [
    "coach sportif Clermont-Ferrand",
    "coaching en ligne",
    "programme musculation",
    "entraînement personnalisé",
    "coach personnel",
    "vente t-shirt fitness",
    "box fitness",
  ],
  openGraph: {
    title: "GRM TRAINER",
    description:
      "Découvrez mes programmes d'entraînement personnalisés, en ligne ou en présentiel à Clermont-Ferrand. Vente de produits sportifs (t-shirts, box fitness).",
    url: "https://grmtrainer.vercel.app/",
    siteName: "GRM TRAINER",
    images: [
      {
        url: "https://grmtrainer.vercel.app/images/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Coaching sportif",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-bookAntiqua text-base custom-background shadow-xl text-white">
        <GlobalState>
          <Navbar />
          <main className="mt-[75px] sm:mt-[90px] ">{children}</main>
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
}

import { Merriweather } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//const inter = Merriweather({subsets:['latin'], weight: ['300', '400', '700', '900']})

export const metadata = {
  title: "GRM TRAINER",
  description: "Web application",
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

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bordeaux: "#6a0d1a", // Bordeaux
        button: "#222623",
        noir: "#000000", // Noir
        blanc: "#FFFFFF", // Blanc
        or: "#cfb53b", // Or
      },
      fontFamily: {
        bookAntiqua: ['"Book Antiqua"', "serif"], // Ajoute Book Antiqua comme police
      },
      fontSize: {
        base: "1.125rem", // Taille de texte par défaut (augmentée de 1rem à 1.125rem)
      },
    },
  },
  plugins: [],
};

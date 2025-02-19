/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

export const safelist = [
  "max-h-[400px]",
  "max-h-[480px]",
  "max-h-[650px]",
  "md:max-h-max",
];
export const theme = {
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
};
export const plugins = [];

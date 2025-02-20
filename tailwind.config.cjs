/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["max-h-[400px]", "max-h-[480px]", "max-h-[650px]", "md:max-h-max"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bordeaux: "#6a0d1a",
        button: "#222623",
        noir: "#000000",
        blanc: "#FFFFFF",
        or: "#cfb53b",
      },
      fontFamily: {
        bookAntiqua: ['"Book Antiqua"', "serif"],
      },
      fontSize: {
        base: "1rem",
      },
    },
  },
  plugins: [],
};

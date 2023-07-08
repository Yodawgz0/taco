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
        hypBlack: "#000000",
        hypBlackLight: "#0d0d0d",
        hypLightPurple: "#9e32ea",
        hypMedPurple: "#7f17d8",
        hypDarkPurple: "#410194",
      },
    },
  },
  plugins: [],
};

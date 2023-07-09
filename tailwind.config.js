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
        hypBlack: "#F9F6E4",
        hypBlackLight: "#c1b79d",
        hypLightPurple: "#14312a",
        hypMedPurple: "#b6c7dd",
        hypDarkPurple: "#789Fb5",
      },
    },
  },
  plugins: [],
};

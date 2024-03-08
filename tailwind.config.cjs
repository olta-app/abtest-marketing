/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Lora", ...defaultTheme.fontFamily.serif] // Using Lora as the default serif font
      },
      colors: {
        primary: "#E9A23B", // primary color
        backgroundColor: "#F5F5F4", // background color
        secondary: "#FEFBED", // secondary background color
        text: "#1B1917", // text color
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

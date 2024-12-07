/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textAdmin: "rgb(144,149,163)",
        bgAdmin: "#41485a",

      }
    },
  },
  plugins: [],
}
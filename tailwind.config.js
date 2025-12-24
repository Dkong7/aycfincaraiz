/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00437c",   // Azul Corporativo
        secondary: "#00aa56", // Verde Corporativo
        "gray-light": "#F5F5F5",
        "text-dark": "#333333"
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'], // Fuente profesional recomendada
      }
    },
  },
  plugins: [],
}
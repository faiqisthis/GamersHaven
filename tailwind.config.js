/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add your font here
    },
  animation: {
    slideDown: "slideDown 0.3s ease forwards",
  },
  keyframes: {
    slideDown: {
      "0%": { transform: "translateY(-10px)", opacity: 0 },
      "100%": { transform: "translateY(0)", opacity: 1 },
    },
  },
  },
  },
  plugins: [
  require('daisyui')
  ],
  daisyui:{
    themes:["halloween", "dark", "cupcake"],
  }
}



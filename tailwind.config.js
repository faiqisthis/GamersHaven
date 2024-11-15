/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Add your font here
    },},
  },
  plugins: [
  require('daisyui')
  ],
  daisyui:{
    themes:["halloween", "dark", "cupcake"],
  }
}



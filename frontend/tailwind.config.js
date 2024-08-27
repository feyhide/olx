/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        main:['New Amsterdam','sans-sarif'],
        text:["Inter","sans-serif"]
      },
      colors: {
        'slateblue': '#829CBA',
        'slatewhite': '#EFE9E8',
      },
      lineClamp: {
        2: '2',
      },
    },
  },
  plugins: [],
}
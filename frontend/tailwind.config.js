/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      display:["poppins","sans-serif"],
    },
    extend: {
      colors:{
        primary:"#05B6D3",
        secondary:"EF863E"
      },
      backgroundImage:{
        'login-bg-img':"url('./src/assets/pexels-robert-erban-184982972-11279691.jpg')",
        'signup-bg-img':"url('./src/assets/pexels-jess-vide-5232443.jpg')"
      }
    },
  },
  plugins: [],
}

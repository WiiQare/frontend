/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1DAAE6",
        sky: "#1DAAE6",
        orange: "#FE8023",
        purple: "#A938D0"
      },
    },
    
  },
  plugins: [require("flowbite/plugin"), require("daisyui"), require("@headlessui/react"), require('preline/plugin')],
  daisyui: {
    darkTheme: false,
  },
  
};

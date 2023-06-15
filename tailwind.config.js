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

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'tb': '900px',
      // => @media (min-width: 900px) { ... }

      'md': '980px',
      // => @media (min-width: 980px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [require("flowbite/plugin"), require("daisyui"), require("@headlessui/react"), require('preline/plugin')],
  daisyui: {
    darkTheme: false,
  },
  
};

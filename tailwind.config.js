/** @type {import('tailwindcss').Config} */
module.exports = {
    
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primary: "#000435",
          secondary: "#343A55",
          tertiary: "#bda475"
        }
      },
    },
    plugins: [],
  }
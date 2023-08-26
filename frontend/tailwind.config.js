/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#52ac66",
        "main-hover-bg": "#327942",
        "main-shadow": "#52B75C33",
        "bg-light" : "#eef1f6",
        "bg-dark" : "#e6eaf1",
        "bg-orange" : "#f46500",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
        1600: "1600px",
      },
      height: {
        80: "80px",
        
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero": "url('../../src/assets/images/hero.jpg')",
        "bg-hero-pattern": "url('../../src/assets/images/icon_8.jpg')",
        "abs": "url('../../src/assets/images/abs.png')",
        "sidepic": "url('../../src/assets/images/123.svg')",
        "bg-pattern": "url('../../src/assets/images/bg.svg')",
        "bg-patt" : "url('../../src/assets/images/pattern.png')",
        "bg-line" : "url('../../src/assets/images/line.svg')",
      },
      screens: {
        xs: "480px",
        xll: "1160px",
        x2l:"1200px"
      },
      boxShadow :{
        main : "0 2px 8px rgba(0,0,0,.1);"
      },
      colors:{
        "title-color" : "#46484d",
        "text-color":"#83838f"
      }
    },
  },
  plugins: [],
};

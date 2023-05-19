module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-roboto)",
      },
      colors: {
        gray: "#CCCCCC",
        darkGray: "#777777",
        postBorder: "#999999",
        blue: "#7695EC",
        primary: "#DDDDDD",
      },
    },
  },
  plugins: [],
};

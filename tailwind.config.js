/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        somatic: ["Somatic"],
        mono: ["JetBrains\\ Mono"],
      },
      colors: {
        body: {
          DEFAULT: "#141414",
        },
        sage: {
          50: "#f6f5ef",
          100: "#ececdb",
          200: "#dbdabb",
          300: "#c3c293",
          400: "#a8a868",
          500: "#8f9052",
          600: "#70723e",
          700: "#565833",
          800: "#47482c",
          900: "#3c3e29",
          950: "#202112",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
    animation: {
      fadein: "fadein 1.4s ease-in-out",
      appear: "appear 1.4s ease-in",
      rotate: "rotate 1s linear infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      fadein: {
        from: {
          transform: "translate(0px, 10px)",
          opacity: 0,
        },
        to: {
          transform: "translate(0px, 0px)",
          opacity: 1,
        },
      },
      appear: {
        from: {
          transform: "translate(0px, 100%)",
          opacity: 0,
        },
        to: {
          transform: "translate(0px, 0px)",
          opacity: 1,
        },
      },
      rotate: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      pulse: {
        "0%, 100%": {
          backgroundColor: "rgba(229, 231, 235, 1)",
        },
        "50%": {
          backgroundColor: "rgba(229, 231, 235, 0.2)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};

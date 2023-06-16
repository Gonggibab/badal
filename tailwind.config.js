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
      fadein: "fadein 1s ease-in-out",
      rotate: "rotate 1s linear infinite",
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
      rotate: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      colors: {
        primary: {
          white: "#ffffff",
          orange: "#fa9d31",
          red: "#ff6a53",
          purple: "#dcb2eb",
          green: "#acd188",
          softblack: "#2A2A2A",
          softwhite: "#F2F3FB",
        },
      },
    },
  },
  plugins: [],
};
export default config;

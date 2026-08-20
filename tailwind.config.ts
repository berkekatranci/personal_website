import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#091017",
        night: "#0D141B",
        panel: "#121A22",
        sky: "#69C7D5",
        violet: "#9587C2",
        gold: "#D6B66F",
        mint: "#69B99D",
        text: "#F2F0EA",
        muted: "#A9B1B8"
      },
      fontFamily: {
        sans: [
          "Aptos",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        display: [
          "Iowan Old Style",
          "Baskerville",
          "Palatino Linotype",
          "Book Antiqua",
          "Georgia",
          "ui-serif",
          "serif"
        ],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        card: "0 20px 60px rgba(0, 0, 0, 0.18)"
      },
      backgroundImage: {
        "mesh-dark": "linear-gradient(180deg, #0B1219 0%, #0D141B 100%)"
      }
    }
  },
  plugins: []
};

export default config;

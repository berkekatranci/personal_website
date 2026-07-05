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
        ink: "#07111F",
        night: "#111827",
        panel: "#182233",
        sky: "#38BDF8",
        violet: "#8B5CF6",
        gold: "#F5C542",
        mint: "#10B981",
        text: "#F8FAFC",
        muted: "#CBD5E1"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Sora",
          "Space Grotesk",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"]
      },
      boxShadow: {
        glow: "0 0 36px rgba(56, 189, 248, 0.16)",
        card: "0 18px 60px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "mesh-dark":
          "radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.16), transparent 30%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.15), transparent 32%), linear-gradient(180deg, #07111F 0%, #0B1424 44%, #07111F 100%)"
      }
    }
  },
  plugins: []
};

export default config;

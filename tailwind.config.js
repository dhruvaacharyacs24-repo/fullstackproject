module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",   // Indigo
        secondary: "#8b5cf6", // Violet
        accent: "#22c55e",    // Green
        glass: "rgba(255,255,255,0.12)",
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(99,102,241,0.35)",
        soft: "0 20px 40px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};

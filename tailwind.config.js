export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
          soft: "rgb(var(--primary-soft) / <alpha-value>)",
        },

        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          light: "rgb(var(--secondary-light) / <alpha-value>)",
          dark: "rgb(var(--secondary-dark) / <alpha-value>)",
        },
        bg: {
          main: "rgb(var(--bg-main) / <alpha-value>)",
          soft: "rgb(var(--bg-soft) / <alpha-value>)",
          muted: "rgb(var(--bg-muted) / <alpha-value>)",
        },

        text: {
          main: "rgb(var(--text-main) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },

        border: "rgb(var(--border) / <alpha-value>)",
        icon: "rgb(var(--icon) / <alpha-value>)",

        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

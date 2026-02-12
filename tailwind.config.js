/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#facc15',
        silver: '#e5e7eb',
      }
    },
  },
  plugins: [],
}

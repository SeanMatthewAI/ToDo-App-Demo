/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': {
          500: '#ec4899',
        },
        'purple': {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'gray': {
          100: '#f3f4f6',
          400: '#9ca3af',
          500: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
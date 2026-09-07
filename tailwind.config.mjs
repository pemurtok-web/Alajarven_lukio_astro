/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        alajarvi: {
          50: '#F0F6FC',
          100: '#E0EEFB',
          200: '#BAFAF9',
          300: '#7CC2FA',
          400: '#38BDF8',
          500: '#0055A5', // Official Alajärvi brand blue
          600: '#004B93',
          700: '#003B73', // Dark primary blue
          800: '#0A2540', // Deep navy
          900: '#07182B',
          950: '#030D18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 85, 165, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(0, 59, 115, 0.15)',
      }
    },
  },
  plugins: [],
}

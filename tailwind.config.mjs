/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        alajarvi: {
          50: '#F1F5FC',
          100: '#E0E9F5',
          200: '#B8D0F5',
          300: '#8AB2EE',
          400: '#4D82E0',
          500: '#0046AD', // Alajärven kaupungin markkinointivaakunan sininen
          600: '#003D96',
          700: '#002D70', // Dark primary blue
          800: '#001F4D', // Deep navy
          900: '#001433',
          950: '#000C1F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 70, 173, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(0, 45, 112, 0.15)',
      }
    },
  },
  plugins: [],
}

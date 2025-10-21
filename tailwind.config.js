/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0A84FF',
          text: '#666666' /* approx C:0 M:0 Y:0 K:60 */
        }
      },
      maxWidth: {
        'content': '1200px'
      }
    },
  },
  plugins: [],
};
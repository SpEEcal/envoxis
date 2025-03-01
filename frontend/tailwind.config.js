/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '20px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      colors: {
        'dark-dark-purple': 'rgb(52, 46, 55)',
        'dark-purple': '#5E5263',
        'light-purple': '#796a80',
        'purple': '#5e5263',
        'light-orange': 'rgb(151, 78, 58)',
        'light-very-orange': '#eb937b'
      }
    },
  },
  plugins: [daisyui],
}


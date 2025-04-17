/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#101828',
          light: '#1A2236'
        },
        metallic: {
          DEFAULT: '#C0C0C0',
          light: '#E5E7EB'
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#F5C443'
        },
        neon: {
          blue: '#00FFC2',
          green: '#1DE9B6'
        },
        warning: {
          DEFAULT: '#FF4C29',
          orange: '#FF9800'
        },
        charcoal: '#181A20'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
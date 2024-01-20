import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["var(--font-poppins)"],
        'lato': ["var(--font-lato)"],

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-blue': {
          100: '#667794',
          200: '#506485',
          300: '#3a5075',
          400: '#243d66',
          500: '#20375c',
          600: '#1d3152',
          700: '#192b47',
          800: '#16253d',
          900: '#121f33',
          950: '#0e1829',
        },
        'custom-violet': {
          100: '#9a90da',
          200: '#8b81d5',
          300: '#7d71cf',
          400: '#6e61ca',
          500: '#6357b6',
          600: '#584ea2',
          700: '#4d448d',
          800: '#423a79',
          900: '#373165',
          950: '#2c2751',
        },
        'custom-purple': {
          100: '#d1a4fa',
          200: '#cc98fa',
          300: '#c68df9',
          400: '#b27fe0',
          500: '#9e71c7',
          600: '#8b63ae',
          700: '#775595',
          800: '#63477d',
          900: '#4f3864',
          950: '3b2a4b'
        }
      }
    },
  },
  plugins: [],
}
export default config

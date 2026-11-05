/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kissa: {
          pink: '#E8559A',
          'pink-light': '#F9D5E5',
          'pink-lighter': '#FCE8F1',
          lime: '#D9E8A0',
          'lime-dark': '#C5D970',
          green: '#1F4D2B',
          'green-soft': '#2F6B3F',
          olive: '#7A8B2E',
          cream: '#FFF6FA',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'Montserrat', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'kissa': '24px',
        'kissa-lg': '32px',
      },
      boxShadow: {
        'kissa': '0 8px 30px rgba(232, 85, 154, 0.12)',
        'kissa-lg': '0 16px 48px rgba(232, 85, 154, 0.18)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(8deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.96)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        pop: 'pop 0.3s ease-out',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};

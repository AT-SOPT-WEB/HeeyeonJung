/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        pastelBlue: '#B5C0D0',
        pastelGreen: '#CCD3CA',
        pastelBeige: '#F5E8DD',
        pastelPink: '#EED3D9',

        // button colors
         buttonDefault: '#D1D5DB', 
         buttonActive: '#F1BA88',

        // Text Colors
        textPrimary: '#FFA55D',
      },

      boxShadow: {
        card: '2px 4px 12px 0px rgba(0, 0, 0, 0.08)',
        modal: '2px 2px 16px 0px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        serif: ['Noto Serif KR', 'serif'],
      },
      height: {
        inherit: 'inherit',
      },
      keyframes: {
        'slide-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-fade-in': 'slide-fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
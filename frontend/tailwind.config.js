/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,tsx,jsx,ts}"],
  theme: {
    extend: {
      colors: {
        'main': '#F34341',
        'main-2': '#EE624F',
        'main-3': '#C33034',
        'blue-1': '#24355A',
        'darkblue': '#1C2434',
        'bodydark1': '#DEE4EE',
        'bodydark2': '#8A99AF',
        'graydark': '#333A48',
        'stroke': '#E2E8F0',

      },
      backgroundImage: {
        'banner-pattern': "url('./assets/banner.jpg')",
        'newsletter': "url('./assets/newsletter.webp')",
        'gradient-right': 'linear-gradient(-90deg, #fff 70%, transparent)',
        'gradient-left': 'linear-gradient(90deg, #fff 70%, transparent)',
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        }
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        1: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}


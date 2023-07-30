/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        // if the screen is smaller than 768 --> container is 100%
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '0',
      },
    },
    extend: {
      colors: {
        green: '#1ce783',
        grey: {
          300: '#797d84',
          400: '#323843',
          500: '#272c34',
          900: '#0b0c0f'
        },
        white: '#f6f7f8',
        hsla: {
          '0-0-100-0': 'hsla(0, 0%, 100%, 0)',
        },
        rgba: {
          'neutral-muted': 'rgba(110,118,129,0.4)'
        }
      },
      maxWidth: {
        '4/5': '80%',
      },
      boxShadow: {
        'modal': '0 0 0 1px #30363d, 0 16px 32px rgba(1,4,9,0.85)',
      }
    },
  },
  plugins: [],
}


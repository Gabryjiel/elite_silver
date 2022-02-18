module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/helpers/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          50: '#F0E9F3',
          100: '#D2BDDC',
          200: '#B492C5',
          300: '#8650A2',
          400: '#6D3689',
          500: '#531D6F',
          600: '#491961',
          700: '#341246',
          800: '#2A0E38',
          900: '#15071C',
        },
      },
      gridTemplateColumns: {
        'card-15': 'repeat(auto-fill, 15rem)',
        'card-20': 'repeat(auto-fill, 20rem)',
        'card-30': 'repeat(auto-fill, 30rem)',
      },
      width: {
        128: '128rem',
        '90%': '90%',
      },
      height: {
        '40rem': '40rem',
        100: '100rem',
        128: '128rem',
      },
      aspectRatio: {
        card: '1 / 1.4',
      },
    },
  },
  plugins: [],
};

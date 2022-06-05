module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/lib/*.ts',
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
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
      },
      aspectRatio: {
        card: '1 / 1.4',
      },
    },
  },
  plugins: [],
};

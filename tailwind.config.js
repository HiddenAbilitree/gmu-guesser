/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        component: 'hsl(var(--component))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        btn: {
          background: 'hsl(var(--btn))',
          'background-hover': 'hsl(var(--btn-hover))',
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('map-open', [
        '&:is([data-map-open] *)',
        '&:is([data-map-open])',
      ]);
    },
  ],
};

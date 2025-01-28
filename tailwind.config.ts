import type { Config } from 'tailwindcss';

const LAYOUT = require('./src/constants/layout').default;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/service/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      minHeight: {
        'fit-to-screen': `calc(100vh - ${LAYOUT.HEADER.height}px - ${LAYOUT.FOOTER.height}px)`,
      },
    },
  },
  plugins: [],
};

export default config;

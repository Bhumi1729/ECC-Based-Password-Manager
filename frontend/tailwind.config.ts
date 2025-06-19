import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}", // Ensure paths match your Next.js project
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")], // Ensure this line is present
};

export default config;
